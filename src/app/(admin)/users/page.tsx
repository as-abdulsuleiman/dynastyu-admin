/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
  Title,
  Text,
  Divider,
  TabGroup,
  TabPanels,
  TabPanel,
  Flex,
  Grid,
  TextInput,
  TableCell,
  TableRow,
  Badge,
} from "@tremor/react";
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import SelectCard from "@/components/select";
import UsersCount from "@/components/counts/users";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { observer } from "mobx-react-lite";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import { AccountType } from "@/lib/enums/account-type.enum";
import { useToast } from "@/hooks/use-toast";
import { useRootStore } from "@/mobx";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  UserWhereInput,
  useDeleteUserMutation,
  useGetUsersLazyQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Athlete", value: "Athlete" },
  { name: "Fan", value: "Fan" },
  { name: "Coach", value: "Coach" },
];
const headerItems = [
  { name: "Name" },
  { name: "Role" },
  { name: "Email" },
  { name: "Status" },
  { name: "Action" },
];
enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ATHLETE = "Athlete",
  FAN = "Fan",
  COACH = "Coach",
}

interface UsersProps {}

const Users: FC<UsersProps> = ({}) => {
  const { toast } = useToast();
  const {
    userStore: { setUsers },
  } = useRootStore();
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsactivating] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [deteteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [getUsers] = useGetUsersLazyQuery();

  const {
    data: users,
    loading: loading,
    refetch,
    fetchMore,
  } = useGetUsersQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    pollInterval: 30 * 1000,
  });

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
    } else if (status === FilterEnum.ATHLETE) {
      return {
        accountTypeId: {
          equals: 1,
        },
      };
    } else if (status === FilterEnum.FAN) {
      return {
        accountTypeId: {
          equals: 2,
        },
      };
    } else if (status === FilterEnum.COACH) {
      return {
        accountTypeId: {
          equals: 3,
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
          { firstname: { contains: debounced, mode: QueryMode.Insensitive } },
          { surname: { contains: debounced, mode: QueryMode.Insensitive } },
          { username: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
    });
  }, [status, whereClause, debounced, refetch]);

  const lastUserId = useMemo(() => {
    const lastPostInResults = users?.users[users?.users?.length - 1];
    return lastPostInResults?.id;
  }, [users?.users]);

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
        skip: users?.users?.length,
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

  const handleDeleteUser = async (user: any) => {
    try {
      const response = await deteteUser({
        variables: {
          where: {
            id: Number(user?.id),
          },
        },
      });
      if (response.data?.deleteOneUser) {
        toast({
          title: "Coach successfully deleted.",
          description: `${user?.username} account has been deleted.`,
          variant: "default",
        });
        const response = await getUsers({});
        setUsers(response.data?.users as any);
        refetch();
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

  const handleActiveUser = async (item: any) => {
    setSelectedUser(item?.id);
    setIsactivating(true);
    try {
      const isActive = item?.isActive;
      const resp = await updateUser({
        variables: {
          where: {
            id: Number(item?.id),
          },
          data: {
            isActive: { set: !isActive },
          },
        },
      });
      if (resp.data?.updateOneUser) {
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

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    let userType = "";
    let userId = "";
    if (item?.accountType?.role?.title?.toLowerCase() === AccountType.FAN) {
      userType = "fan";
      userId = item?.id;
    } else if (
      item?.accountType?.role?.title?.toLowerCase() === AccountType.ATHLETE
    ) {
      userType = "athlete";
      userId = item?.athleteProfile?.id;
    } else if (
      item?.accountType?.role?.title?.toLowerCase() === AccountType.COACH
    ) {
      userType = "coach";
      userId = item?.coachProfile?.id;
    }

    const userItems = [
      {
        name: "View Details",
        onclick: () =>
          router.push(`/${userType}/${Number(userId)}`, { scroll: true }),
      },
      {
        name: `${item?.isActive ? "Deactivate" : "Activate"} User`,
        onclick: async () => await handleActiveUser(item),
      },
      {
        name: "Delete User",
        onclick: async () => await handleDeleteUser(item),
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex alignItems="center" justifyContent="start">
            <UserAvatar
              onClick={() =>
                router.push(`/${userType}/${Number(userId)}`, { scroll: true })
              }
              className="h-[55px] w-[55px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.username?.charAt(0)} ${item?.firstname?.charAt(
                0
              )}`}
            />
            <Text className="ml-2">
              {item?.firstname} {item?.surname}
            </Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item.accountType?.role?.title}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.email}</Text>
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser && isActivating ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
              {item?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer"
              color={item?.isActive ? "teal" : "rose"}
              // tooltip="decrease"
              icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.isActive ? "Active" : "Deactivated"}
            </Badge>
          )}
        </TableCell>
        <TableCell>
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
                  {userItems?.map((val, id) => {
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
      <Title>Users</Title>
      {/* <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text> */}
      <Divider></Divider>
      <TabGroup className="mt-6">
        {/* <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList> */}
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
              <UsersCount />
              {/* <UsersAnalytics /> */}
            </Grid>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
              <TextInput
                className="bg-background dark:bg-dark-background"
                icon={() => {
                  return (
                    <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
                  );
                }}
                onValueChange={(e) => setValue(e)}
                placeholder="Search..."
              />
              <SelectCard
                className="h-[38px] bg-background dark:bg-dark-background"
                items={filterItems}
                selectedItem={status}
                onValueChange={(e) => {
                  setStatus(e);
                }}
              />
            </Grid>
            <UniversalTable
              title="User List"
              loading={loading}
              headerItems={headerItems}
              items={users?.users as any[]}
              renderItems={renderItems}
            />
            {loading || !users?.users?.length ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
export default observer(Users);
