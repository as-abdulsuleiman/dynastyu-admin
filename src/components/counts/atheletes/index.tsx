/** @format */

"use client";

import { useRootStore } from "@/mobx";
import { GetUsersQuery, SortOrder, useGetUsersQuery } from "@/services/graphql";
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

const AtheletesCount: FC<indexProps> = ({}) => {
  const router = useRouter();

  const {
    atheletesStore: { setAtheletes, atheletes: atheletesCount },
  } = useRootStore();
  const { data: atheletes, loading } = useGetUsersQuery({
    variables: {
      where: {
        accountTypeId: {
          equals: 1,
        },
      },
    },
    onCompleted: (data: GetUsersQuery) => {
      setAtheletes(data as any);
    },
  });

  const activeAtheletes =
    atheletes?.users?.filter((a) => a?.isActive)?.length || 0;
  const inactiveAtheletes =
    atheletes?.users?.filter((a) => !a?.isActive)?.length || 0;

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
              <Text>Total Atheletes</Text>
              <Metric className="mt-1">{atheletes?.users?.length}</Metric>
            </div>
            <BadgeDelta
              className="cursor-pointer"
              onClick={() => router.push("/atheletes")}
              deltaType="moderateIncrease"
            >
              View
            </BadgeDelta>
          </Flex>
          <CategoryBar
            className="mt-4"
            values={[activeAtheletes, inactiveAtheletes]}
            colors={["emerald", "rose"]}
          />
          <Legend
            activeLegend="Active atheletes"
            className="mt-3"
            categories={["Active atheletes", "Inactive atheletes"]}
            colors={["emerald", "rose"]}
          />
        </>
      )}
    </Card>
  );
};

export default AtheletesCount;
