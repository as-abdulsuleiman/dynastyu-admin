/** @format */

import RoleDetail from "@/components/role-detail";
import { FC } from "react";

interface RoleProps {
  params: {
    id: number;
  };
}

const Page: FC<RoleProps> = ({ params }) => {
  return <RoleDetail params={params} />;
};

export default Page;
//
