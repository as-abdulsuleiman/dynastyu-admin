/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Title, Text, Grid } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
import CoacheVerificationRequestStatCard from "@/components/stat-cards/coach-verification-request";
import SelectCard from "@/components/select";
import {
  CoachProfileWhereInput,
  GetCoachesQuery,
  QueryMode,
  SortOrder,
  useDeleteCoachMutation,
  useDeleteUserMutation,
  useGetCoachesLazyQuery,
  useGetCoachesQuery,
  useGetUsersLazyQuery,
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
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTVERIFIED = "Not Verified",
  NOTAPPROVED = "Not Approved",
}

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Coach Title" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Verified" },
  { name: "Actions" },
];

interface CoachVerificationRequestProps {}

const CoachVerificationRequest: FC<CoachVerificationRequestProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    userStore: { setUsers },
  } = useRootStore();
  const {
    coacheStore: { setCoaches },
  } = useRootStore();
  const [status, setStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [isActivating, setIsactivating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [deleteCoach] = useDeleteCoachMutation();
  const [updateCoach] = useUpdateCoachMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const [getCoaches] = useGetCoachesLazyQuery();

  const {
    loading,
    data: coachesData,
    refetch,
    fetchMore,
  } = useGetCoachesQuery({
    variables: {
      where: {
        verified: { equals: false },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    returnPartialData: true,
    fetchPolicy: "cache-first",
    // pollInterval: 30 * 1000,
  });

  //   const whereClause: CoachProfileWhereInput = useMemo(() => {
  //     if (status === FilterEnum.INACTIVE) {
  //       return {
  //         user: {
  //           is: {
  //             isActive: {
  //               equals: false,
  //             },
  //           },
  //         },
  //       };
  //     } else if (status === FilterEnum.ACTIVE) {
  //       return {
  //         user: {
  //           is: {
  //             isActive: {
  //               equals: true,
  //             },
  //           },
  //         },
  //       };
  //     } else if (status === FilterEnum.VERIFIED) {
  //       return {
  //         verified: {
  //           equals: true,
  //         },
  //       };
  //     } else if (status === FilterEnum.NOTVERIFIED) {
  //       return {
  //         verified: {
  //           equals: false,
  //         },
  //       };
  //     } else {
  //       return {};
  //     }
  //   }, [status]);

  useEffect(() => {
    refetch({
      where: {
        verified: { equals: false },
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
  }, [status, debounced, refetch]);

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      coachesData?.coachProfiles[coachesData?.coachProfiles?.length - 1];
    return lastPostInResults?.id;
  }, [coachesData?.coachProfiles]);

  const handleDeleteCoach = async (item: any) => {
    try {
      const response = await deleteCoach({
        variables: {
          where: {
            id: item.id,
          },
        },
      });
      if (response.data?.deleteOneCoachProfile) {
        await deleteUser({
          variables: {
            where: {
              id: item?.user?.id,
            },
          },
        });
        const caochesResponse = await getCoaches({});
        const usersResponse = await getUsers({});
        await refetch();
        setUsers(usersResponse.data?.users as any);
        setCoaches(caochesResponse.data?.coachProfiles as any);
        toast({
          title: "Coach successfully deleted.",
          description: `@${item?.user?.username} account has been deleted.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleActivateCoach = async (item: any) => {
    setSelectedUser(item?.id);
    setIsactivating(true);
    try {
      const isCoachActive = item?.user?.isActive;
      await updateCoach({
        variables: {
          where: {
            id: item?.id,
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
        description: `@${item?.user?.username} profile has been ${
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
      setIsactivating(false);
      setSelectedUser(null);
    }
  };

  const handleVerifyCoach = async (item: any) => {
    setSelectedUser(item?.id);
    setIsVerifying(true);
    try {
      const isVerified = item?.verified;
      await updateCoach({
        variables: {
          where: {
            id: item?.id,
          },
          data: {
            verified: {
              set: !isVerified,
            },
          },
        },
      });
      await refetch();
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
          !isVerified ? "verified" : "unverified"
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
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
      setSelectedUser(null);
    }
  };

  const handleEditCoach = (item: any) => {
    router.push(`/coaches/edit?coach=${item?.id}`);
  };

  const fetchNext = () => {
    fetchMore({
      variables: {
        // verified: { equals: false },

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
        previousResult: GetCoachesQuery,
        { fetchMoreResult }
      ): GetCoachesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.coachProfiles?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.coachProfiles;
          const fetchMorePosts = fetchMoreResult?.coachProfiles;
          fetchMoreResult.coachProfiles = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        // verified: { equals: false },
        take: -10,
        skip: coachesData?.coachProfiles?.length,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetCoachesQuery,
        { fetchMoreResult }
      ): GetCoachesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.coachProfiles?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.coachProfiles;
          const fetchMorePosts = fetchMoreResult?.coachProfiles;
          fetchMoreResult.coachProfiles = [...fetchMorePosts];
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
          router.push(`/coach/${item?.userId}`, { scroll: true });
        },
      },
      {
        name: "Edit Profile",
        onClick: () => handleEditCoach(item),
      },
      {
        name: `${item.verified ? "Unverify" : "Verify"} Profile`,
        onClick: () => handleVerifyCoach(item),
      },
      //   {
      //     name: `${item?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
      //     onClick: async () => await handleActivateCoach(item),
      //   },
      // {
      //   name: "Delete Coach",
      //   onClick: async () => await handleDeleteCoach(item),
      // },
    ];

    return (
      <TableRow key={item?.id} className="">
        <TableCell>
          <div
            className="flex flex-row justify-start items-center"
            onClick={() =>
              router.push(`/coach/${item?.userId}`, { scroll: true })
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
            <div className="ml-4 cursor-pointer text-base">
              {item?.user?.firstname} {item?.user?.surname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>
            {item?.user?.username
              ? `@${item?.user?.username?.toLowerCase()}`
              : ""}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.user?.email?.toLowerCase()}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.title}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>
            {item?.createdAt ? formatDate(item?.createdAt, "dd MMM yyyy") : ""}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>
            {item?.updatedAt ? formatDate(item?.updatedAt, "dd MMM yyyy") : ""}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.id === selectedUser && isVerifying ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Loader2Icon className="mr-1 h-4 w-4 animate-spin " />
              {item?.verified ? "Unverifying..." : "Verifying..."}
            </div>
          ) : (
            <BadgeCard
              size="xs"
              className="px-[8px]"
              color={item?.verified ? "sky" : "rose"}
              icon={() => {
                return item.verified ? (
                  <BadgeCheckIcon className="h-4 w-4 mr-1" color="sky" />
                ) : (
                  <BadgeAlertIcon className="h-4 w-4 mr-1" color="rose" />
                );
              }}
              datatype="moderateDecrease"
            >
              {item?.verified ? "Verified" : "Not Verified"}
            </BadgeCard>
          )}
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
                <WhistleIcon className="h-4 w-4 ml-2 fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis" />
              }
              subHeader="Coaches Verification Overview"
            />
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsSm={1} className="mt-6 gap-6">
        <CoacheVerificationRequestStatCard />
      </Grid>
      <div className="flex mt-6 gap-6 w-full justify-end">
        <div className="w-full md:w-1/2 order-2">
          <SearchInput
            className="h-[40px]"
            onChange={(e) => setValue(e?.target?.value)}
            placeholder="Type to search..."
          />
        </div>
      </div>
      <UniversalTable
        title="Coach List"
        headerItems={headerItems}
        items={coachesData?.coachProfiles as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !coachesData?.coachProfiles?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};

export default observer(CoachVerificationRequest);
