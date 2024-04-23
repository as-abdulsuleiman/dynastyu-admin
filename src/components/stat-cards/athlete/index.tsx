/** @format */

"use client";

import { FC } from "react";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetAthletesQuery, useGetAthletesQuery } from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { useRouter, usePathname } from "next/navigation";
import { AthleteIcon } from "@/components/Icons";

interface indexProps {}

const AthleteStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    athleteStore: { setAthletes, athletes: athletesCount },
  } = useRootStore();

  const { data: athletes, loading } = useGetAthletesQuery({
    variables: {},
    onCompleted: (data: GetAthletesQuery) => {
      setAthletes(data.athleteProfiles as any);
    },
  });

  return (
    <StatCard
      activeLegend="Athletes"
      dataCount={athletesCount?.length || 0}
      title="Total Athletes"
      loading={loading}
      categoryValues={[athletesCount.length || 0]}
      categories={["Athletes"]}
      onClick={() => router.push("/athletes")}
      showIcon={pathname === "/athletes"}
      icon={
        <AthleteIcon className="h-4 w-4 stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(AthleteStatCard);
