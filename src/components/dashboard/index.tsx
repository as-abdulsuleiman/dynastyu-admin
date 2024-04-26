/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Grid, Text, Title } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
import FanStatCard from "@/components/stat-cards/fan";
import UserStatCard from "@/components/stat-cards/user";
import CoacheStatCard from "@/components/stat-cards/coache";
import { useDebouncedValue } from "@mantine/hooks";
import Pagination from "@/components/pagination";
import AthleteStatCard from "@/components/stat-cards/athlete";
import UniversalTable from "@/components/universal-table";
import UserAvatar from "@/components/user-avatar";
import { useToast } from "@/hooks/use-toast";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/mobx";
import { Loader2Icon, MoreHorizontalIcon } from "@/components/Icons";
import {
  GetUserQuery,
  GetUsersQuery,
  QueryMode,
  SortOrder,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetUsersLazyQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import MenubarCard from "@/components/menubar";
import { Separator } from "../ui/separator";
import { SearchInput } from "../search-input";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import MultiSelector from "../multi-selector";
import { usersFilter } from "@/lib/filters";
import { generateProfilePath, getURLParams } from "@/lib/helpers";

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Role" },
  { name: "Email" },
  { name: "Status" },
  { name: "Created At" },
  { name: "Actions" },
];

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const { toast } = useToast();
  const {
    userStore: { setUsers },
  } = useRootStore();
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsactivating] = useState<boolean>(false);
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
        setUsers(response?.data?.users as any);
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
        name: `${item?.isActive ? "Deactivate" : "Activate"} Profile`,
        onClick: async () => await handleActiveUser(item),
      },
      // {
      //   name: "Delete Profile",
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
            <div className="ml-4 cursor-pointer text-base">
              {item?.firstname} {item?.surname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.username ? `@${item?.username?.toLowerCase()}` : ""}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.accountType?.role?.title}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.email?.toLowerCase()}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.id === selectedUser && isActivating ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
              {item?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <BadgeCard
              size="xs"
              className="cursor-pointer text-sm"
              color={item?.isActive ? "teal" : "rose"}
              icon={item?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.isActive ? "Active" : "Deactivated"}
            </BadgeCard>
          )}
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.createdAt), "MMMM dd yyyy")}
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
              items={userItems}
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
          title="Dashboard Overview"
          subHeader="Welcome to DynastyU Admin"
        />
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={2} numItemsSm={2} className="mt-6 gap-6">
        <UserStatCard />
        <AthleteStatCard />
        <CoacheStatCard />
        <FanStatCard />
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
        headerItems={headerItems}
        items={users?.users as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !users?.users?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};

export default observer(Dashboard);
