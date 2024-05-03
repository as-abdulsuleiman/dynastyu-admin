/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { CheckIcon, MoreHorizontalIcon, SchoolIcon } from "@/components/Icons";
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
import { Title, Text, Grid } from "@tremor/react";
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
import { cn, formatDate } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import ContentHeader from "@/components/content-header";
import { CommandItem } from "@/components/ui/command";
import ComboBoxCard from "@/components/combobox-card";

const headerItems = [
  { name: "Name" },
  { name: "School Type" },
  { name: "Email" },
  { name: "Created At" },
  { name: "Updated At" },
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
  const [activeSchool, setActiveSchool] = useState<any>({});
  const [openSchool, setOpenSchool] = useState<boolean>(false);
  const [selectedSchool, setSelectedSchool] = useState<any | number>({});
  const [searchValue, setSearchValue] = useState<string>("");

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
            name: { equals: "High School" },
          },
        },
        OR: [
          { name: { contains: debounced, mode: QueryMode.Insensitive } },
          { email: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      take: 10,
    },
  });

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

      const athletesId = school?.athletes?.map((val: any) => ({
        userId: val?.userId,
      }));

      const coachesId = school?.coaches?.map((val: any) => ({
        userId: val?.userId,
      }));

      const res = await updateSchool({
        variables: {
          where: {
            id: selectedSchool?.id,
          },
          data: {
            athletes: {
              connect: athletesId || [],
            },
            coaches: {
              connect: coachesId || [],
            },
          },
        },
      });

      if (res?.data?.updateOneSchool) {
        const response = await deleteSchool({
          variables: {
            where: {
              id: school?.id,
            },
          },
        });

        if (response?.data?.deleteOneSchool) {
          toast({
            title: "School successfully Deleted.",
            description: `${school?.name} has been successfully deleted`,
            variant: "successfull",
          });
        }
        refetch();
      }
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
      setSelectedSchool({});
      setIsDeletingSchool(false);
      setOpenDeleteSchoolPrompt(false);
    }
  };

  const handleEditSchool = (item: any) => {
    router.push(`/schools/edit?school=${item?.id}`);
  };

  const schoolsDataOptions = useMemo(() => {
    return (
      schools?.schools.map((school: any) => {
        let schoolLoaction;
        if (school) {
          if (school?.city) {
            schoolLoaction = school?.city;
          }
          if (school?.state) {
            schoolLoaction = `${schoolLoaction}, ${school?.state}`;
          }
        }
        return {
          label: `${school?.name}${schoolLoaction ? "," : ""} ${
            schoolLoaction || ""
          }`,
          value: school?.name,
          id: school?.id,
          logo: school?.logo,
          city: school?.city,
          state: school?.state,
        };
      }) || []
    );
  }, [schools?.schools]);

  const filteredSchoolsData = schoolsDataOptions.filter(
    (m) => m?.id !== activeSchool?.id
  );

  const CustomSchoolItems = ({ item, id }: { item: any; id: number }) => {
    let schoolLoaction;
    if (item) {
      if (item?.city) {
        schoolLoaction = item?.city;
      }
      if (item?.state) {
        schoolLoaction = `${schoolLoaction}, ${item?.state}`;
      }
    }
    return (
      <CommandItem
        className="capitalize cursor-pointer"
        key={item?.id || id}
        value={selectedSchool}
        onSelect={() => {
          setSelectedSchool({ value: item?.value, id: item?.id });
          setOpenSchool(false);
        }}
      >
        <div className="flex items-center">
          <UserAvatar
            fallbackClassName="h-[55px] w-[55px]"
            className="h-[55px] w-[55px] shadow mr-4 "
            fallbackType="name"
            avatar={item?.avatar as string}
            fallback={`${item?.label?.charAt(0)} `}
          />
          <div>
            <div className="text-sm mb-0.5">{item?.label}</div>
            <div className="text-sm text-primary">{schoolLoaction || ""}</div>
          </div>
        </div>
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            selectedSchool?.id === item?.id ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    );
  };

  const renderSelectSchool = () => {
    return (
      <div>
        <div className="mb-6 w-full ml-auto flex flex-col">
          <ComboBoxCard
            valueKey="value"
            displayKey="label"
            IdKey="value"
            label="Select School to Migrate data to"
            id="school-add"
            placeholder={"Select School"}
            isOpen={openSchool}
            scrollAreaClass="h-72"
            hasSearch
            shouldFilter={false}
            searchValue={searchValue}
            handleSearch={(search) => setSearchValue(search)}
            loading={loading}
            onClose={() => setOpenSchool(!openSchool)}
            items={filteredSchoolsData as any}
            selectedValue={selectedSchool}
            customRenderItems={CustomSchoolItems}
          />
        </div>
      </div>
    );
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const userItems = [
      {
        name: "View Details",
        onClick: () => router.push(`/school/${item?.id}`, { scroll: true }),
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
          <div>{item?.email?.toLowerCase()}</div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.createdAt
              ? formatDate(new Date(item?.createdAt), "MMMM dd yyyy")
              : ""}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.createdAt
              ? formatDate(new Date(item?.updatedAt), "MMMM dd yyyy")
              : ""}
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <ContentHeader
              title="Schools"
              icon={
                <SchoolIcon className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              }
              subHeader="High School Overview"
            />
          </div>
        </div>
        {/* <div className="ml-auto justify-end">
          <Button onClick={() => router.push("/schools/new")}>
            Add New School
          </Button>
        </div> */}
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <SchoolStatCard
          path="/schools/high-school"
          whereClause={{
            schoolType: {
              is: {
                name: { equals: "High School" },
              },
            },
          }}
          title="High School"
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
          setSelectedSchool({});
        }}
        customElement={renderSelectSchool()}
        handleConfirmPrompt={() => handleConfirmPrompt(activeSchool)}
      />
    </main>
  );
};

export default observer(Schools);
