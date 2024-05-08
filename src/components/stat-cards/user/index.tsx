/** @format */

"use client";

import { UsersIcon } from "@/components/Icons";
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

const UserStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    userStore: { setUsers, users: usersCount },
  } = useRootStore();

  const { data: users, loading } = useGetAggregateUserQuery({
    variables: {},
    onCompleted: (data: GetAggregateUserQuery) => {
      setUsers(data as any);
    },
  });

  return (
    <StatCard
      activeLegend="Users"
      dataCount={usersCount?.aggregateUser?._count?.id || 0}
      title="Total Users"
      loading={loading}
      categoryValues={[usersCount?.aggregateUser?._count?.id || 0]}
      categories={["Users"]}
      onClick={() => router.push("/users")}
      showIcon={pathname === "/users"}
      icon={<UsersIcon className="h-4 w-4" />}
    />
  );
};

export default observer(UserStatCard);
