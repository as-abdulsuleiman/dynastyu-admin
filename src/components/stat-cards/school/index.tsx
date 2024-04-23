/** @format */

"use client";

import { SchoolIcon } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import {
  GetSchoolsQuery,
  SchoolWhereInput,
  useGetSchoolsQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
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

  const {
    data: schools,
    loading,
    refetch,
  } = useGetSchoolsQuery({
    variables: {
      where: { ...whereClause },
    },
    onCompleted: (data: GetSchoolsQuery) => {
      setSchools(data?.schools as any);
    },
  });

  const activeSchool = `${title?.toLowerCase()}s`;

  return (
    <StatCard
      activeLegend={`${title?.toLowerCase()}s`}
      dataCount={schoolCount?.length || 0}
      title={`Total ${title}s`}
      loading={loading}
      categoryValues={[schoolCount.length || 0]}
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
