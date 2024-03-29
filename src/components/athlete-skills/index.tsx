/** @format */

"use client";

import { SortOrder, useGetSkillTypesQuery } from "@/services/graphql";
import { FC } from "react";

interface AthleteSkillProps {
  AthleteId: number;
}

const AthleteSkill: FC<AthleteSkillProps> = ({ AthleteId }) => {
  const {
    data: skillTypesData,
    loading: skillTypesLoading,
    refetch,
  } = useGetSkillTypesQuery({
    variables: {
      // where: { athleteId: { equals: AthleteId } },
      orderBy: { position: SortOrder.Asc },
    },
  });

  return <div>index</div>;
};

export default AthleteSkill;
