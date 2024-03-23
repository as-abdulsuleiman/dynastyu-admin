/** @format */

"use client";

import { Icons } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetUsersQuery, useGetUsersQuery } from "@/services/graphql";
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

  const { data: fans, loading } = useGetUsersQuery({
    variables: {
      where: {
        accountTypeId: {
          equals: 2,
        },
      },
    },
    onCompleted: (data: GetUsersQuery) => {
      setFans(data.users as any);
    },
  });

  return (
    <StatCard
      activeLegend="Fans"
      dataCount={fansCount?.length || 0}
      title="Total Fans"
      loading={loading}
      categoryValues={[fansCount?.length || 0]}
      categories={["Fans"]}
      onClick={() => router.push("/fans")}
      showIcon={pathname === "/fans"}
      icon={
        <Icons.fans className="h-4 w-4 fill-tremor-content-teal dark:fill-dark-tremor-content-teal" />
      }
    />
  );
};

export default observer(FanStatCard);
