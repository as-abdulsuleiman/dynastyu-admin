/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/Icons";
import {
  GetSchoolsQuery,
  QueryMode,
  SortOrder,
  useDeleteSchoolMutation,
  useGetSchoolLazyQuery,
  useGetSchoolsQuery,
  useUpdateSchoolMutation,
} from "@/services/graphql";
import { useDebouncedValue } from "@mantine/hooks";
import { Title, Text, Grid, Flex, TextInput } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import SchoolStatCard from "@/components/stat-cards/school";
import UniversalTable from "@/components/universal-table";
import Pagination from "@/components/pagination";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { SearchInput } from "@/components/search-input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import MenubarCard from "@/components/menubar";
import MoreHorizontal from "@/components/Icons/more-horizontal";
import { formatDate } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import ContentHeader from "@/components/content-header";

const headerItems = [
  { name: "Name" },
  { name: "School Type" },
  { name: "Email" },
  { name: "Created At" },
  { name: "Action" },
];

interface SchoolsProps {}

const Schools: FC<SchoolsProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [deleteSchool] = useDeleteSchoolMutation();
  const [updateSchool] = useUpdateSchoolMutation();
  const [getSchool] = useGetSchoolLazyQuery();
  const [isDeletingSchool, setIsDeletingSchool] = useState(false);
  const [openDeleteSchoolPrompt, setOpenDeleteSchoolPrompt] = useState(false);
  const [activeSchool, setActiveSchool] = useState({});
  const {
    data: schools,
    loading,
    fetchMore,
    refetch,
  } = useGetSchoolsQuery({
    variables: {
      where: {
        schoolType: {
          is: {
            name: { equals: "College" },
          },
        },
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      take: 10,
    },
  });

  useEffect(() => {
    refetch({
      where: {
        schoolType: {
          is: {
            name: { equals: "College" },
          },
        },
        OR: [
          { name: { contains: debounced, mode: QueryMode.Insensitive } },
          { email: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
    });
  }, [debounced, refetch]);

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
  const handleDeleteSchoolPrompt = (item: any) => {
    setActiveSchool(item);
    setOpenDeleteSchoolPrompt(true);
  };

  const handleConfirmPrompt = async (school: any) => {
    try {
      setIsDeletingSchool(true);
      const { data: schoolData } = await getSchool({
        variables: {
          where: {
            id: school?.id,
          },
        },
      });

      const athletesInterestedId = schoolData?.school?.athletesInterested?.map(
        (val: any) => ({
          athleteId_schoolId: {
            athleteId: val?.athleteId,
            schoolId: school?.id,
          },
        })
      );

      const athletesRecruitedId = schoolData?.school?.athletesRecruited?.map(
        (val: any) => ({
          athleteId_schoolId: {
            athleteId: val?.athleteId,
            schoolId: school?.id,
          },
        })
      );
      const athletesProspectedId = schoolData?.school?.athletesProspected?.map(
        (val: any) => ({
          athleteId_schoolId: {
            athleteId: val?.athleteId,
            schoolId: school?.id,
          },
        })
      );
      const schoolPostId = schoolData?.school?.posts?.map((val: any) => ({
        id: {
          in: val?.id,
        },
      }));

      const athletesId = school?.athletes?.map((val: any) => ({
        userId: val?.userId,
      }));

      const coachesId = school?.coaches?.map((val: any) => ({
        userId: val?.userId,
      }));

      await updateSchool({
        variables: {
          where: {
            id: school?.id,
          },
          data: {
            athletesProspected: {
              disconnect: athletesProspectedId || [],
            },
            athletesRecruited: {
              disconnect: athletesRecruitedId || [],
            },
            athletesInterested: {
              disconnect: athletesInterestedId || [],
            },
            posts: {
              deleteMany: schoolPostId || [],
            },
            athletes: {
              disconnect: athletesId || [],
            },
            coaches: {
              disconnect: coachesId || [],
            },
          },
        },
      });
      await deleteSchool({
        variables: {
          where: {
            id: schoolData?.school?.id,
          },
        },
      });
      refetch();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setActiveSchool({});
      setIsDeletingSchool(false);
      setOpenDeleteSchoolPrompt(false);
    }
  };

  const handleEditSchool = (item: any) => {
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
      {
        name: "Delete School",
        onClick: () => handleDeleteSchoolPrompt(item),
      },
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
            <div className="ml-4 cursor-pointer text-base">
              <div className="text-base">{item?.name}</div>
              <div className="text-sm text-primary">
                {item?.city ? `${item?.city},` : ""} {item?.state}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.schoolType?.name}</div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>{item?.email}</div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.createdAt
              ? formatDate(new Date(item?.createdAt), "MMMM dd yyyy")
              : ""}
          </div>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <ContentHeader
              title="Schools"
              icon={
                <Icons.school className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              }
              subHeader="College Overview"
            />
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <SchoolStatCard
          path="/schools/college"
          whereClause={{
            schoolType: {
              is: {
                name: { equals: "College" },
              },
            },
          }}
          title="College"
        />
      </Grid>

      <div className="flex mt-6 gap-6 w-full justify-end">
        <div className="w-full md:w-1/2 order-2">
          <SearchInput
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
      </div>

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
      <PromptAlert
        loading={isDeletingSchool}
        content={`This action cannot be undone. This will permanently delete this data from our servers.`}
        showPrompt={openDeleteSchoolPrompt}
        handleHidePrompt={() => {
          setActiveSchool({});
          setOpenDeleteSchoolPrompt(false);
        }}
        handleConfirmPrompt={() => handleConfirmPrompt(activeSchool)}
      />
    </main>
  );
};

export default observer(Schools);
