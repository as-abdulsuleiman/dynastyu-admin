/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Grid } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
import CoacheStatCard from "@/components/stat-cards/coache";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  useDeleteFirebaseUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateCoachMutation,
} from "@/services/graphql";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { useToast } from "@/hooks/use-toast";
import UserAvatar from "@/components/user-avatar";
import {
  BadgeAlertIcon,
  BadgeCheckIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  WhistleIcon,
} from "@/components/Icons";
import { useRootStore } from "@/mobx";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import MenubarCard from "../menubar";
import { observer } from "mobx-react-lite";
import { Separator } from "../ui/separator";
import { formatDate } from "@/lib/utils";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import { getURLParams } from "@/lib/helpers";
import MultiSelector from "../multi-selector";
import { coachFilter } from "@/lib/filters";
import PromptAlert from "../prompt-alert";

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Coach Title" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Status" },
  { name: "Verified" },
  { name: "Actions" },
];

interface CoachesProps {}

const Coaches: FC<CoachesProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    userStore: { setUsers },
  } = useRootStore();
  const {
    coacheStore: { setCoaches },
  } = useRootStore();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [updateCoach] = useUpdateCoachMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [ActiveUser, setActiveUser] = useState<any>({});
  const [deletingProfile, setDeletingProfile] = useState<boolean>(false);
  const [deleteFirebaseUser] = useDeleteFirebaseUserMutation();
  const filteredParams = getURLParams(selectedOptions);

  const {
    data: coachesData,
    refetch,
    fetchMore,
    loading,
  } = useGetUsersQuery({
    variables: {
      where: {
        accountType: {
          is: {
            title: {
              equals: "Coach",
            },
          },
        },
        ...filteredParams,
        OR: [
          {
            username: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
          },
          {
            firstname: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
          },
          {
            surname: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
          },
          {
            email: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      coachesData?.users[coachesData?.users?.length - 1];
    return lastPostInResults?.id;
  }, [coachesData?.users]);

  const handleDeleteCoachConfirmPrompt = async (item: any) => {
    setDeletingProfile(true);
    try {
      const response = await deleteUser({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      if (response.data?.deleteOneUser) {
        await deleteFirebaseUser({
          variables: {
            data: {
              email: item?.email,
            },
          },
        });
        toast({
          title: "Coach successfully deleted.",
          description: `@${item?.username} profile has been deleted.`,
          variant: "successfull",
        });
        refetch();
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete coach profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setDeletingProfile(false);
      setActiveUser({});
      setUpdatingProfile(null);
    }
  };

  const handleDeleteCoach = (item: any) => {
    setUpdatingProfile(StatusEnum.DELETING);
    setActiveUser(item);
  };

  const handleActivateCoach = async (item: any) => {
    setSelectedUser(item?.id);
    setUpdatingProfile(StatusEnum.ACTIVATING);
    try {
      const isCoachActive = item?.isActive;
      await updateCoach({
        variables: {
          where: {
            id: item?.coachProfile?.id,
          },
          data: {
            user: {
              update: {
                isActive: { set: !isCoachActive },
              },
            },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          isCoachActive ? "deactivated" : "activated"
        } `,
        variant: "successfull",
      });
      // if (resp.data?.updateOneCoachProfile) {
      // await refetch();
      // toast({
      //   title: "Coach successfully updated.",
      //   description: `${coach?.user?.username} has been ${
      //     coach?.user?.isActive ? "Deactivated" : "Activated"
      //   } `,
      //   variant: "default",
      // });
      // }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedUser(null);
    }
  };

  const handleVerifyCoach = async (item: any) => {
    setSelectedUser(item?.id);
    setUpdatingProfile(StatusEnum.VERIFYING);
    try {
      const isVerified = item?.coachProfile?.verified;
      await updateCoach({
        variables: {
          where: {
            id: item?.coachProfile?.id,
          },
          data: {
            verified: {
              set: !isVerified,
            },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          !isVerified ? "verified" : "unverified"
        } `,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedUser(null);
    }
  };

  const handleEditCoach = (item: any) => {
    router.push(`/coaches/edit?coach=${item?.coachProfile?.id}`);
  };

  const handleSelectOption = (selectedList: any, selectedItem: any) => {
    setSelectedOptions((prev) => [...prev, selectedItem]);
  };

  const handleRemoveOption = (selectedList: any, removedItem: any) => {
    setSelectedOptions((prev) => [
      ...prev.filter((a) => a?.id !== removedItem?.id),
    ]);
  };

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetUsersQuery,
        { fetchMoreResult }
      ): GetUsersQuery => {
        if (!fetchMoreResult || fetchMoreResult?.users?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.users;
          const fetchMorePosts = fetchMoreResult?.users;
          fetchMoreResult.users = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: coachesData?.users?.length,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetUsersQuery,
        { fetchMoreResult }
      ): GetUsersQuery => {
        if (!fetchMoreResult || fetchMoreResult?.users?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.users;
          const fetchMorePosts = fetchMoreResult?.users;
          fetchMoreResult.users = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const coacheItems = [
      {
        name: "View Details",
        onClick: () => {
          router.push(`/coach/${item?.id}`, { scroll: true });
        },
      },
      {
        name: "Edit Profile",
        onClick: () => handleEditCoach(item),
      },
      {
        name: `${item?.coachProfile?.verified ? "Unverify" : "Verify"} Profile`,
        onClick: async () => await handleVerifyCoach(item),
      },
      {
        name: `${item?.isActive ? "Deactivate" : "Activate"} Profile`,
        onClick: async () => await handleActivateCoach(item),
      },
      {
        name: "Delete Coach",
        onClick: () => handleDeleteCoach(item),
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div
            className="flex flex-row justify-start items-center"
            onClick={() => router.push(`/coach/${item?.id}`, { scroll: true })}
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.username?.charAt(0)} ${item?.firstname?.charAt(
                0
              )}`}
            />
            <div className="ml-4 cursor-pointer text-base">
              {item?.firstname} {item?.surname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.username ? `@${item?.username?.toLowerCase()}` : ""}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.email?.toLowerCase()}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.coachProfile?.title}</div>
        </TableCell>

        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.createdAt), "MMMM dd yyyy")}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.updatedAt), "MMMM dd yyyy")}
          </div>
        </TableCell>

        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.id === selectedUser &&
            updatingProfile === StatusEnum.ACTIVATING ? (
              <div className="text-center flex flex-row justify-center items-center">
                <Loader2Icon className="mr-1 h-4 w-4 animate-spin " />
                {item?.isActive ? "Deactivating..." : "Activating..."}
              </div>
            ) : (
              <div className="flex justify-center">
                <BadgeCard
                  size="xs"
                  color={item?.isActive ? "teal" : "rose"}
                  // tooltip={item?.user?.isActive ? "Active" : "Deactivated"}
                  icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
                  datatype="moderateDecrease"
                >
                  {item?.isActive ? "Active" : "Deactivated"}
                </BadgeCard>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.id === selectedUser &&
            updatingProfile === StatusEnum.VERIFYING ? (
              <div className="text-center flex flex-row justify-center items-center">
                <Loader2Icon className="mr-1 h-4 w-4 animate-spin " />
                {item?.coachProfile?.verified
                  ? "Unverifying..."
                  : "Verifying..."}
              </div>
            ) : (
              <div className="flex justify-center">
                <BadgeCard
                  size="xs"
                  color={item?.coachProfile?.verified ? "sky" : "rose"}
                  // tooltip={item?.verified ? "Verified" : "Not Verified"}
                  icon={() => {
                    return item?.coachProfile?.verified ? (
                      <BadgeCheckIcon className="h-4 w-4 mr-1" color="sky" />
                    ) : (
                      <BadgeAlertIcon className="h-4 w-4 mr-1" color="rose" />
                    );
                  }}
                  datatype="moderateDecrease"
                >
                  {item?.coachProfile?.verified ? "Verified" : "Not Verified"}
                </BadgeCard>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontalIcon className="cursor-pointer" />
                </Button>
              }
              items={coacheItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <ContentHeader
              title="Coaches"
              icon={
                <WhistleIcon className="h-4 w-4 ml-2 fill-foreground dark:fill-foreground" />
              }
              subHeader="Coaches Overview"
            />
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <CoacheStatCard />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
        <MultiSelector
          options={coachFilter}
          displayValue="label"
          placeholder="Filter"
          showCheckbox={true}
          hidePlaceholder={true}
          avoidHighlightFirstOption={true}
          selectedOptions={selectedOptions}
          handleRemove={handleRemoveOption}
          handleSelect={handleSelectOption}
        />
      </Grid>
      <UniversalTable
        title="Coach List"
        headerItems={headerItems}
        items={coachesData?.users as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !coachesData?.users?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
      <PromptAlert
        loading={deletingProfile}
        content={`This action will permanently delete @${ActiveUser?.username} from our servers.`}
        showPrompt={updatingProfile === StatusEnum.DELETING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
          setActiveUser({});
        }}
        handleConfirmPrompt={() => handleDeleteCoachConfirmPrompt(ActiveUser)}
      />
    </main>
  );
};

export default observer(Coaches);
