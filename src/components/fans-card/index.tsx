/** @format */

"use client";

import { FC, useMemo, useState } from "react";
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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import {
  GetUsersQuery,
  SortOrder,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import FanCount from "@/components/counts/fans";
import { SearchInput } from "../search-input";
import { useDebouncedValue } from "@mantine/hooks";
import SelectCard from "@/components/select";
import UniversalTable from "../universal-table";
import Pagination from "../pagination";
import UserAvatar from "../user-avatar";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { AccountType } from "@/lib/enums/account-type.enum";
import { Icons } from "../Icons";

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
  { name: "Username" },
  // { name: "Role" },
  { name: "Email" },
  { name: "Status" },
  { name: "Action" },
];

interface FansProps {}

const FansCard: FC<FansProps> = ({}) => {
  const { toast } = useToast();
  // const {
  //   userStore: { setUsers },
  // } = useRootStore();
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [isActivating, setIsactivating] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const {
    data: fansData,
    loading: loading,
    refetch,
    fetchMore,
  } = useGetUsersQuery({
    variables: {
      where: {
        accountTypeId: { equals: 2 },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    pollInterval: 30 * 1000,
  });

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
      // if (resp?.data?.updateOneUser) {
      //   await refetch();
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
      setIsactivating(false);
      setSelectedUser(null);
    }
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
    const userItems = [
      {
        name: "View Details",
        onclick: () => router.push(`/fan/${item?.id}`, { scroll: true }),
      },
      {
        name: `Edit Profile`,
        onclick: () =>
          router.push(`/fans/edit?fan=${Number(item?.id)}`, {
            scroll: true,
          }),
      },
      {
        name: `${item?.isActive ? "Deactivate" : "Activate"} Profile`,
        onclick: async () => await handleActiveUser(item),
      },

      // {
      //   name: "Delete User",
      //   onclick: async () => await handleDeleteUser(item),
      // },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() => router.push(`/fan/${item?.id}`, { scroll: true })}
          >
            <UserAvatar
              className="h-[59px] w-[59px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.firstname?.charAt(0)} ${item?.surname?.charAt(
                0
              )}`}
            />
            <Text className="ml-2 cursor-pointer">
              {item?.firstname} {item?.surname}
            </Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>@{item?.username}</Text>
        </TableCell>
        {/* <TableCell className="text-center">
          <Text>{item.accountType?.role?.title}</Text>
        </TableCell> */}
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
      <Title>Fans</Title>
      <Text>In Progress</Text>
      <Divider></Divider>
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        {/* <UsersCount />
              <AthletesCount />
              <CoachesCount /> */}
        <FanCount />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
        {/* <TextInput
                className="h-[38px] bg-background dark:bg-dark-background"
                icon={() => {
                  return (
                    <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
                  );
                }}
                onValueChange={(e) => setValue(e)}
                placeholder="Search for athlete..."
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
        title="User List"
        loading={loading}
        headerItems={headerItems}
        items={fansData?.users as any[]}
        renderItems={renderItems}
      />
      {loading || !fansData?.users?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};

export default FansCard;
