/** @format */

"use client";

import { FC, ReactNode } from "react";
import {
  Badge,
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Legend,
  Metric,
  Text,
} from "@tremor/react";
import { Skeleton } from "../ui/skeleton";
import { observer } from "mobx-react-lite";

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

const CountCard: FC<CountCardProps> = ({
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
    <Card className="bg-background dark:bg-dark-background">
      <Flex alignItems="start">
        <div className="">
          <Text>{title}</Text>
          {loading ? (
            <Skeleton className="w-[50px] h-[35px] mt-1" />
          ) : (
            <Metric className="mt-1">{dataCount}</Metric>
          )}
        </div>
        {showIcon ? (
          <Badge
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
    </Card>
  );
};

export default observer(CountCard);
