/** @format */

"use client";

import { Icons } from "@/components/Icons";
import CountCard from "@/components/count-card";
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
}

const SchoolsCount: FC<indexProps> = ({ whereClause, title }) => {
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
      setSchools(data.schools as any);
    },
  });

  useEffect(() => {
    refetch({
      where: {
        ...whereClause,
      },
    });
  }, [refetch, whereClause]);

  const activeSchool = `Active ${title?.toLowerCase()}s`;

  return (
    <CountCard
      activeLegend={`Active ${title?.toLowerCase()}s`}
      dataCount={schoolCount?.length || 0}
      title={`Total ${title}s`}
      loading={loading}
      categoryValues={[schoolCount.length || 0]}
      categories={[activeSchool]}
      onClick={() => router.push("/schools")}
      showIcon={pathname === "/schools"}
      icon={
        <Icons.school className="h-4 w-4 stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(SchoolsCount);
