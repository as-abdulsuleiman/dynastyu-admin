/** @format */

"use client";

import CountCard from "@/components/count-card";
import { useRootStore } from "@/mobx";
import { GetAthletesQuery, useGetAthletesQuery } from "@/services/graphql";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const AthletesCount: FC<indexProps> = ({}) => {
  const router = useRouter();

  const {
    athleteStore: { setAthletes, athletes: athletesCount },
  } = useRootStore();

  const { data: athletes, loading } = useGetAthletesQuery({
    variables: {},
    onCompleted: (data: GetAthletesQuery) => {
      setAthletes(data.athleteProfiles as any);
    },
  });

  const activeAthletes =
    athletes?.athleteProfiles.filter((a) => a?.user?.isActive)?.length || 0;
  const inactiveAthletes =
    athletes?.athleteProfiles?.filter((a) => !a.user?.isActive)?.length || 0;

  return (
    <CountCard
      activeLegend="Active athletes"
      dataCount={athletesCount?.length || 0}
      title="Total Athletes"
      loading={loading}
      categoryValues={[activeAthletes, inactiveAthletes]}
      categories={["Active athletes", "Inactive athletes"]}
    />
  );
};

export default AthletesCount;
