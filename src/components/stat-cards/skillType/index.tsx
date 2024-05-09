/** @format */

"use client";

import { FC } from "react";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import {
  GetAggregateSkillTypeQuery,
  useGetAggregateSkillTypeQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { SkillIcon } from "../../Icons";
interface indexProps {
  title: string;
}

const SkillTypeStatCard: FC<indexProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    skillTypeStore: { setSkillTypes, skillTypes: skillTypeCount },
  } = useRootStore();

  const { data: skillTypesData, loading: loading } =
    useGetAggregateSkillTypeQuery({
      variables: {},
      onCompleted: (data: GetAggregateSkillTypeQuery) => {
        setSkillTypes(data as any);
      },
    });

  return (
    <StatCard
      activeLegend={"Skill Types"}
      dataCount={skillTypeCount?.aggregateSkillType?._count?.id || 0}
      title={`Total ${title}`}
      loading={loading}
      categoryValues={[skillTypeCount?.aggregateSkillType?._count?.id || 0]}
      categories={["Skill Types"]}
      onClick={() => router.push("/skill-types")}
      showIcon={pathname === "/skill-types"}
      icon={
        <SkillIcon
          className="h-4 w-4 stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal fill-tremor-content-teal fill:stroke-dark-tremor-content-teal"
          // color="#14b8a6"
        />
      }
    />
  );
};

export default observer(SkillTypeStatCard);
