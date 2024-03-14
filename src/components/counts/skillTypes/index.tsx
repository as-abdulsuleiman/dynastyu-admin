/** @format */

"use client";

import { Icons } from "@/components/Icons";
import CountCard from "@/components/count-card";
import { useRootStore } from "@/mobx";
import {
  SchoolWhereInput,
  SkillsTypesQuery,
  useSkillsTypesQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import SkillIcon from "../../Icons/skill";
interface indexProps {
  title: string;
}

const SkillTypesCount: FC<indexProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    SkillTypeStore: { setSkillTypes, skillTypes: skillTypeCount },
  } = useRootStore();

  //   const {
  //     data: schools,
  //     loading,
  //     refetch,
  //   } = useGetSchoolsQuery({
  //     variables: {
  //       where: { ...whereClause },
  //     },
  //     onCompleted: (data: GetSchoolsQuery) => {
  //       setSchools(data.schools as any);
  //     },
  //   });

  const {
    data: skillTypesData,
    loading: loading,
    fetchMore,
    refetch,
  } = useSkillsTypesQuery({
    variables: {},
    onCompleted: (data: SkillsTypesQuery) => {
      setSkillTypes(data.skillTypes as any);
    },
  });

  const activeSchool = `Active ${title?.toLowerCase()}`;

  return (
    <CountCard
      activeLegend={`Active ${title?.toLowerCase()}s`}
      dataCount={skillTypeCount?.length || 0}
      title={`Total ${title}`}
      loading={loading}
      categoryValues={[skillTypeCount.length || 0]}
      categories={[activeSchool]}
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

export default observer(SkillTypesCount);
