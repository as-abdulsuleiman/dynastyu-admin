/** @format */

"use client";

import { useRootStore } from "@/mobx";
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
} from "@tremor/react";
import { useEffect, useMemo, useState } from "react";
import {
  GetUsersQuery,
  QueryMode,
  SortOrder,
  UserWhereInput,
  useGetUsersQuery,
} from "@/services/graphql";
import { SearchIcon } from "@heroicons/react/solid";
import FanCount from "@/components/counts/fans";
import UsersCount from "@/components/counts/users";
import CoachesCount from "@/components/counts/coaches";
import AtheletesCount from "@/components/counts/atheletes";
import { useDebouncedValue } from "@mantine/hooks";
import SelectCard from "@/components/select";
import UsersTable from "@/components/users-table";
import Pagination from "@/components/pagination";

export default function Home() {
  const {
    authStore: { user },
  } = useRootStore();
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
    console.log("clicked");
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
      <Title>Dashboard Overview</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <UsersCount />
              <AtheletesCount />
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
                items={[
                  { name: "Active", value: "Active" },
                  { name: "Inactive", value: "Inactive" },
                ]}
                selectedItem={status}
                onValueChange={(e) => {
                  setStatus(e);
                }}
              />
            </Grid>
            <UsersTable
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
            {loading ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}

// <Grid numItemsMd={2} numItemsLg={4} className="mt-6 gap-6">
//               {kpiData?.map((item) => (
//                 <Card key={item.title}>
//                   {item.loading ? (
//                     <div className="flex items-center justify-center h-full w-full mx-auto my-auto">
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       <span>Loading...</span>
//                     </div>
//                   ) : (
//                     <>
//                       <Flex alignItems="start">
//                         <div className="truncate">
//                           <Text>{item.title}</Text>
//                           <Metric className="truncate mt-1">
//                             {item.metric}
//                           </Metric>
//                         </div>
//                         {/* <Icon
//                       icon={item.icon}
//                       variant="simple"
//                       tooltip="Shows sales performance per employee"
//                     /> */}
//                         <BadgeDelta
//                           className="cursor-pointer"
//                           onClick={() => router.push(item.path)}
//                           deltaType={item.deltaType}
//                         >
//                           View
//                         </BadgeDelta>
//                       </Flex>
//                       <Flex className="mt-4 space-x-2">
//                         {/* <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text> */}
//                         {/* <Text className="truncate">{item.target}</Text> */}
//                       </Flex>
//                       <ProgressBar value={item.progress} className="mt-2" />
//                     </>
//                   )}
//                 </Card>
//               ))}
//             </Grid>
