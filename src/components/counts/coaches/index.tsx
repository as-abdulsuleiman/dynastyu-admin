/** @format */

"use client";

import { SortOrder, useGetUsersQuery } from "@/services/graphql";
import {
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Grid,
  Legend,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const CoachesCount: FC<indexProps> = ({}) => {
  const router = useRouter();

  const { data: coaches, loading: loading } = useGetUsersQuery({
    variables: {
      where: {
        accountTypeId: {
          equals: 3,
        },
      },
    },
  });

  const activeCoaches = coaches?.users?.filter((a) => a?.isActive)?.length || 0;
  const inactiveCoaches =
    coaches?.users?.filter((a) => !a?.isActive)?.length || 0;

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
            <div className="">
              <Text>Total Coaches</Text>
              <Metric className="mt-1">{coaches?.users?.length}</Metric>
            </div>
            <BadgeDelta
              className="cursor-pointer"
              onClick={() => router.push("/coaches")}
              deltaType="moderateIncrease"
            >
              View
            </BadgeDelta>
          </Flex>
          <CategoryBar
            className="mt-4"
            values={[activeCoaches, inactiveCoaches]}
            colors={["emerald", "rose"]}
          />
          <Legend
            activeLegend="Active coaches"
            className="mt-3"
            categories={["Active coaches", "Inactive coaches"]}
            colors={["emerald", "rose"]}
          />
        </>
      )}
    </Card>
  );
};

export default CoachesCount;
