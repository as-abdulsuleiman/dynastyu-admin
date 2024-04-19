/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Title, Grid, Badge } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import UserStatCard from "@/components/stat-cards/user";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { observer } from "mobx-react-lite";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import { AccountType } from "@/lib/enums/account-type.enum";
import { useToast } from "@/hooks/use-toast";
import { useRootStore } from "@/mobx";
import {
  GetUserQuery,
  GetUsersQuery,
  QueryMode,
  SortOrder,
  useDeleteUserMutation,
  useGetUsersLazyQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import { SearchInput } from "@/components/search-input";
import MenubarCard from "@/components/menubar";
import MoreHorizontal from "@/components/Icons/more-horizontal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import MultiSelector from "@/components/multi-selector";
import { usersFilter } from "@/lib/filters";
import { generateProfilePath, getURLParams } from "@/lib/helpers";

const headerItems = [
  { name: "Name" },
  { name: "Username" },
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
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsactivating] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [deteteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const filteredParams = getURLParams(selectedOptions);

  const {
    data: users,
    loading: loading,
    refetch,
    fetchMore,
  } = useGetUsersQuery({
    variables: {
      where: {
        ...filteredParams,
        OR: [
          { username: { contains: debounced, mode: QueryMode.Insensitive } },
          { firstname: { contains: debounced, mode: QueryMode.Insensitive } },
          { surname: { contains: debounced, mode: QueryMode.Insensitive } },
          { email: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const handleSelectOption = (selectedList: any, selectedItem: any) => {
    setSelectedOptions((prev) => [...prev, selectedItem]);
  };

  const handleRemoveOption = (selectedList: any, removedItem: any) => {
    setSelectedOptions((prev) => [
      ...prev.filter((a) => a?.id !== removedItem?.id),
    ]);
  };

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
            id: user?.id,
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
            id: item?.id,
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
    const userPath = generateProfilePath(item as GetUserQuery["user"]);
    const userItems = [
      {
        name: "View Details",
        onClick: () => router.push(userPath),
      },
      {
        name: `${item?.isActive ? "Deactivate" : "Activate"} User`,
        onClick: async () => await handleActiveUser(item),
      },
      // {
      //   name: "Delete User",
      //   onclick: async () => await handleDeleteUser(item),
      // },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div
            className="flex flex-row items-center justify-start"
            onClick={() => router.push(userPath)}
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.firstname?.charAt(0)} ${item?.surname?.charAt(
                0
              )}`}
            />
            <div className="ml-2 cursor-pointer">
              {item?.firstname} {item?.surname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">@{item?.username}</TableCell>
        <TableCell className="text-center text-sm">
          {item.accountType?.role?.title}
        </TableCell>
        <TableCell className="text-center text-sm">{item?.email}</TableCell>
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
              items={userItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <Title>Users</Title>
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <UserStatCard />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        <MultiSelector
          options={usersFilter}
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
        title="User List"
        loading={loading}
        headerItems={headerItems}
        items={users?.users as any[]}
        renderItems={renderItems}
      />
      {loading || !users?.users?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};
export default observer(Users);
