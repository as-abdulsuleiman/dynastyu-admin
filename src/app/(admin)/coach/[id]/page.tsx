/** @format */

import { FC } from "react";
import CoachDetail from "@/components/coach-detail";

interface PageProps {
  params: {
    id: number;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  return <CoachDetail params={params} />;
};

export default Page;
