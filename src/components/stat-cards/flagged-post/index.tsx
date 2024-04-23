/** @format */

"use client";

import { FC } from "react";
import StatCard from "@/components/stat-card";
import { useRootStore } from "@/mobx";
import { GetPostFlagsQuery, useGetPostFlagsQuery } from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { useRouter, usePathname } from "next/navigation";
import { FlagOffIcon } from "@/components/Icons";

interface indexProps {}

const FlaggedPostStatCard: FC<indexProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    flaggedPostStore: { setFlaggedPost, flaggedPost: flaggedPostCount },
  } = useRootStore();

  const { data: flaggedPostData, loading } = useGetPostFlagsQuery({
    variables: {},
    onCompleted: (data: GetPostFlagsQuery) => {
      setFlaggedPost(data?.postFlags as any);
    },
  });

  return (
    <StatCard
      activeLegend="Flagged Post"
      dataCount={flaggedPostCount?.length || 0}
      title="Total Flagged Post"
      loading={loading}
      categoryValues={[flaggedPostCount?.length]}
      categories={["Flagged Post"]}
      onClick={() => router.push("/flagged-posts")}
      showIcon={pathname === "/flagged-posts"}
      icon={<FlagOffIcon className="h-4 w-4 stroke-teal-500" color="#14b8a6" />}
    />
  );
};

export default observer(FlaggedPostStatCard);
