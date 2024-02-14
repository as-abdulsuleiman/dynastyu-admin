/** @format */

import { FC } from "react";
import CreateFan from "@/components/create-fan";

interface PageProps {
  params: {
    action: string;
  };
  searchParams: {
    fan: number;
  };
}

const Page: FC<PageProps> = ({ params, searchParams }) => {
  return <CreateFan params={params} searchParams={searchParams} />;
};

export default Page;
