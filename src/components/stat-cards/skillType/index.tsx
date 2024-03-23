/** @format */

"use client";

import { FC } from "react";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetSkillTypesQuery, useGetSkillTypesQuery } from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import SkillIcon from "../../Icons/skill";
interface indexProps {
  title: string;
}

const SkillTypeStatCard: FC<indexProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    skillTypeStore: { setSkillTypes, skillTypes: skillTypeCount },
  } = useRootStore();

  const { data: skillTypesData, loading: loading } = useGetSkillTypesQuery({
    variables: {},
    onCompleted: (data: GetSkillTypesQuery) => {
      setSkillTypes(data?.skillTypes as any);
    },
  });

  return (
    <StatCard
      activeLegend={"Skill Types"}
      dataCount={skillTypeCount?.length || 0}
      title={`Total ${title}`}
      loading={loading}
      categoryValues={[skillTypeCount.length || 0]}
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
