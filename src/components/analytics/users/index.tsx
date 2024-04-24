/** @format */

"use client";

import { FC } from "react";
import {
  BarList,
  Bold,
  Color,
  Flex,
  Text,
  Title,
  ValueFormatter,
} from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { observer } from "mobx-react-lite";
import CardContainer from "@/components/card-container";

type BarData = {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any>;
  href?: string;
  target?: string;
  color?: Color;
};

interface indexProps {
  data: BarData[];
  loading?: boolean;
  title?: string;
  valueFormatter?: ValueFormatter;
}

const loadingItems = [
  { name: "following" },
  { name: "followers" },
  { name: "Posts" },
  { name: "Respost" },
  { name: "comments" },
];

const UsersAnalytics: FC<indexProps> = ({
  data,
  loading,
  title,
  valueFormatter,
}) => {
  return (
    <CardContainer className="p-4 md:p-6">
      {loading ? (
        <>
          <div className="ml-[6px]">
            <div className="flex flex-row items-center">
              <Skeleton className="w-[160px] h-[25px] mb-8" />
              <Skeleton className="w-[160px] h-[25px] mb-8 flex flex-row ml-auto" />
            </div>
            <div className="flex flex-row items-center">
              <Skeleton className="w-[100px] h-[20px] mb-8" />
              <Skeleton className="w-[60px] h-[20px] mb-8 ml-auto" />
            </div>
            {loadingItems?.map((val, id) => {
              return (
                <div key={id} className="mb-6 flex flex-row items-center">
                  <div className="flex flex-row items-center">
                    <Skeleton className="w-[30px] h-[30px]" />
                    <Skeleton className="w-[150px] h-[19px] ml-4" />
                  </div>
                  <Skeleton className="w-[16px] h-[15px] ml-auto" />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center">
            <Title>{title}</Title>
            <div className="ml-auto flex flex-row items-center"></div>
          </div>
          <Flex className="mt-4">
            <Text>
              <Bold>Source</Bold>
            </Text>
            <Text>
              <Bold>Counts</Bold>
            </Text>
          </Flex>
          <BarList
            valueFormatter={valueFormatter}
            showAnimation={true}
            data={data}
            className="mt-2"
          />
        </>
      )}
    </CardContainer>
  );
};

export default observer(UsersAnalytics);
