/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import {
  GetSchoolsQuery,
  QueryMode,
  SchoolWhereInput,
  SortOrder,
  useDeleteSchoolMutation,
  useGetSchoolsQuery,
} from "@/services/graphql";
import { useDebouncedValue } from "@mantine/hooks";
import { Title, Text, Grid, Flex, TextInput } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import SelectCard from "@/components/select";
import SchoolStatCard from "@/components/stat-cards/school";
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
import CreateSchool from "@/components/create-school";
import { SearchInput } from "@/components/search-input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import MenubarCard from "@/components/menubar";
import MoreHorizontal from "@/components/Icons/more-horizontal";

const filterItems = [
  { name: "College", value: "College" },
  { name: "High School", value: "High School" },
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
  const { toast } = useToast();
  const router = useRouter();
  const [status, setStatus] = useState<string>("College");
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActivating, setIsactivating] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [deleteSchool] = useDeleteSchoolMutation();
  const {
    data: schools,
    loading,
    fetchMore,
    refetch,
  } = useGetSchoolsQuery({
    variables: {
      where: { schoolTypeId: { equals: 2 } },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      take: 10,
    },
    // pollInterval: 30 * 1000,
  });

  const whereClause: SchoolWhereInput = useMemo(() => {
    if (status === FilterEnum.COLLEGE) {
      return {
        schoolTypeId: { equals: 2 },
      };
    } else {
      return {
        schoolTypeId: { equals: 2 },
      };
    }
  }, [status]);

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

  const handleDeleteSchool = async (school: any) => {
    try {
      const response = await deleteSchool({
        variables: {
          where: {
            id: Number(school?.id),
          },
        },
      });
      if (response.data?.deleteOneSchool) {
        // await refetch();
        toast({
          title: "School successfully deleted.",
          description: `${school?.name} has been deleted.`,
          variant: "default",
        });
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

  const handleEditSchool = (item: any) => {
    // if (item?.schoolType?.name === "College") {
    //   router.push(`/schools/edit?school=${item?.id}`);
    // }
    router.push(`/schools/edit?school=${item?.id}`);
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const userItems = [
      {
        name: "View Details",
        onClick: () =>
          router.push(`/school/${Number(item?.id)}`, { scroll: true }),
      },
      {
        name: `Edit School`,
        onClick: () => handleEditSchool(item),
      },
      // {
      //   name: "Delete School",
      //   onclick: async () => await handleDeleteSchool(item),
      // },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div
            className="flex flex-row items-center justify-start"
            onClick={() => router.push(`/school/${item?.id}`, { scroll: true })}
          >
            <UserAvatar
              height={150}
              width={150}
              className="h-[79px] w-[79px] shadow cursor-pointer "
              fallbackType="name"
              avatar={item?.logo as string}
              fallback={`${item?.name?.charAt(0)}`}
            />
            <div className="ml-4 cursor-pointer text-base">{item?.name}</div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.schoolType?.name}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.email}</div>
        </TableCell>
        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={<MoreHorizontal className="cursor-pointer" />}
              items={userItems}
            />
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
        {/* <div className="ml-auto justify-end">
          <Button onClick={() => router.push("/schools/new")}>
            Add New School
          </Button>
        </div> */}
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <SchoolStatCard whereClause={whereClause} title={"College"} />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        {/* <SelectCard
          className="bg-background dark:bg-dark-background"
          defaultValue="College"
          items={filterItems}
          selectedItem={status}
          onValueChange={(e) => {
            setStatus(e);
          }}
        /> */}
      </Grid>
      <UniversalTable
        title="School List"
        headerItems={headerItems}
        items={schools?.schools as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !schools?.schools?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};

export default observer(Schools);
