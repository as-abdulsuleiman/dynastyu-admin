/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import { useRootStore } from "@/mobx";
import { Title, Text, Grid } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import AthleteStatCard from "@/components/stat-cards/athlete";
import { useDebouncedValue } from "@mantine/hooks";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  useDeleteAthleteMutation,
  useDeleteUserMutation,
  useGetUsersLazyQuery,
  useGetUsersQuery,
  useUpdateAthleteMutation,
} from "@/services/graphql";
import UniversalTable from "@/components/universal-table";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/user-avatar";
import { useToast } from "@/hooks/use-toast";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
import StarIcon from "@/components/Icons/starIcon";
import MenubarCard from "../menubar";
import { Separator } from "../ui/separator";
import { SearchInput } from "../search-input";
import MoreHorizontal from "../Icons/more-horizontal";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import { athleteFilter, athleteHeaderItems } from "@/lib/filters";
import MultiSelector from "../multi-selector";
import { getURLParams } from "@/lib/helpers";

interface AthletesProps {}

const Athletes: FC<AthletesProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    authStore: { user },
    userStore: { setUsers },
    athleteStore: { setAthletes },
  } = useRootStore();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteAthlete] = useDeleteAthleteMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const [getAthletes] = useGetUsersLazyQuery();
  const filteredParams = getURLParams(selectedOptions);

  const {
    data: athleteData,
    refetch,
    fetchMore,
    loading,
  } = useGetUsersQuery({
    variables: {
      where: {
        accountType: {
          is: {
            title: {
              equals: "Athlete",
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
      athleteData?.users[athleteData?.users?.length - 1];
    return lastPostInResults?.id;
  }, [athleteData?.users]);

  const handleDeleteAthlete = async (item: any) => {
    try {
      const response = await deleteAthlete({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      if (response.data?.deleteOneAthleteProfile) {
        await deleteUser({
          variables: {
            where: {
              id: item?.user?.id,
            },
          },
        });
        const athleteResp = await getAthletes({});
        const usersResponse = await getUsers({});
        await refetch();
        setUsers(usersResponse.data?.users as any);
        setAthletes(athleteResp.data?.users as any);
        toast({
          title: "Athlete successfully deleted.",
          description: `@${item?.username} account has been deleted.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleActivateAthlete = async (item: any) => {
    setUpdatingProfile(StatusEnum.ACTIVATING);
    setSelectedUser(item?.id);
    try {
      const isAthleteActive = item?.isActive;
      await updateAthlete({
        variables: {
          where: {
            id: item?.athleteProfile?.id,
          },
          data: {
            user: {
              update: {
                isActive: { set: !isAthleteActive },
              },
            },
          },
        },
      });
      await refetch({});
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          isAthleteActive ? "deactivated" : "activated"
        }`,
        variant: "successfull",
      });
      // await refetch({});
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedUser(null);
    }
  };

  const handleFeaturedAthlete = async (item: any) => {
    setUpdatingProfile(StatusEnum.FEATURING);
    setSelectedUser(item?.id);
    try {
      const isAthleteFeatured = item?.athleteProfile?.featured;
      await updateAthlete({
        variables: {
          where: {
            id: item?.athleteProfile?.id,
          },
          data: {
            featured: { set: !isAthleteFeatured },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          !isAthleteFeatured ? "added to featured" : "removed from featured"
        } `,
        variant: "successfull",
      });
      // if (resp.data?.updateOneAthleteProfile) {
      //   // await refetch();
      //   // toast({
      //   //   title: "Profile successfully updated.",
      //   //   description: `@${item?.user?.username} has been ${
      //   //     !isAthleteFeatured ? "added to featured" : "removed from featured"
      //   //   } `,
      //   //   variant: "default",
      //   // });
      // }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setSelectedUser(null);
    }
  };

  const handleVerifyAthlete = async (item: any) => {
    setUpdatingProfile(StatusEnum.VERIFYING);
    setSelectedUser(item?.id);
    try {
      const isVerified = item?.athleteProfile?.verified;
      await updateAthlete({
        variables: {
          where: { id: item?.athleteProfile?.id },
          data: {
            verified: { set: !isVerified },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
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
      // if (resp.data?.updateOneAthleteProfile) {
      //   //
      //   // toast({
      //   //   title: "Coach successfully updated.",
      //   //   description: `${coach?.user?.username} has been ${
      //   //     coach?.user?.isActive ? "Deactivated" : "Activated"
      //   //   } `,
      //   //   variant: "default",
      //   // });
      // }
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
        skip: athleteData?.users,
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
    const athleteItems = [
      {
        name: "View Details",
        onClick: () => {
          router.push(`/athlete/${item?.id}`, {
            scroll: true,
          });
        },
      },
      {
        name: "View Skills",
        onClick: () => {
          router.push(`/skills?athlete=${item?.athleteProfile?.id}`, {
            scroll: true,
          });
        },
      },
      {
        name: "Edit Profile",
        onClick: () => {
          router.push(`/athletes/edit?athlete=${item?.athleteProfile?.id}`, {
            scroll: true,
          });
        },
      },
      {
        name: `${
          item?.athleteProfile?.verified ? "Unverify" : "Verify"
        } Profile`,
        onClick: () => handleVerifyAthlete(item),
      },
      {
        name: `${item?.isActive ? "Deactivate" : "Activate"} Profile`,
        onClick: () => handleActivateAthlete(item),
      },
      {
        name: `${
          item?.athleteProfile?.featured
            ? "Remove from featured"
            : "Add to featured"
        }`,
        onClick: () => handleFeaturedAthlete(item),
      },
      // {
      //   name: "Delete Profile",
      //   onclick: async () => await handleDeleteAthlete(item),
      // },
    ];

    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div
            className="flex flex-row items-center justify-start"
            onClick={() =>
              router.push(`/athlete/${item?.id}`, {
                scroll: true,
              })
            }
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
          <div>{item?.username ? `@${item?.username}` : ""}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.email}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2">{item?.athleteProfile?.position?.name}</div>{" "}
            <div>({item?.athleteProfile?.position?.shortName})</div>
          </div>
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser &&
          updatingProfile === StatusEnum.ACTIVATING ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin " />
              {item?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <BadgeCard
              size="xs"
              color={item?.isActive ? "teal" : "rose"}
              // tooltip={item?.user?.isActive ? "Active" : "Deactivated"}
              icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.isActive ? "Active" : "Deactivated"}
            </BadgeCard>
          )}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.id === selectedUser &&
          updatingProfile === StatusEnum.VERIFYING ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin " />
              {item?.athleteProfile?.verified
                ? "Unverifying..."
                : "Verifying..."}
            </div>
          ) : (
            <BadgeCard
              size="xs"
              className="px-[8px]"
              color={item?.athleteProfile?.verified ? "sky" : "rose"}
              icon={() => {
                return item?.athleteProfile?.verified ? (
                  <Icons.badgeCheck className="h-4 w-4 mr-1" color="sky" />
                ) : (
                  <Icons.badgeAlert className="h-4 w-4 mr-1" color="rose" />
                );
              }}
              datatype="moderateDecrease"
            >
              {item?.athleteProfile?.verified ? "Verified" : "Not Verified"}
            </BadgeCard>
          )}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.id === selectedUser &&
          updatingProfile === StatusEnum.FEATURING ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
              {"Loading..."}
            </div>
          ) : (
            <BadgeCard
              size="xs"
              className="px-[8px]"
              color={item?.athleteProfile?.featured ? "yellow" : "rose"}
              icon={() => {
                return <StarIcon className="h-4 w-4 mr-1" />;
              }}
              datatype="moderateDecrease"
            >
              {item?.athleteProfile?.featured ? "Featured" : "Not Featured"}
            </BadgeCard>
          )}
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.createdAt), "MMMM dd yyyy")}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontal className="cursor-pointer" />
                </Button>
              }
              items={athleteItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };
  const handleSelectOption = (selectedList: any, selectedItem: any) => {
    setSelectedOptions((prev) => [...prev, selectedItem]);
  };

  const handleRemoveOption = (selectedList: any, removedItem: any) => {
    setSelectedOptions((prev) => [
      ...prev.filter((a) => a?.id !== removedItem?.id),
    ]);
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader
          title="Athletes"
          icon={
            <Icons.athlete className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          }
          subHeader="Athletes Overview"
        />
      </div>

      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <AthleteStatCard />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        <MultiSelector
          options={athleteFilter}
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
        title="Athlete List"
        headerItems={athleteHeaderItems}
        items={athleteData?.users as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !athleteData?.users?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};
export default Athletes;
