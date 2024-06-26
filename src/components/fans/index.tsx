/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Title, Text, Grid, Badge } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  useDeleteFirebaseUserMutation,
  useDeleteUserMutation,
  useGetAggregateUserLazyQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import FanStatCard from "@/components/stat-cards/fan";
import { SearchInput } from "../search-input";
import { useDebouncedValue } from "@mantine/hooks";
import UniversalTable from "../universal-table";
import Pagination from "../pagination";
import UserAvatar from "../user-avatar";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  BadgeAlertIcon,
  BadgeCheckIcon,
  FanIcon,
  Loader2Icon,
  MoreHorizontalIcon,
} from "../Icons";
import MenubarCard from "../menubar";
import { observer } from "mobx-react-lite";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import MultiSelector from "../multi-selector";
import { fanFilter } from "@/lib/filters";
import { getPermission, getURLParams } from "@/lib/helpers";
import PromptAlert from "../prompt-alert";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import { useRootStore } from "@/mobx";

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Status" },
  { name: "Verified" },
  { name: "Actions" },
];

interface FansProps {}

const Fans: FC<FansProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    fanStore: { setFans },
    authStore: { user },
  } = useRootStore();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [isActivating, setIsactivating] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const [agrregatedFans] = useGetAggregateUserLazyQuery();
  const filteredParams = getURLParams(selectedOptions);
  const [ActiveUser, setActiveUser] = useState<any>({});
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [deletingProfile, setDeletingProfile] = useState<boolean>(false);
  const [verifyingProfile, setVerifyingProfile] = useState<boolean>(false);
  const [deleteFirebaseUser] = useDeleteFirebaseUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  useState<boolean>(false);

  const permissionName = getPermission(
    user?.role?.permissions,
    "fans.accesslevel.update"
  );

  const {
    data: fansData,
    loading: loading,
    refetch,
    fetchMore,
  } = useGetUsersQuery({
    variables: {
      where: {
        accountType: {
          is: {
            title: {
              equals: "Fan",
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

  const handleDeleteFanConfirmPrompt = async (item: any) => {
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
      }
      const fanResponse = await agrregatedFans({
        variables: {
          where: {
            accountType: {
              is: {
                title: {
                  equals: "Fan",
                },
              },
            },
          },
        },
      });
      setFans(fanResponse.data as any);
      refetch();
      toast({
        title: "Fan successfully deleted.",
        description: `@${item?.username} profile has been deleted.`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete fan profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setDeletingProfile(false);
      setActiveUser({});
      setUpdatingProfile(null);
    }
  };

  const handleDeleteFan = (item: any) => {
    setUpdatingProfile(StatusEnum.DELETING);
    setActiveUser(item);
  };

  const handleVerifyFan = (item: any) => {
    setUpdatingProfile(StatusEnum.VERIFYING);
    setActiveUser(item);
  };

  const handleConfirmVerifyFan = async (item: any) => {
    setVerifyingProfile(true);
    try {
      const isVerified = item?.fanVerified;
      await updateUser({
        variables: {
          where: { id: item?.id },
          data: {
            fanVerified: { set: !isVerified },
            // verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      await refetch({});
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          !isVerified ? "verified" : "unverified"
        }`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not verify fan profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedUser(null);
      setVerifyingProfile(false);
    }
  };

  const handleActiveUser = async (item: any) => {
    setSelectedUser(item?.id);
    setIsactivating(true);
    try {
      const isActive = item?.isActive;
      await updateUser({
        variables: {
          where: {
            id: item?.id,
          },
          data: {
            isActive: { set: !isActive },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          isActive ? "deactivated" : "activated"
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
      setIsactivating(false);
      setSelectedUser(null);
    }
  };

  const handleSelectOption = (selectedList: any, selectedItem: any) => {
    setSelectedOptions((prev) => [...prev, selectedItem]);
  };

  const handleRemoveOption = (selectedList: any, removedItem: any) => {
    setSelectedOptions((prev) => [
      ...prev.filter((a) => a?.id !== removedItem?.id),
    ]);
  };

  const lastUserId = useMemo(() => {
    const lastPostInResults = fansData?.users[fansData?.users?.length - 1];
    return lastPostInResults?.id;
  }, [fansData?.users]);

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
        skip: fansData?.users?.length,
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
    const fanItems = [
      {
        name: "View Details",
        onClick: () => router.push(`/fan/${item?.id}`, { scroll: true }),
      },
    ];

    if (permissionName !== ("" || null || undefined)) {
      fanItems?.push(
        {
          name: `Edit Profile`,
          onClick: () =>
            router.push(`/fans/edit?fan=${item?.id}`, {
              scroll: true,
            }),
        },
        {
          name: `${item?.isActive ? "Deactivate" : "Activate"} Profile`,
          onClick: async () => await handleActiveUser(item),
        },
        {
          name: `${item?.fanVerified ? "Unverify" : "Verify"} Profile`,
          onClick: () => {
            handleVerifyFan(item);
          },
        },

        {
          name: "Delete Profile",
          onClick: () => handleDeleteFan(item),
        }
      );
    }
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div
            className="flex flex-ro items-center justify-start"
            onClick={() => router.push(`/fan/${item?.id}`, { scroll: true })}
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.firstname?.charAt(0)} ${item?.surname?.charAt(
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
            {item?.id === selectedUser && isActivating ? (
              <div className="text-center flex flex-row justify-center items-center">
                <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
                {item?.isActive ? "Deactivating..." : "Activating..."}
              </div>
            ) : (
              <BadgeCard
                size="xs"
                color={item?.isActive ? "teal" : "rose"}
                icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
                datatype="moderateDecrease"
              >
                {item?.isActive ? "Active" : "Deactivated"}
              </BadgeCard>
            )}
          </div>
        </TableCell>
        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.id === selectedUser &&
            updatingProfile === StatusEnum.VERIFYING ? (
              <div className="text-center flex flex-row justify-center items-center">
                <Loader2Icon className="mr-1 h-4 w-4 animate-spin " />
                {item?.fanVerified ? "Unverifying..." : "Verifying..."}
              </div>
            ) : (
              <BadgeCard
                size="xs"
                className="px-[8px]"
                color={item?.fanVerified ? "sky" : "rose"}
                icon={() => {
                  return item?.fanVerified ? (
                    <BadgeCheckIcon className="h-4 w-4 mr-1" color="sky" />
                  ) : (
                    <BadgeAlertIcon className="h-4 w-4 mr-1" color="rose" />
                  );
                }}
                datatype="moderateDecrease"
              >
                {item?.fanVerified ? "Verified" : "Not Verified"}
              </BadgeCard>
            )}
          </div>
        </TableCell>
        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontalIcon className="cursor-pointer" />
                </Button>
              }
              items={fanItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader
          title="Fans"
          icon={
            <FanIcon className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          }
          subHeader="Fans Overview"
        />
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <FanStatCard />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        <MultiSelector
          options={fanFilter}
          displayValue="label"
          placeholder="Filter"
          showCheckbox={true}
          loading={loading}
          disable={loading}
          hidePlaceholder={true}
          avoidHighlightFirstOption={true}
          selectedOptions={selectedOptions}
          handleRemove={handleRemoveOption}
          handleSelect={handleSelectOption}
        />
      </Grid>
      <UniversalTable
        title="User List"
        loading={loading}
        headerItems={headerItems}
        items={fansData?.users as any[]}
        renderItems={renderItems}
      />
      {loading || !fansData?.users?.length ? null : (
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
        handleConfirmPrompt={() => handleDeleteFanConfirmPrompt(ActiveUser)}
      />
      <PromptAlert
        loading={verifyingProfile}
        content={`This action will ${
          ActiveUser?.fanVerified ? "unverify" : "verify"
        }  @${ActiveUser?.username}.`}
        showPrompt={updatingProfile === StatusEnum.VERIFYING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
          setActiveUser({});
        }}
        handleConfirmPrompt={() => handleConfirmVerifyFan(ActiveUser)}
      />
    </main>
  );
};

export default observer(Fans);
