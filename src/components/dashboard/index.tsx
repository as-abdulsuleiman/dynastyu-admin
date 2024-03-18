/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Divider,
  Grid,
  Text,
  Title,
  TableRow,
  TableCell,
  Flex,
  Badge,
  TextInput,
} from "@tremor/react";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
import FanCount from "@/components/counts/fans";
import UsersCount from "@/components/counts/users";
import CoachesCount from "@/components/counts/coaches";
import { useDebouncedValue } from "@mantine/hooks";
import SelectCard from "@/components/select";
import Pagination from "@/components/pagination";
import AthletesCount from "@/components/counts/athletes";
import UniversalTable from "@/components/universal-table";
import UserAvatar from "@/components/user-avatar";
import { AccountType } from "@/lib/enums/account-type.enum";
import { useToast } from "@/hooks/use-toast";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/mobx";
import { Icons } from "@/components/Icons";
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
import MenubarCard from "@/components/menubar";

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Athlete", value: "Athlete" },
  { name: "Fan", value: "Fan" },
  { name: "Coach", value: "Coach" },
];
const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Role" },
  { name: "Email" },
  { name: "Status" },
  { name: "Actions" },
];
enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ATHLETE = "Athlete",
  FAN = "Fan",
  COACH = "Coach",
}

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const { toast } = useToast();
  const {
    userStore: { setUsers },
  } = useRootStore();
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsactivating] = useState<boolean>(false);
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
    // pollInterval: 30 * 1000,
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
          { username: { contains: debounced, mode: QueryMode.Insensitive } },
          { firstname: { contains: debounced, mode: QueryMode.Insensitive } },
          { surname: { contains: debounced, mode: QueryMode.Insensitive } },
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
        onClick: () =>
          router.push(`/${userType}/${Number(userId)}`, { scroll: true }),
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
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() =>
              router.push(`/${userType}/${Number(userId)}`, { scroll: true })
            }
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.firstname?.charAt(0)} ${item?.surname?.charAt(
                0
              )}`}
            />
            <div className="ml-4 cursor-pointer">
              {item?.firstname} {item?.surname}
            </div>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <div>{item?.username ? `@${item?.username}` : ""}</div>
        </TableCell>
        <TableCell className="text-center">
          <div>{item?.accountType?.role?.title}</div>
        </TableCell>
        <TableCell className="text-center">
          <div>{item?.email}</div>
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
            <MenubarCard
              trigger={<Icons.moreHorizontal className="cursor-pointer" />}
              items={userItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <Title>Dashboard Overview</Title>
      <Text>Welcome to DynastyU Admin</Text>
      <Divider></Divider>

      <Grid numItemsMd={2} numItemsLg={2} numItemsSm={2} className="mt-6 gap-6">
        <UsersCount />
        <AthletesCount />
        <CoachesCount />
        <FanCount />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <TextInput
          className="h-[38px]"
          icon={() => {
            return <Icons.search className="h-10 shrink-0 w-5 ml-2.5" />;
          }}
          onValueChange={(e) => setValue(e)}
          placeholder="Type to search..."
        />
        {/* <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        /> */}
        <SelectCard
          className="bg-background dark:bg-dark-background dark:bg-dark-tremor-background"
          items={filterItems}
          selectedItem={status}
          onValueChange={(e) => {
            setStatus(e);
          }}
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
