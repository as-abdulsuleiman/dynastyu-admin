/** @format */

import { FC } from "react";
import SkillVerificationRequest from "@/components/skill-verification-request";

interface SkillVerificationRequestProps {
  params: {
    action: string;
  };
  searchParams: {
    skill: number;
  };
}

const Page: FC<SkillVerificationRequestProps> = ({}) => {
  return <SkillVerificationRequest />;
};

export default Page;
