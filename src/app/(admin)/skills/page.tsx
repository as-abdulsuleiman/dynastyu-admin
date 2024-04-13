/** @format */

import { FC } from "react";
import AthleteSkill from "@/components/athlete-skills";

interface AthleteSkillProps {
  params: {
    athlete: string;
  };
  searchParams: {
    athlete: number;
  };
}

const AthleteSkills: FC<AthleteSkillProps> = async ({
  params,
  searchParams,
}) => {
  return (
    <div>
      <AthleteSkill searchParams={searchParams} params={params} />
    </div>
  );
};

export default AthleteSkills;
