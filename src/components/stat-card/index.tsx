/** @format */

"use client";

import { FC, ReactNode } from "react";
import { BadgeDelta, CategoryBar, Flex, Legend, Metric } from "@tremor/react";
import { Skeleton } from "../ui/skeleton";
import { observer } from "mobx-react-lite";
import { Card, CardContent } from "../ui/card";
import BadgeCard from "../badge-card";

interface CountCardProps {
  title: string;
  loading: boolean;
  dataCount: number;
  categoryValues?: number[];
  categories?: string[];
  activeLegend: string;
  onClick?: () => void;
  icon?: ReactNode;
  showIcon: boolean;
}

const StatCard: FC<CountCardProps> = ({
  title,
  loading,
  dataCount,
  categoryValues = [],
  categories = [],
  activeLegend,
  showIcon,
  icon,
  onClick,
}) => {
  return (
    <Card>
      <CardContent className="p-6 text-base">
        <Flex alignItems="start">
          <div className="text-base">
            <div className="text-base">{title}</div>
            {loading ? (
              <Skeleton className="w-[50px] h-[35px] mt-1" />
            ) : (
              <Metric className="mt-1">{dataCount}</Metric>
            )}
          </div>
          {showIcon ? (
            <BadgeCard
              color="teal"
              icon={() => {
                return <>{icon}</>;
              }}
            />
          ) : (
            <BadgeDelta
              className="cursor-pointer"
              deltaType="moderateIncrease"
              color="teal"
              onClick={onClick}
            >
              View
            </BadgeDelta>
          )}
        </Flex>
        <CategoryBar
          className="mt-4"
          values={categoryValues}
          colors={["teal", "rose"]}
        />
        <Legend
          activeLegend={activeLegend}
          className="mt-3"
          categories={categories || []}
          enableLegendSlider={true}
          colors={["teal", "rose"]}
        />
      </CardContent>
    </Card>
  );
};

export default observer(StatCard);
