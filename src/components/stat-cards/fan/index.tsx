/** @format */

"use client";

import { FanIcon } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import {
  GetAggregateUserQuery,
  useGetAggregateUserQuery,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

interface indexProps {}

const FanStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    fanStore: { setFans, fans: fansCount },
  } = useRootStore();

  const { data: fans, loading } = useGetAggregateUserQuery({
    variables: {
      where: {
        accountTypeId: {
          equals: 2,
        },
      },
    },
    onCompleted: (data: GetAggregateUserQuery) => {
      setFans(data as any);
    },
  });

  return (
    <StatCard
      activeLegend="Fans"
      dataCount={fansCount?.aggregateUser?._count?.id || 0}
      title="Total Fans"
      loading={loading}
      categoryValues={[fansCount?.aggregateUser?._count?.id || 0]}
      categories={["Fans"]}
      onClick={() => router.push("/fans")}
      showIcon={pathname === "/fans"}
      icon={
        <FanIcon className="h-4 w-4 fill-tremor-content-teal dark:fill-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(FanStatCard);
