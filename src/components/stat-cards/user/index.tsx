/** @format */

"use client";

import { Icons } from "@/components/Icons";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetUsersQuery, SortOrder, useGetUsersQuery } from "@/services/graphql";
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

  const { data: users, loading } = useGetUsersQuery({
    variables: {},
    onCompleted: (data: GetUsersQuery) => {
      setUsers(data.users as any);
    },
  });

  return (
    <StatCard
      activeLegend="Users"
      dataCount={usersCount?.length || 0}
      title="Total Users"
      loading={loading}
      categoryValues={[usersCount?.length || 0]}
      categories={["Users"]}
      onClick={() => router.push("/users")}
      showIcon={pathname === "/users"}
      icon={<Icons.users className="h-4 w-4" />}
    />
  );
};

export default observer(UserStatCard);
