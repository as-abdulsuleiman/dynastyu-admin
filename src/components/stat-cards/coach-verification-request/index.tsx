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

const CoacheVerificationRequestStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    coachVerificationRequestStore: {
      setCoachVerificationRequest,
      caochVerificationRequest: coachesCount,
    },
  } = useRootStore();

  // const { data: coaches, loading } = useGetAggregateCoachProfileQuery({
  //   variables: {
  //     where: {
  //       verified: { equals: false },
  //     },
  //   },
  //   onCompleted: (data: GetAggregateCoachProfileQuery) => {
  //     setCoachVerificationRequest(data as any);
  //   },
  // });

  return (
    <StatCard
      activeLegend="Verification Request"
      dataCount={coachesCount?.aggregateCoachProfile?._count?.id || 0}
      title="Total Coaches"
      // loading={loading}
      categoryValues={[coachesCount?.aggregateCoachProfile?._count?.id || 0]}
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
