/** @format */

"use client";

import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, Title, Text } from "@tremor/react";
import { Icons } from "../Icons";
import AccordionCard from "../accordion-card";
import { Button } from "../ui/button";
import UserAvatar from "../user-avatar";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AthletesInterestedProps {
  loading: boolean;
  athletesInterested: AthletesInterested[];
}

type AthletesInterested = {
  __typename: "InterestedSchools";
  AthleteCommitment: number;
  athleteId: number;
  createdAt: Date;
  userId: number;
  User: {
    id: number;
    avatar: string | null;
    firstname: string;
    surname: string;
    username: string;
    __typename: "User";
  };
  athlete: {
    verified: boolean;
    verifiedById: number;
    position: {
      id: number;
      name: string;
      shortName: string;
      __typename: "Position";
    };
    __typename: "AthleteProfile";
  };
};

const renderContent = (val: AthletesInterested, router: AppRouterInstance) => {
  return (
    <div className="flex flex-flex items-center">
      <div className="flex flex-flex items-center">
        <UserAvatar
          className="h-[40px] w-[40px] shadow"
          fallbackType="name"
          avatar={val?.User?.avatar as string}
          fallback={`${val?.User?.firstname?.charAt(
            0
          )} ${val?.User?.surname?.charAt(0)}`}
        />
        <div className="lex flex-col ml-3 mt-1">
          <Text className="truncate text-tremor-default">
            {val?.User?.firstname} {val?.User?.surname}
          </Text>
          <Text className="text-tremor-label truncate">
            {val?.athlete?.position?.name} ({val?.athlete?.position?.shortName})
          </Text>
        </div>
      </div>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() =>
          router.push(`/athlete/${Number(val?.athleteId)}`, { scroll: true })
        }
      >
        View
      </Button>
    </div>
  );
};

const renderLoader = () => {
  return (
    <div className="w-full flex flex-col">
      {Array.from([1, 2, 3, 4]).map((a, i) => {
        return (
          <div key={i} className="mb-4">
            <Skeleton className="w-full h-[35px]" />
          </div>
        );
      })}
    </div>
  );
};

const AthletesInterested: FC<AthletesInterestedProps> = ({
  loading,
  athletesInterested,
}) => {
  const router = useRouter();
  return (
    <Card className="bg-background dark:bg-dark-background">
      <div className="flex flex-row items-center mb-3">
        <Title>Athletes Interested</Title>
        <Icons.athlete className="ml-auto h-6 w-6 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
      </div>
      {loading ? (
        <> {renderLoader()}</>
      ) : !athletesInterested.length ? (
        <>
          <Text className="text-center h-full">No Result Found</Text>
        </>
      ) : (
        <>
          {athletesInterested?.map((val: AthletesInterested, index: number) => {
            return (
              <AccordionCard
                key={index}
                value={`${"item"}-${index + 1}`}
                trigger={`@${val?.User?.username}`}
                content={renderContent(val, router)}
              />
            );
          })}
        </>
      )}
    </Card>
  );
};

export default AthletesInterested;
