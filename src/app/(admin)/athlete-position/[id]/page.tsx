/** @format */

import { FC } from "react";
import PositionDetail from "@/components/position-detail";

interface PageProps {
  params: {
    id: number;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  return <PositionDetail params={params} />;
};

export default Page;
