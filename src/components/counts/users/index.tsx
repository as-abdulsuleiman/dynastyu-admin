/** @format */

"use client";

import CountCard from "@/components/count-card";
import { useRootStore } from "@/mobx";
import { GetUsersQuery, SortOrder, useGetUsersQuery } from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface indexProps {}

const UsersCount: FC<indexProps> = ({}) => {
  const router = useRouter();
  const {
    userStore: { setUsers, users: usersCount },
  } = useRootStore();

  const { data: users, loading } = useGetUsersQuery({
    variables: {},
    onCompleted: (data: GetUsersQuery) => {
      setUsers(data.users as any);
    },
  });

  const activeUsers = users?.users?.filter((a) => a?.isActive)?.length || 0;
  const inactiveUsers = users?.users?.filter((a) => !a?.isActive)?.length || 0;

  return (
    <CountCard
      activeLegend="Active users"
      dataCount={usersCount?.length || 0}
      title="Total Users"
      loading={loading}
      categoryValues={[activeUsers, inactiveUsers]}
      categories={["Active users", "Inactive users"]}
    />
  );
};

export default observer(UsersCount);
