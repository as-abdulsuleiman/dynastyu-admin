/** @format */

import PermissionDetail from "@/components/permission-detail";
import { FC } from "react";

interface PermissionsProps {
  params: {
    id: number;
  };
}

const Page: FC<PermissionsProps> = ({ params }) => {
  return <PermissionDetail params={params} />;
};

export default Page;
//
