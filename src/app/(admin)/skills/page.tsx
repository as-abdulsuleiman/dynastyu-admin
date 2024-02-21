/** @format */

"use client";

import { FC, useMemo } from "react";
import { Title, Text, Divider } from "@tremor/react";
import { Button } from "@/components/ui/button";
import {
  SkillsTypesQuery,
  SortOrder,
  useCreateSkillMutation,
  useGetSkillTypesQuery,
  useSkillsTypesQuery,
  useUpsertOneSkillMutation,
} from "@/services/graphql";
import Pagination from "@/components/pagination";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [createSkill] = useCreateSkillMutation();
  const [upsertOneSkill] = useUpsertOneSkillMutation();
  // const { data: skillsData } = useGetSkillTypesQuery();

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

  // console.log("skillTypesData", skillTypesData);

  return (
    <main className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <Title>Skills</Title>
          <Text>Skills Overview</Text>
        </div>
        <div className="ml-auto justify-end">
          <Button>Create Skill</Button>
          {/* <CreateCoach
            onCreateCoach={(values) => handleCreateCoach(values)}
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
          /> */}
        </div>
      </div>
      <Divider></Divider>

      {loading || !skillTypesData?.skillTypes.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};

export default Page;
