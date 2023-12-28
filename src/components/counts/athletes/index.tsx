/** @format */

"use client";

import { FC } from "react";
import CountCard from "@/components/count-card";
import { useRootStore } from "@/mobx";
import { GetAthletesQuery, useGetAthletesQuery } from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { useRouter, usePathname } from "next/navigation";
import { Icons } from "@/components/Icons";

interface indexProps {}

const AthletesCount: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
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
      onClick={() => router.push("/athletes")}
      showIcon={pathname === "/athletes"}
      icon={
        <Icons.athlete className="h-4 w-4 stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(AthletesCount);
