/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Title, Text, Flex, Grid, Badge, TextInput } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import {
  GetUsersQuery,
  SortOrder,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import FanStatCard from "@/components/stat-cards/fan";
import { SearchInput } from "../search-input";
import { useDebouncedValue } from "@mantine/hooks";
import SelectCard from "@/components/select";
import UniversalTable from "../universal-table";
import Pagination from "../pagination";
import UserAvatar from "../user-avatar";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "../Icons";
import MenubarCard from "../menubar";
import { observer } from "mobx-react-lite";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MoreHorizontal from "../Icons/more-horizontal";

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
  { name: "Status" },
  { name: "Actions" },
];

interface FansProps {}

const Fans: FC<FansProps> = ({}) => {
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
    // pollInterval: 30 * 1000,
  });

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
      {
        name: `Edit Profile`,
        onClick: () =>
          router.push(`/fans/edit?fan=${Number(item?.id)}`, {
            scroll: true,
          }),
      },
      {
        name: `${item?.isActive ? "Deactivate" : "Activate"} Profile`,
        onClick: async () => await handleActiveUser(item),
      },

      // {
      //   name: "Delete User",
      //   onClick: async () => await handleDeleteUser(item),
      // },
    ];
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
          <div>{item?.username ? `@${item?.username}` : ""}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.email}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.id === selectedUser && isActivating ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
              {item?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer text-sm"
              color={item?.isActive ? "teal" : "rose"}
              icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.isActive ? "Active" : "Deactivated"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontal className="cursor-pointer" />
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
      <Title>Fans</Title>
      <Text>In Progress</Text>
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <FanStatCard />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        {/* <TextInput
          className="h-[38px]"
          icon={() => {
            return <Icons.search className="h-10 w-5 ml-2.5" />;
          }}
          onValueChange={(e) => setValue(e)}
          placeholder="Type to search..."
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

export default observer(Fans);
