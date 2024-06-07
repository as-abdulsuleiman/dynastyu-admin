/** @format */

import { FC } from "react";
import CreateSchool from "@/components/create-school";
import { observer } from "mobx-react-lite";

interface PageProps {
  params: {
    action: string;
  };
  searchParams: {
    school: number;
  };
}

const Page: FC<PageProps> = ({ params, searchParams }) => {
  return <CreateSchool params={params} searchParams={searchParams} />;
};

export default observer(Page);
