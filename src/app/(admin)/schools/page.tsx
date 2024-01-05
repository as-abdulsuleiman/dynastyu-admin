/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import {
  GetSchoolsQuery,
  QueryMode,
  SchoolWhereInput,
  SortOrder,
  useGetSchoolsQuery,
} from "@/services/graphql";
import { useDebouncedValue } from "@mantine/hooks";
import {
  Divider,
  Title,
  Text,
  TabGroup,
  TabPanels,
  Grid,
  TabPanel,
  TextInput,
  TableRow,
  TableCell,
  Flex,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import SelectCard from "@/components/select";
import SchoolsCount from "@/components/counts/schools";
import UniversalTable from "@/components/universal-table";
import Pagination from "@/components/pagination";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const filterItems = [
  { name: "High School", value: "High School" },
  { name: "College", value: "College" },
];
const headerItems = [
  { name: "Name" },
  { name: "School Type" },
  { name: "Email" },
  { name: "Action" },
];

enum FilterEnum {
  HIGHSCHOOL = "High School",
  COLLEGE = "College",
}

interface SchoolsProps {}

const Schools: FC<SchoolsProps> = ({}) => {
  const router = useRouter();
  const [status, setStatus] = useState<string>("High School");
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsactivating] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);

  const {
    data: schools,
    loading,
    fetchMore,
    refetch,
  } = useGetSchoolsQuery({
    variables: {
      where: { schoolTypeId: { equals: 1 } },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      take: 10,
    },
    pollInterval: 30 * 1000,
  });

  const whereClause: SchoolWhereInput = useMemo(() => {
    if (status === FilterEnum.HIGHSCHOOL) {
      return {
        schoolTypeId: { equals: 1 },
      };
    } else if (status === FilterEnum.COLLEGE) {
      return {
        schoolTypeId: { equals: 2 },
      };
    } else {
      return {
        schoolTypeId: { equals: 1 },
      };
    }
  }, [status]);
  console.log("schools", schools?.schools);

  useEffect(() => {
    refetch({
      where: {
        ...whereClause,
        OR: [
          { name: { contains: debounced, mode: QueryMode.Insensitive } },
          { email: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
    });
  }, [status, whereClause, debounced, refetch]);

  const lastUserId = useMemo(() => {
    const lastPostInResults = schools?.schools[schools?.schools?.length - 1];
    return lastPostInResults?.id;
  }, [schools?.schools]);

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
        previousResult: GetSchoolsQuery,
        { fetchMoreResult }
      ): GetSchoolsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.schools?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.schools;
          const fetchMorePosts = fetchMoreResult?.schools;
          fetchMoreResult.schools = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: schools?.schools?.length,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSchoolsQuery,
        { fetchMoreResult }
      ): GetSchoolsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.schools?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.schools;
          const fetchMorePosts = fetchMoreResult?.schools;
          fetchMoreResult.schools = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const userItems = [
      {
        name: "View Details",
        onclick: () =>
          router.push(`/school/${Number(item?.id)}`, { scroll: true }),
      },
      {
        name: `Edit School`,
        // onclick: async () => await handleActiveUser(item),
      },
      {
        name: "Delete School",
        // onclick: async () => await handleDeleteUser(item),
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex alignItems="center" justifyContent="start">
            <UserAvatar
              className="h-[55px] w-[55px] shadow"
              fallbackType="name"
              avatar={item?.logo as string}
              fallback={`${item?.name?.charAt(0)}`}
            />
            <Text className="ml-2">{item?.name}</Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.schoolType?.name}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.email}</Text>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <Title>Schools</Title>
            <Icons.school className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          </div>
          <Text>Schools Overview</Text>
        </div>
        <div className="ml-auto justify-end">
          <Button>Add New School</Button>
          {/* <CreateCoach
            onCreateCoach={(values) => handleCreateCoach(values)}
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
          /> */}
        </div>
      </div>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <SchoolsCount whereClause={whereClause} title={status} />
            </Grid>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
              <TextInput
                className="h-[38px] bg-background dark:bg-dark-background"
                icon={() => {
                  return (
                    <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
                  );
                }}
                onValueChange={(e) => setValue(e)}
                placeholder="Search..."
              />
              <SelectCard
                className="bg-background dark:bg-dark-background"
                defaultValue={"High Schools"}
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
              items={schools?.schools as any[]}
              loading={loading}
              renderItems={renderItems}
            />
            {loading || !schools?.schools?.length ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default observer(Schools);
