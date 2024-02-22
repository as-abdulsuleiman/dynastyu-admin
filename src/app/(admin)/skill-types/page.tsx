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
  Grid,
  TextInput,
  TableRow,
  TableCell,
  Flex,
  Badge,
} from "@tremor/react";
import { Button } from "@/components/ui/button";
import {
  QueryMode,
  SkillTypeWhereInput,
  SkillsTypesQuery,
  SortOrder,
  useCreateSkillMutation,
  useSkillsTypesQuery,
  useUpsertOneSkillMutation,
} from "@/services/graphql";
import SkillTypesCount from "@/components/counts/skillTypes";
import SelectCard from "@/components/select";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SearchInput } from "@/components/search-input";

const headerItems = [
  { name: "Name" },
  { name: "Position" },
  { name: "Unit" },
  { name: "Number Of Videos" },
  { name: "Second Field Name" },
  { name: "Action" },
];

const filterItems = [{ name: "Unit", value: "secs" }];

enum FilterEnum {
  SECS = "secs",
}
interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useRouter();

  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsActivating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);
  const [createSkill] = useCreateSkillMutation();
  const [upsertOneSkill] = useUpsertOneSkillMutation();

  const {
    data: skillTypesData,
    loading: loading,
    fetchMore,
    refetch,
  } = useSkillsTypesQuery({
    variables: {
      // where: { athleteId: { equals: user?.athleteProfile?.id } },
      orderBy: { position: SortOrder.Asc },
    },
  });

  const whereClause: SkillTypeWhereInput = useMemo(() => {
    if (status === FilterEnum.SECS) {
      return {
        unit: { equals: FilterEnum.SECS },
      };
    } else {
      return {};
    }
  }, [status]);

  useEffect(() => {
    refetch({
      where: {
        ...whereClause,
        OR: [{}],
      },
    });
  }, [status, whereClause, debounced, refetch]);

  const lastSkillTypeId = useMemo(() => {
    const lastPostInResults =
      skillTypesData?.skillTypes[skillTypesData?.skillTypes?.length - 1];
    return lastPostInResults?.id;
  }, [skillTypesData?.skillTypes]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastSkillTypeId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: SkillsTypesQuery,
        { fetchMoreResult }
      ): SkillsTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.skillTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.skillTypes;
          fetchMoreResult.skillTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: skillTypesData?.skillTypes?.length,
        cursor: {
          id: lastSkillTypeId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: SkillsTypesQuery,
        { fetchMoreResult }
      ): SkillsTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.skillTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.skillTypes;
          const fetchMorePosts = fetchMoreResult?.skillTypes;
          fetchMoreResult.skillTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const skillTypeItems = [
      {
        name: "View Details",
        onclick: () => {
          // router.push(`/athlete/${Number(item?.id)}`, { scroll: true });
        },
      },
      {
        name: "Edit Skill Type",
        onclick: () => {
          // router.push(`/athletes/edit?athlete=${Number(item?.id)}`, {
          //   scroll: true,
          // });
        },
      },
      // {
      //   name: `${item.verified ? "Unverify" : "Verify"} Profile`,
      //   // onclick: () => handleVerifyAthlete(item),
      // },
      // {
      //   name: `${item?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
      //   // onclick: () => handleActivateAthlete(item),
      // },
      // {
      //   name: "Delete Profile",
      //   onclick: async () => await handleDeleteAthlete(item),
      // },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex
            alignItems="center"
            justifyContent="start"
            // onClick={() =>
            //   router.push(`/athlete/${item?.id}`, { scroll: true })
            // }
          >
            <Text className="ml-2 cursor-pointer">{item?.name}</Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.position}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.unit}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.numberOfVideos}</Text>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex flex-row items-center justify-center">
            <Text>{item?.secondFieldName}</Text>{" "}
          </div>
        </TableCell>

        <TableCell className="text-center cursor-pointer">
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
                  {skillTypeItems?.map((val, id) => {
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
          <Title>Skill Types</Title>
          <Text className="hidden">Skill Types Overview</Text>
        </div>
        <div className="ml-auto justify-end">
          <Button>Create Skill Type</Button>
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
              <SkillTypesCount title="Skill Types" />
            </Grid>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6 hidden">
              <SearchInput
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search..."
              />
              {/* <TextInput
                className="h-[38px] bg-background dark:bg-dark-background"
                icon={() => {
                  return (
                    <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
                  );
                }}
                onValueChange={(e) => setValue(e)}
                placeholder="Search..."
              /> */}
              <SelectCard
                className="bg-background dark:bg-dark-background"
                defaultValue="College"
                items={filterItems}
                selectedItem={status}
                onValueChange={(e) => {
                  setStatus(e);
                }}
              />
            </Grid>
            <UniversalTable
              title="Skill Type List"
              headerItems={headerItems}
              items={skillTypesData?.skillTypes as any[]}
              loading={loading}
              renderItems={renderItems}
            />
            {loading || !skillTypesData?.skillTypes.length ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default Page;
