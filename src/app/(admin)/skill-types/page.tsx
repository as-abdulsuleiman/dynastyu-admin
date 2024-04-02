/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Title, Text, Grid, Flex, TextInput } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  GetSkillTypesQuery,
  SkillTypeWhereInput,
  SortOrder,
  useDeleteManySkillHistoryMutation,
  useDeleteManySkillVerificationRequestMutation,
  useDeleteManySkillsMutation,
  useDeleteSkillTypeMutation,
  useGetSkillTypesQuery,
} from "@/services/graphql";
import SkillTypeStatCard from "@/components/stat-cards/skillType";
import SelectCard from "@/components/select";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MenubarCard from "@/components/menubar";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import PromptAlert from "@/components/prompt-alert";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";

const headerItems = [
  { name: "Name" },
  { name: "Second Field Name" },
  { name: "Unit" },
  { name: "Number Of Videos" },
  { name: "Action" },
];

const filterItems = [
  { name: "Secs", value: "secs" },
  { name: "Reps", value: "reps" },
  { name: "Lbs", value: "lbs" },
];

enum FilterEnum {
  SECS = "secs",
}
interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [deleteSkillTypePrompt, setDeleteSkillTypePrompt] = useState(false);
  const [deletingSkillType, setDeletingSkillType] = useState(false);

  const [activeSkillType, setActiveSkillType] = useState({});
  const [debounced] = useDebouncedValue(value, 300);
  const [deleteSkillType] = useDeleteSkillTypeMutation();
  const [deleteSkills] = useDeleteManySkillsMutation();
  const [deleteManySkillHistory] = useDeleteManySkillHistoryMutation();
  const [deleteManySkillVerificationRequest] =
    useDeleteManySkillVerificationRequestMutation();

  const {
    data: skillTypesData,
    loading: loading,
    fetchMore,
    refetch,
  } = useGetSkillTypesQuery({
    variables: {
      where: {},
      take: 10,
      orderBy: { createdAt: SortOrder.Desc },
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
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSkillTypesQuery,
        { fetchMoreResult }
      ): GetSkillTypesQuery => {
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
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSkillTypesQuery,
        { fetchMoreResult }
      ): GetSkillTypesQuery => {
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

  const handleDeleteSkillType = async (item: any) => {
    setDeleteSkillTypePrompt(true);
    setActiveSkillType(item);
  };

  const handleConfirmPrompt = async (item: any) => {
    setDeletingSkillType(true);
    const skillId = await item?.skills?.map((a: any) => a?.id);
    const skillVerificationRequests = item?.skills
      .flatMap((skill: any) => skill?.skillVerificationRequests)
      .map((y: any) => y?.skillId);
    const skillHistories = item?.skills
      .flatMap((skill: any) => skill?.skillHistory)
      .map((a: any) => a?.skillId);

    try {
      await deleteManySkillVerificationRequest({
        variables: {
          where: {
            skillId: { in: skillVerificationRequests },
          },
        },
      });
      await deleteManySkillHistory({
        variables: {
          where: {
            skillId: { in: skillHistories },
          },
        },
      });
      await deleteSkills({
        variables: {
          where: {
            id: { in: skillId },
          },
        },
      });
      await deleteSkillType({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      refetch();
      toast({
        title: "Skill type successfully deleted.",
        description: `${item?.name} has been deleted`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setActiveSkillType({});
      setDeletingSkillType(false);
      setDeleteSkillTypePrompt(false);
    }
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const skillTypeItems = [
      {
        name: "Edit Skill Type",
        onClick: () => {
          router.push(`/skill-types/edit?skillType=${item?.id}`, {
            scroll: true,
          });
        },
      },
      {
        name: "Delete Skill Type",
        onClick: () => handleDeleteSkillType(item),
      },
    ];
    return (
      <TableRow key={item?.id} className="text-base">
        <TableCell>
          <div
            className="flex flex-row items-center justify- cursor-pointer text-base"
            onClick={() =>
              router.push(`/skill-types/edit?skillType=${item?.id}`, {
                scroll: true,
              })
            }
          >
            {item?.name}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div className="flex flex-row items-center justify-center">
            {item?.secondFieldName}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">{item?.unit}</TableCell>
        <TableCell className="text-center text-sm">
          {item?.numberOfVideos}
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <Icons.moreHorizontal className="cursor-pointer" />
                </Button>
              }
              items={skillTypeItems}
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
          <Title>Skill Types</Title>
          <Text className="hidden">Skill Types Overview</Text>
        </div>
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <SkillTypeStatCard title="Skill Types" />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        <SelectCard
          disabled
          className=""
          defaultValue="College"
          items={filterItems}
          selectedItem={status}
          enableClear={true}
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
      {loading || !skillTypesData?.skillTypes?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
      <PromptAlert
        loading={deletingSkillType}
        content={`This action cannot be undone. This will permanently delete this data from our servers.`}
        showPrompt={deleteSkillTypePrompt}
        handleHidePrompt={() => {
          setActiveSkillType({});
          setDeleteSkillTypePrompt(false);
        }}
        handleConfirmPrompt={() => handleConfirmPrompt(activeSkillType)}
      />
    </main>
  );
};

export default Page;
