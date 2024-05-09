/** @format */

"use client";

import { WhistleIcon } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import {
  GetAggregateCoachProfileQuery,
  useGetAggregateCoachProfileQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const CoacheStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    coacheStore: { setCoaches, coaches: coachesCount },
  } = useRootStore();

  const { data: coaches, loading } = useGetAggregateCoachProfileQuery({
    variables: {},
    onCompleted: (data: GetAggregateCoachProfileQuery) => {
      setCoaches(data as any);
    },
  });

  return (
    <StatCard
      activeLegend="Coaches"
      dataCount={coachesCount?.aggregateCoachProfile?._count?.id || 0}
      title="Total Coaches"
      loading={loading}
      categoryValues={[coachesCount?.aggregateCoachProfile?._count?.id || 0]}
      categories={["Coaches"]}
      onClick={() => router.push("/coaches")}
      showIcon={pathname === "/coaches"}
      icon={
        <WhistleIcon className="h-4 w-4 fill-tremor-content-teal dark:fill-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(CoacheStatCard);
