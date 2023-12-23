/** @format */

"use client";

import { useRouter } from "next/navigation";
import {
  Divider,
  Grid,
  TabGroup,
  TabPanel,
  TabPanels,
  Text,
  Title,
  TextInput,
  TableRow,
  TableCell,
  Flex,
  Badge,
} from "@tremor/react";
import { useEffect, useMemo, useState } from "react";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  UserWhereInput,
  useGetUsersQuery,
} from "@/services/graphql";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import FanCount from "@/components/counts/fans";
import UsersCount from "@/components/counts/users";
import CoachesCount from "@/components/counts/coaches";
import { useDebouncedValue } from "@mantine/hooks";
import SelectCard from "@/components/select";
import Pagination from "@/components/pagination";
import AthletesCount from "@/components/counts/athletes";
import UniversalTable from "@/components/universal-table";
import UserAvatar from "@/components/user-avatar";

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
];
enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ATHLETE = "Athlete",
  FAN = "Fan",
  COACH = "Coach",
}

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);

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

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    console.log("item", item);
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex alignItems="center" justifyContent="start">
            <UserAvatar
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
          <Badge
            size="xs"
            className="cursor-pointer"
            color={item?.isActive ? "emerald" : "rose"}
            // tooltip="decrease"
            icon={StatusOnlineIcon}
            datatype="moderateDecrease"
          >
            {item?.isActive ? "Active" : "Inactive"}
          </Badge>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <Title>Dashboard Overview</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <UsersCount />
              <AthletesCount />
              <CoachesCount />
              <FanCount />
            </Grid>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
              <TextInput
                className="h-[38px]"
                icon={SearchIcon}
                onValueChange={(e) => setValue(e)}
                placeholder="Search..."
              />
              <SelectCard
                className=""
                items={filterItems}
                selectedItem={status}
                onValueChange={(e) => {
                  setStatus(e);
                }}
              />
            </Grid>
            <UniversalTable
              title="Users List"
              headerItems={headerItems}
              items={users?.users as any[]}
              loading={loading}
              renderItems={renderItems}
            />
            {loading || !users?.users.length ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
