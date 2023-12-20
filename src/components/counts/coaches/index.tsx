/** @format */

"use client";

import CountCard from "@/components/count-card";
import { useRootStore } from "@/mobx";
import {
  GetCoachesQuery,
  SortOrder,
  useGetCoachesQuery,
  useGetUsersQuery,
} from "@/services/graphql";
import {
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Grid,
  Legend,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const CoachesCount: FC<indexProps> = ({}) => {
  const router = useRouter();

  const {
    coacheStore: { setCoaches, coaches: coachesCount },
  } = useRootStore();

  const { data: coaches, loading } = useGetCoachesQuery({
    variables: {},
    onCompleted: (data: GetCoachesQuery) => {
      setCoaches(data.coachProfiles as any);
    },
  });

  const activeCoaches =
    coaches?.coachProfiles?.filter((a) => a?.user?.isActive)?.length || 0;
  const inactiveCoaches =
    coaches?.coachProfiles?.filter((a) => !a?.user?.isActive)?.length || 0;

  return (
    <CountCard
      activeLegend="Active coaches"
      dataCount={coachesCount?.length || 0}
      title="Total Coaches"
      loading={loading}
      categoryValues={[activeCoaches, inactiveCoaches]}
      categories={["Active coaches", "Inactive coaches"]}
    />
  );
};

export default CoachesCount;
