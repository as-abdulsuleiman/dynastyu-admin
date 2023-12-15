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

const FanCount: FC<indexProps> = ({}) => {
  const router = useRouter();

  const { data: fans, loading } = useGetUsersQuery({
    variables: {
      where: {
        accountTypeId: {
          equals: 2,
        },
      },
    },
  });

  const activeFans = fans?.users?.filter((a) => a?.isActive)?.length || 0;
  const inactiveFans = fans?.users?.filter((a) => !a?.isActive)?.length || 0;

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
              <Text>Total Fans</Text>
              <Metric className="mt-1">{fans?.users?.length}</Metric>
            </div>
            <BadgeDelta
              className="cursor-pointer"
              onClick={() => router.push("/fans")}
              deltaType="moderateIncrease"
            >
              View
            </BadgeDelta>
          </Flex>
          <CategoryBar
            className="mt-4"
            values={[activeFans, inactiveFans]}
            colors={["emerald", "rose"]}
          />
          <Legend
            activeLegend="Active fans"
            className="mt-3"
            categories={["Active fans", "Inactive fans"]}
            colors={["emerald", "rose"]}
          />
        </>
      )}
    </Card>
  );
};

export default FanCount;
