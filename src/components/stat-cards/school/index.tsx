/** @format */

"use client";

import { FC } from "react";
import { SchoolIcon } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import {
  GetAggregateSchoolQuery,
  SchoolWhereInput,
  useGetAggregateSchoolQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
interface indexProps {
  whereClause: SchoolWhereInput;
  title: string;
  path: string;
}

const SchoolStatCard: FC<indexProps> = ({ whereClause, title, path }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    schoolStore: { setSchools, schools: schoolCount },
  } = useRootStore();

  const { data, loading } = useGetAggregateSchoolQuery({
    variables: {
      where: { ...whereClause },
    },
    onCompleted: (data: GetAggregateSchoolQuery) => {
      setSchools(data as any);
    },
  });

  const activeSchool = `${title?.toLowerCase()}s`;

  return (
    <StatCard
      activeLegend={`${title?.toLowerCase()}s`}
      dataCount={schoolCount?.aggregateSchool?._count?.id || 0}
      title={`Total ${title}s`}
      loading={loading}
      categoryValues={[schoolCount?.aggregateSchool?._count?.id || 0]}
      categories={[activeSchool]}
      onClick={() => router.push("/schools/college")}
      showIcon={pathname === path}
      icon={
        <SchoolIcon className="h-4 w-4 stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(SchoolStatCard);
