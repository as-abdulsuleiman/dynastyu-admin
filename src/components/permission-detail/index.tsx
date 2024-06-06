import { useGetPermissionQuery } from "@/services/graphql";
import React, { FC } from "react";

interface PermissionDetailProps {
  params: {
    id: number;
  };
}

const PermissionDetail: FC<PermissionDetailProps> = ({ params }) => {
  const { data } = useGetPermissionQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });
  console.log("data", data);
  return <div>index</div>;
};

export default PermissionDetail;
