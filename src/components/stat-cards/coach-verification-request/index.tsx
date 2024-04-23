/** @format */

"use client";

import { WhistleIcon } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetCoachesQuery, useGetCoachesQuery } from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const CoacheVerificationRequestStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    coacheStore: { setCoaches, coaches: coachesCount },
  } = useRootStore();

  const { data: coaches, loading } = useGetCoachesQuery({
    variables: {
      where: {
        verified: { equals: false },
      },
    },
    onCompleted: (data: GetCoachesQuery) => {
      setCoaches(data.coachProfiles as any);
    },
  });

  return (
    <StatCard
      activeLegend="Verification Request"
      dataCount={coachesCount?.length || 0}
      title="Total Coaches"
      loading={loading}
      categoryValues={[coachesCount?.length]}
      categories={["Verification Request"]}
      onClick={() => router.push("/coaches/verification-request")}
      showIcon={pathname === "/coaches/verification-request"}
      icon={
        <WhistleIcon className="h-4 w-4 fill-tremor-content-teal dark:fill-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(CoacheVerificationRequestStatCard);
