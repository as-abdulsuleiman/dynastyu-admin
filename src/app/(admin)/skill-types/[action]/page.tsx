/** @format */

import { FC } from "react";
import CreateSkillType from "@/components/create-skill-type";

interface PageProps {
  params: {
    action: string;
  };
  searchParams: {
    skillType: number;
  };
}

const Page: FC<PageProps> = ({ params, searchParams }) => {
  return <CreateSkillType params={params} searchParams={searchParams} />;
};

export default Page;
