/** @format */

"use client";

import { FC } from "react";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import { useRouter, usePathname } from "next/navigation";
import { FlagOffIcon } from "@/components/Icons";
import { useGetAggregateSkillVerificationRequestQuery } from "@/services/graphql";

interface indexProps {}

const SkillVerificationRequestStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    skillVerificationRequestStore: {
      skillVerificationRequest: skillVerificationRequestCount,
      isLoading,
    },
  } = useRootStore();

  return (
    <StatCard
      activeLegend="Skill Verification Requests"
      dataCount={skillVerificationRequestCount?.length || 0}
      title="Total Skill Verification Requests"
      loading={isLoading}
      categoryValues={[skillVerificationRequestCount?.length || 0]}
      categories={["Skill Verification Requests"]}
      onClick={() => router.push("/flagged-posts")}
      showIcon={pathname === "/flagged-posts"}
      icon={<FlagOffIcon className="h-4 w-4 stroke-teal-500" color="#14b8a6" />}
    />
  );
};

export default observer(SkillVerificationRequestStatCard);
