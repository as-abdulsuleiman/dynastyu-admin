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
import { StatusOfflineIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import StarIcon from "@/components/Icons/starIcon";
import { BadgeAlertIcon, BadgeCheckIcon } from "@/components/Icons";
import { Card, CardContent } from "@/components/ui/card";
import BadgeCard from "@/components/badge-card";

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
  isActive?: boolean;
  showStatus?: boolean;
  showFeatured?: boolean;
  featured?: boolean;
  showVerified?: boolean;
  isVerified?: boolean;
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
  showStatus,
  isActive,
  showFeatured,
  featured,
  isVerified,
  showVerified,
  valueFormatter,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
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
              <div className="ml-auto flex flex-row items-center">
                {/* {isVerified ?} */}

                {showStatus ? (
                  <BadgeCard
                    datatype={isActive ? "increase" : "decrease"}
                    color={isActive ? "teal" : "rose"}
                    icon={isActive ? StatusOnlineIcon : StatusOfflineIcon}
                  >
                    {isActive ? "Active" : "Deactivated"}
                  </BadgeCard>
                ) : null}

                {showVerified ? (
                  <BadgeCard
                    datatype={isVerified ? "increase" : "decrease"}
                    className=" ml-3"
                    color={isVerified ? "sky" : "rose"}
                    icon={() => {
                      if (isVerified) {
                        return (
                          <BadgeCheckIcon
                            className="h-4 w-4 mr-2"
                            color="sky"
                          />
                        );
                      } else {
                        return (
                          <BadgeAlertIcon
                            className="h-4 w-4 mr-2"
                            color="rose"
                          />
                        );
                      }
                    }}
                  >
                    {isVerified ? "Verified" : "Not Verified"}
                  </BadgeCard>
                ) : null}

                {showFeatured ? (
                  <BadgeCard
                    datatype={featured ? "increase" : "decrease"}
                    className="ml-3"
                    color={featured ? "yellow" : "rose"}
                    icon={() => <StarIcon className="h-4 w-4 mr-1" />}
                  >
                    {" "}
                    {featured ? "Featured" : "Not Featured"}
                  </BadgeCard>
                ) : null}
              </div>
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
      </CardContent>
    </Card>
  );
};

export default observer(UsersAnalytics);
