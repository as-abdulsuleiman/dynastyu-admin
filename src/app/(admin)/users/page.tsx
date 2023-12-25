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
import { StatusOnlineIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  UserWhereInput,
  useGetUsersQuery,
} from "@/services/graphql";
import SelectCard from "@/components/select";
import UsersCount from "@/components/counts/users";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { observer } from "mobx-react-lite";

interface UsersProps {}

const Users: FC<UsersProps> = ({}) => {
  const router = useRouter();
  const [status, setStatus] = useState("Active");
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
      where: {
        isActive: {
          equals: true,
        },
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const whereClause: UserWhereInput = useMemo(() => {
    if (status !== "Active") {
      return {
        isActive: {
          equals: false,
        },
      };
    } else {
      return {
        isActive: {
          equals: true,
        },
      };
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
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex
            alignItems="center"
            justifyContent="start"
            // onClick={() => router.push(`/user/${item?.id}`)}
          >
            <Avatar>
              <AvatarImage
                src={item?.avatar || ""}
                alt={`${item?.username || item?.firstname}`}
              />
              <AvatarFallback>
                {item?.firstname?.charAt(0)}
                {item?.surname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
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
      <Title>Users</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
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
              <SelectCard
                className="max-w-3xl w-full ml-auto h-14 mt-4 self-center"
                items={[
                  { name: "Active", value: "Active" },
                  { name: "Inactive", value: "Inactive" },
                ]}
                selectedItem={status}
                onValueChange={(e) => {
                  setStatus(e);
                }}
              />
              <TextInput
                icon={SearchIcon}
                onValueChange={(e) => setValue(e)}
                placeholder="Search..."
              />

              {/* <UsersAnalytics /> */}
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <UniversalTable
        title="Users List"
        loading={loading}
        headerItems={[
          { name: "Name" },
          { name: "Role" },
          { name: "Email" },
          { name: "Status" },
        ]}
        items={users?.users as any[]}
        renderItems={renderItems}
      />
      <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
    </main>
  );
};
export default observer(Users);

// <Card>
//               {loading ? (
//                 <div className="flex items-center justify-center h-full w-full mx-auto my-auto">
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   <span>Loading...</span>
//                 </div>
//               ) : (
//                 <>
//                   <Flex alignItems="start">
//                     <div className="truncate">
//                       <Text>${value} Users</Text>
//                       <Metric className="truncate mt-1">
//                         {users?.users?.length}
//                       </Metric>
//                     </div>
//                     {/* <Icon
//                     icon={item.icon}
//                     variant="simple"
//                     tooltip="Shows sales performance per employee"
//                   /> */}
//                   <BadgeDelta deltaType="moderateIncrease">
//                   {"13.2%"}
//                 </BadgeDelta>
//               </Flex>
//               <Flex className="mt-4 space-x-2">
//                 {/* <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text> */}
//                 {/* <Text className="truncate">{item.target}</Text> */}
//               </Flex>
//               <ProgressBar value={15.9} className="mt-2" />
//             </>
//           )}
//         </Card>
