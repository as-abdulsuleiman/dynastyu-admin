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
  BadgeDelta,
  TabList,
  Tab,
  AreaChart,
  Card,
  Metric,
  DeltaType,
  ProgressBar,
  Icon,
  TextInput,
} from "@tremor/react";
import { SearchIcon } from "@heroicons/react/solid";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  User,
  UserWhereInput,
  useGetUsersQuery,
} from "@/services/graphql";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { Loader2 } from "lucide-react";
import SelectCard from "@/components/select";
import UsersCount from "@/components/counts/users";
import Pagination from "@/components/pagination";
import UsersAnalytics from "@/components/analytics/users";
import UniversalTable from "@/components/universal-table";

interface UsersProps {}

type Kpi = {
  title: string;
  metric: string | number;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
  path: string;
  loading: boolean;
};

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
        headerItems={[
          { name: "Name" },
          { name: "Role" },
          { name: "Email" },
          { name: "Status" },
        ]}
        users={users}
        loading={loading}
      />
      <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
    </main>
  );
};

export default Users;

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
