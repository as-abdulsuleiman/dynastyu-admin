/** @format */

"use client";

import { FC } from "react";
import {
  Badge,
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
import { Icons } from "@/components/Icons";
import { Card, CardContent } from "@/components/ui/card";

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
                  <Badge
                    datatype={isActive ? "increase" : "decrease"}
                    className="flex flex-row "
                    color={isActive ? "teal" : "rose"}
                    icon={isActive ? StatusOnlineIcon : StatusOfflineIcon}
                  >
                    {isActive ? "Active" : "Deactivated"}
                  </Badge>
                ) : null}

                {showVerified ? (
                  <Badge
                    datatype={isVerified ? "increase" : "decrease"}
                    className="flex flex-row ml-3"
                    color={isVerified ? "sky" : "rose"}
                    icon={() => {
                      if (isVerified) {
                        return (
                          <Icons.badgeCheck
                            className="h-4 w-4 mr-2"
                            color="sky"
                          />
                        );
                      } else {
                        return (
                          <Icons.badgeAlert
                            className="h-4 w-4 mr-2"
                            color="rose"
                          />
                        );
                      }
                    }}
                  >
                    {isVerified ? "Verified" : "Not Verified"}
                  </Badge>
                ) : null}

                {showFeatured ? (
                  <Badge
                    datatype={featured ? "increase" : "decrease"}
                    className="flex flex-row ml-3"
                    color={featured ? "yellow" : "rose"}
                    icon={() => <StarIcon className="h-4 w-4 mr-1" />}
                  >
                    {featured ? "Featured" : "Not Featured"}
                  </Badge>
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
