/** @format */

"use client";

import { Icons } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetCoachesQuery, useGetCoachesQuery } from "@/services/graphql";
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

  const { data: coaches, loading } = useGetCoachesQuery({
    variables: {},
    onCompleted: (data: GetCoachesQuery) => {
      setCoaches(data.coachProfiles as any);
    },
  });

  return (
    <StatCard
      activeLegend="Coaches"
      dataCount={coachesCount?.length || 0}
      title="Total Coaches"
      loading={loading}
      categoryValues={[coachesCount?.length]}
      categories={["Coaches"]}
      onClick={() => router.push("/coaches")}
      showIcon={pathname === "/coaches"}
      icon={
        <Icons.whistle className="h-4 w-4 fill-tremor-content-teal dark:fill-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(CoacheStatCard);
