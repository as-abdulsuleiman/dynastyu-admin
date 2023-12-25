/** @format */

"use client";

import {
  SortOrder,
  useGetSchoolsQuery,
  useGetUsersQuery,
} from "@/services/graphql";
import {
  BadgeDelta,
  Card,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import { Loader2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const SchoolsCount: FC<indexProps> = ({}) => {
  const router = useRouter();

  const { data: schools, loading } = useGetSchoolsQuery({
    variables: {
      where: { schoolType: { is: { name: { equals: "High School" } } } },
      take: 30,
    },
  });

  return (
    <Card>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full mx-auto my-auto">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Total Schools</Text>
              <Metric className="truncate mt-1">
                {schools?.schools?.length}
              </Metric>
            </div>
            {/* <Icon
          icon={item.icon}
          variant="simple"
          tooltip="Shows sales performance per employee"
        /> */}
            <BadgeDelta
              className="cursor-pointer"
              onClick={() => router.push("/schools")}
              deltaType="moderateIncrease"
            >
              View
            </BadgeDelta>
          </Flex>
          <ProgressBar value={15.9} className="mt-2" />
        </>
      )}
    </Card>
  );
};

export default observer(SchoolsCount);
