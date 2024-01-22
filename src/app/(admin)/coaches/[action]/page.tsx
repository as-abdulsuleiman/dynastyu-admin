/** @format */

import { FC } from "react";
import CreateCoach from "@/components/create-coach";

interface PageProps {
  params: {
    action: string;
  };
  searchParams: {
    coach: number;
  };
}

const Page: FC<PageProps> = ({ params, searchParams }) => {
  return <CreateCoach params={params} searchParams={searchParams} />;
};

export default Page;
