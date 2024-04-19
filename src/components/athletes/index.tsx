/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import { useRootStore } from "@/mobx";
import { Title, Text, Grid, Flex, Badge, TextInput } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import SelectCard from "@/components/select";
import AthleteStatCard from "@/components/stat-cards/athlete";
import { useDebouncedValue } from "@mantine/hooks";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  UserWhereInput,
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
import ContentHeader from "../content-header";

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
];

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Position" },
  { name: "Status" },
  { name: "Verified" },
  { name: "Featured" },
  { name: "Created At" },
  { name: "Actions" },
];

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTVERIFIED = "Not Verified",
  NOTAPPROVED = "Not Approved",
  FEATURED = "Featured",
}

interface AthletesProps {}

const Athletes: FC<AthletesProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    authStore: { user },
    userStore: { setUsers },
    athleteStore: { setAthletes },
  } = useRootStore();

  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteAthlete] = useDeleteAthleteMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const [getAthletes] = useGetUsersLazyQuery();

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
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  // const { data, loading, refetch, fetchMore } = useGetAthletesQuery({
  //   variables: {
  //     take: 10,
  //     orderBy: {
  //       createdAt: SortOrder.Desc,
  //     },
  //   },
  //   // returnPartialData: true,
  //   fetchPolicy: "cache-first",
  //   // pollInterval: 30 * 1000,
  // });

  const whereClause: UserWhereInput = useMemo(() => {
    if (status === FilterEnum.INACTIVE) {
      return {
        isActive: {
          equals: false,
        },
      };
    } else if (status === FilterEnum.ACTIVE) {
      return {
        isActive: {
          equals: true,
        },
      };
    } else if (status === FilterEnum.VERIFIED) {
      return {
        athleteProfile: {
          is: {
            verified: {
              equals: true,
            },
          },
        },
      };
    } else if (status === FilterEnum.NOTVERIFIED) {
      return {
        athleteProfile: {
          is: {
            verified: {
              equals: false,
            },
          },
        },
      };
    } else {
      return {};
    }
  }, [status]);

  useEffect(() => {
    refetch({
      where: {
        accountType: {
          is: {
            title: {
              equals: "Athlete",
            },
          },
        },
        ...whereClause,
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
    });
  }, [status, whereClause, debounced, refetch]);

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
            id: Number(item.id),
          },
        },
      });
      if (response.data?.deleteOneAthleteProfile) {
        await deleteUser({
          variables: {
            where: {
              id: Number(item?.user?.id),
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
          item?.athleteProfile.verified ? "Unverify" : "Verify"
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
            <Badge
              size="xs"
              className="cursor-pointer text-sm"
              color={item?.isActive ? "teal" : "rose"}
              // tooltip={item?.user?.isActive ? "Active" : "Deactivated"}
              icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.isActive ? "Active" : "Deactivated"}
            </Badge>
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
            <Badge
              size="xs"
              className="cursor-pointer px-[8px] text-sm"
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
            </Badge>
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
            <Badge
              size="xs"
              className="cursor-pointer px-[8px] text-sm"
              color={item?.athleteProfile?.featured ? "yellow" : "rose"}
              icon={() => {
                return <StarIcon className="h-4 w-4 mr-1" />;
              }}
              datatype="moderateDecrease"
            >
              {item?.athleteProfile?.featured ? "Featured" : "Not Featured"}
            </Badge>
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
        {/* <TextInput
          className="h-[38px]"
          icon={() => {
            return <Icons.search className="h-10 w-5 ml-2.5" />;
          }}
          onValueChange={(e) => setValue(e)}
          placeholder="Type to search..."
        /> */}
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />

        <SelectCard
          className="ring-0 bg-background dark:bg-dark-background"
          items={filterItems}
          selectedItem={status}
          onValueChange={(e) => {
            setStatus(e);
          }}
        />
      </Grid>
      <UniversalTable
        title="Athlete List"
        headerItems={headerItems}
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
