/** @format */

"use client";

import { FC } from "react";
import {
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Legend,
  Metric,
  Text,
} from "@tremor/react";
import { Skeleton } from "../ui/skeleton";

interface CountCardProps {
  title: string;
  loading: boolean;
  dataCount: number;
  categoryValues: number[];
  categories: string[];
  activeLegend: string;
}

const CountCard: FC<CountCardProps> = ({
  title,
  loading,
  dataCount,
  categoryValues,
  categories,
  activeLegend,
}) => {
  return (
    <Card>
      <Flex alignItems="start">
        <div className="">
          <Text>{title}</Text>
          {loading ? (
            <Skeleton className="w-[50px] h-[35px] mt-1" />
          ) : (
            <Metric className="mt-1">{dataCount}</Metric>
          )}
        </div>
        <BadgeDelta
          className="cursor-pointer"
          // onClick={() => router.push("/athletes")}
          deltaType="moderateIncrease"
        >
          View
        </BadgeDelta>
      </Flex>
      <CategoryBar
        className="mt-4"
        values={categoryValues}
        colors={["emerald", "rose"]}
      />
      <Legend
        activeLegend={activeLegend}
        className="mt-3"
        categories={categories}
        enableLegendSlider={true}
        colors={["emerald", "rose"]}
      />
    </Card>
  );
};

export default CountCard;
