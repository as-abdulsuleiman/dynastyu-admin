/** @format */

import AthleteSkill from "@/components/athlete-skills";
import { FC } from "react";

interface AthleteSkillProps {
  params: {
    athlete: string;
  };
  searchParams: {
    athlete: number;
  };
}

const AthleteSkills: FC<AthleteSkillProps> = ({ params, searchParams }) => {
  return (
    <div>
      <AthleteSkill AthleteId={searchParams?.athlete} />
    </div>
  );
};

export default AthleteSkills;
