/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import { useRootStore } from "@/mobx";
import {
  Title,
  Text,
  Divider,
  Grid,
  TableRow,
  TableCell,
  Flex,
  Badge,
  TextInput,
} from "@tremor/react";
import SelectCard from "@/components/select";
import AthletesCount from "@/components/counts/athletes";
import { useDebouncedValue } from "@mantine/hooks";
import {
  AthleteProfileWhereInput,
  GetAthletesQuery,
  QueryMode,
  SortOrder,
  useDeleteAthleteMutation,
  useDeleteUserMutation,
  useGetAthletesQuery,
  useGetUsersLazyQuery,
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
  const [isActivating, setIsActivating] = useState<boolean>(false);
  const [isFeaturing, setIsFeaturing] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteAthlete] = useDeleteAthleteMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const [getAthletes] = useGetUsersLazyQuery();

  const { data, loading, refetch, fetchMore } = useGetAthletesQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    // returnPartialData: true,
    fetchPolicy: "cache-first",
    // pollInterval: 30 * 1000,
  });

  const whereClause: AthleteProfileWhereInput = useMemo(() => {
    if (status === FilterEnum.INACTIVE) {
      return {
        user: {
          is: {
            isActive: {
              equals: false,
            },
          },
        },
      };
    } else if (status === FilterEnum.ACTIVE) {
      return {
        user: {
          is: {
            isActive: {
              equals: true,
            },
          },
        },
      };
    } else if (status === FilterEnum.VERIFIED) {
      return {
        verified: {
          equals: true,
        },
      };
    } else if (status === FilterEnum.NOTVERIFIED) {
      return {
        verified: {
          equals: false,
        },
      };
    } else {
      return {};
    }
  }, [status]);

  useEffect(() => {
    refetch({
      where: {
        ...whereClause,
        OR: [
          {
            user: {
              is: {
                username: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                firstname: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                surname: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            user: {
              is: {
                email: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
      },
    });
  }, [status, whereClause, debounced, refetch]);

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      data?.athleteProfiles[data?.athleteProfiles?.length - 1];
    return lastPostInResults?.id;
  }, [data?.athleteProfiles]);

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
          description: `@${item?.user?.username} account has been deleted.`,
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
    setIsActivating(true);
    setSelectedUser(item?.id);
    try {
      const isAthleteActive = item?.user?.isActive;
      await updateAthlete({
        variables: {
          where: {
            id: item?.id,
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
      await refetch();
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
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
      setIsActivating(false);
      setSelectedUser(null);
    }
  };

  const handleFeaturedAthlete = async (item: any) => {
    setIsFeaturing(true);
    setSelectedUser(item?.id);
    try {
      const isAthleteFeatured = item?.featured;
      await updateAthlete({
        variables: {
          where: {
            id: item?.id,
          },
          data: {
            featured: { set: !isAthleteFeatured },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
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
      setIsFeaturing(false);
      setSelectedUser(null);
    }
  };

  const handleVerifyAthlete = async (item: any) => {
    setIsVerifying(true);
    setSelectedUser(item?.id);
    try {
      const isVerified = item?.verified;
      await updateAthlete({
        variables: {
          where: { id: item?.id },
          data: {
            verified: { set: !isVerified },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      // await refetch();
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
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
      setIsVerifying(false);
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
        previousResult: GetAthletesQuery,
        { fetchMoreResult }
      ): GetAthletesQuery => {
        if (
          !fetchMoreResult ||
          fetchMoreResult?.athleteProfiles?.length === 0
        ) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.athleteProfiles;
          const fetchMorePosts = fetchMoreResult?.athleteProfiles;
          fetchMoreResult.athleteProfiles = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: data?.athleteProfiles?.length,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetAthletesQuery,
        { fetchMoreResult }
      ): GetAthletesQuery => {
        if (
          !fetchMoreResult ||
          fetchMoreResult?.athleteProfiles?.length === 0
        ) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.athleteProfiles;
          const fetchMorePosts = fetchMoreResult?.athleteProfiles;
          fetchMoreResult.athleteProfiles = [...fetchMorePosts];
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
          router.push(`/athlete/${Number(item?.id)}`, { scroll: true });
        },
      },
      {
        name: "Edit Profile",
        onClick: () => {
          router.push(`/athletes/edit?athlete=${Number(item?.id)}`, {
            scroll: true,
          });
        },
      },
      {
        name: `${item.verified ? "Unverify" : "Verify"} Profile`,
        onClick: () => handleVerifyAthlete(item),
      },
      {
        name: `${item?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
        onClick: () => handleActivateAthlete(item),
      },
      {
        name: `${item?.featured ? "Remove from featured" : "Add to featured"}`,
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
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() =>
              router.push(`/athlete/${item?.id}`, { scroll: true })
            }
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.user?.avatar as string}
              fallback={`${item?.user?.username?.charAt(
                0
              )} ${item?.user?.firstname?.charAt(0)}`}
            />
            <div className="ml-4 cursor-pointer">
              {item?.user?.firstname} {item?.user?.surname}
            </div>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <div>{item?.user?.username ? `@${item?.user?.username}` : ""}</div>
        </TableCell>
        <TableCell className="text-center">
          <div>{item?.user?.email}</div>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2">{item?.position?.name}</div>{" "}
            <div>({item?.position?.shortName})</div>
          </div>
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser && isActivating ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin " />
              {item?.user?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer"
              color={item?.user?.isActive ? "teal" : "rose"}
              // tooltip={item?.user?.isActive ? "Active" : "Deactivated"}
              icon={item?.user?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.user?.isActive ? "Active" : "Deactivated"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser && isVerifying ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin " />
              {item?.verified ? "Unverifying..." : "Verifying..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer px-[8px]"
              color={item?.verified ? "sky" : "rose"}
              // tooltip={item?.verified ? "Verified" : "Not Verified"}
              icon={() => {
                return item.verified ? (
                  <Icons.badgeCheck className="h-4 w-4 mr-1" color="sky" />
                ) : (
                  <Icons.badgeAlert className="h-4 w-4 mr-1" color="rose" />
                );
              }}
              datatype="moderateDecrease"
            >
              {item?.verified ? "Verified" : "Not Verified"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser && isFeaturing ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
              {"Loading..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer px-[8px]"
              color={item?.featured ? "yellow" : "rose"}
              // tooltip={item?.featured ? "Featured" : "Not Featured"}
              icon={() => {
                return <StarIcon className="h-4 w-4 mr-1" />;
              }}
              datatype="moderateDecrease"
            >
              {item?.featured ? "Featured" : "Not Featured"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center cursor-pointer">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={<Icons.moreHorizontal className="cursor-pointer" />}
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
        <Title>Athletes</Title>
        <Icons.athlete className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
      </div>
      <Text>Athletes Overview</Text>
      <Divider></Divider>
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <AthletesCount />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <TextInput
          className="h-[38px]"
          icon={() => {
            return <Icons.search className="h-10 w-5 ml-2.5" />;
          }}
          onValueChange={(e) => setValue(e)}
          placeholder="Type to search..."
        />
        {/* <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        /> */}

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
        items={data?.athleteProfiles as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !data?.athleteProfiles?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};
export default Athletes;
