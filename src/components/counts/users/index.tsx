/** @format */

"use client";

import { useRootStore } from "@/mobx";
import { SortOrder, useGetUsersQuery } from "@/services/graphql";
import {
  BadgeDelta,
  Card,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
  CategoryBar,
  Legend,
} from "@tremor/react";

// import { Card, , Metric, Text } from "@tremor/react";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
interface indexProps {}

const UsersCount: FC<indexProps> = ({}) => {
  const router = useRouter();
  const {
    usersStore: { setUsers, users: usersCount },
  } = useRootStore();

  const { data: users, loading } = useGetUsersQuery({
    onCompleted: (data) => {
      setUsers(data as any);
    },
  });

  const activeUsers = users?.users?.filter((a) => a?.isActive)?.length || 0;
  const inactiveUsers = users?.users?.filter((a) => !a?.isActive)?.length || 0;

  return (
    <Card>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full mx-auto my-auto">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <Flex alignItems="start">
            <div className="">
              <Text>Total Users</Text>
              <Metric className="mt-1">{users?.users?.length}</Metric>
            </div>
            <BadgeDelta
              className="cursor-pointer"
              onClick={() => router.push("/users")}
              deltaType="moderateIncrease"
            >
              View
            </BadgeDelta>
          </Flex>
          <CategoryBar
            className="mt-4"
            values={[activeUsers, inactiveUsers]}
            colors={["emerald", "rose"]}
          />
          <Legend
            activeLegend="Active users"
            className="mt-3"
            categories={["Active users", "Inactive users"]}
            colors={["emerald", "rose"]}
          />
        </>
      )}
    </Card>
  );
};

export default UsersCount;
