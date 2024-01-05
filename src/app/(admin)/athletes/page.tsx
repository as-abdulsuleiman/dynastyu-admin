/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import { useRootStore } from "@/mobx";
import {
  Title,
  Text,
  Divider,
  TabGroup,
  TabPanels,
  TabPanel,
  Grid,
  TextInput,
  TableRow,
  TableCell,
  Flex,
  Badge,
} from "@tremor/react";
import SelectCard from "@/components/select";
import { observer } from "mobx-react-lite";
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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import UserAvatar from "@/components/user-avatar";
import { useToast } from "@/hooks/use-toast";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
  // { name: "Approved", value: "Approved" },
  // { name: "Not Approved", value: "Not Approved" },
];

const headerItems = [
  { name: "Name" },
  { name: "Email" },
  { name: "Position" },
  { name: "Status" },
  { name: "Verified" },
  { name: "Action" },
];

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTVERIFIED = "Not Verified",
  NOTAPPROVED = "Not Approved",
}

interface AthletesProps {}

const Athletes: FC<AthletesProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    athleteStore: { setAthletes },
  } = useRootStore();
  const {
    userStore: { setUsers },
  } = useRootStore();

  const {
    authStore: { user },
  } = useRootStore();

  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsactivating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>();
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
    pollInterval: 30 * 1000,
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

  const handleActiveAthlete = async (item: any) => {
    setSelectedUser(item?.id);
    setIsactivating(true);
    try {
      const isAthleteActive = item?.user?.isActive;
      const resp = await updateAthlete({
        variables: {
          where: {
            id: Number(item?.id),
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
      if (resp.data?.updateOneAthleteProfile) {
        await refetch();
        // toast({
        //   title: "Coach successfully updated.",
        //   description: `${item?.user?.username} has been ${
        //     coach?.user?.isActive ? "Deactivated" : "Activated"
        //   } `,
        //   variant: "default",
        // });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsactivating(false);
      setSelectedUser(null);
    }
  };

  const handleVerifyAthlete = async (item: any) => {
    setSelectedUser(item?.id);
    setIsVerifying(true);
    try {
      const isVerified = item?.verified;
      const resp = await updateAthlete({
        variables: {
          where: { id: item?.id },
          data: {
            verified: { set: !isVerified },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      if (resp.data?.updateOneAthleteProfile) {
        await refetch();
        // toast({
        //   title: "Coach successfully updated.",
        //   description: `${coach?.user?.username} has been ${
        //     coach?.user?.isActive ? "Deactivated" : "Activated"
        //   } `,
        //   variant: "default",
        // });
      }
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
    const coacheItems = [
      {
        name: "View Details",
        onclick: () => {
          router.push(`/athlete/${Number(item?.id)}`, { scroll: true });
        },
      },
      {
        name: `${item?.user?.isActive ? "Deactivate" : "Activate"} Athlete`,
        onclick: async () => await handleActiveAthlete(item),
      },
      {
        name: "Delete Athlete",
        onclick: async () => await handleDeleteAthlete(item),
      },
      {
        name: `${item.verified ? "Unverify Athlete" : "Verify Athlete"}`,
        onclick: async () => await handleVerifyAthlete(item),
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex alignItems="center" justifyContent="start">
            <UserAvatar
              className="h-[55px] w-[55px] shadow"
              fallbackType="name"
              avatar={item?.user?.avatar as string}
              fallback={`${item?.user?.username?.charAt(
                0
              )} ${item?.user?.firstname?.charAt(0)}`}
            />
            <Text className="ml-2">
              {item?.user?.firstname} {item?.user?.surname}
            </Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.user?.email}</Text>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex flex-row items-center justify-center">
            <Text className="mr-2">{item?.position?.name}</Text>{" "}
            <Text>({item?.position?.shortName})</Text>
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
              tooltip={item?.user?.isActive ? "Active" : "Deactivated"}
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
              color={item?.verified ? "teal" : "rose"}
              tooltip={item?.verified ? "Verified" : "Not Verified"}
              icon={() => {
                return item.verified ? (
                  <Icons.badgeCheck className="h-4 w-4 mr-1" color="teal" />
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
        <TableCell className="text-center cursor-pointer">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <Menubar className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent focus-within:bg-transparent focus-visible:bg-transparent active:bg-transparent">
                  <Icons.moreHorizontal />
                </MenubarTrigger>
                <MenubarContent
                  side="bottom"
                  align="start"
                  sideOffset={-3}
                  alignOffset={-100}
                  className="rounded-tremor-default cursor-pointer bg-background dark:bg-dark-background"
                >
                  {coacheItems?.map((val, id) => {
                    return (
                      <MenubarItem
                        onClick={val?.onclick}
                        key={id}
                        className="cursor-pointer tremor-SelectItem-root flex justify-start items-center text-tremor-default  ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis px-2.5 py-2.5"
                      >
                        {val?.name}
                      </MenubarItem>
                    );
                  })}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
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
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
              <AthletesCount />
            </Grid>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
              <TextInput
                className="h-[38px] bg-background dark:bg-dark-background"
                icon={() => {
                  return (
                    <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
                  );
                }}
                onValueChange={(e) => setValue(e)}
                placeholder="Search for athlete..."
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
              title="Coaches List"
              headerItems={headerItems}
              items={data?.athleteProfiles as any[]}
              loading={loading}
              renderItems={renderItems}
            />
            {loading || !data?.athleteProfiles?.length ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
export default observer(Athletes);
