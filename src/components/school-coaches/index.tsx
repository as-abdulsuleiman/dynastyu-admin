/** @format */

"use client";

import { FC } from "react";
import { Text, Title } from "@tremor/react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CardContainer from "../card-container";

interface SchoolCoachesProps {
  loading: boolean;
  coaches: Coach[];
  handleClick: (value: any) => void;
}

type Coach = {
  id: number;
  title: string;
  userId: number;
  user: {
    avatar: string;
    firstname: string;
    surname: string;
    username: string;
    __typename: "CoachProfile";
  };
  __typename: "CoachProfile";
};

const RenderContent = ({
  val,
  router,
  handleClick,
}: {
  val: Coach;
  router: AppRouterInstance;
  handleClick: (val: any) => void;
}) => {
  return (
    <div className="flex flex-flex items-center">
      <div className="flex flex-flex items-center">
        <UserAvatar
          className="h-[40px] w-[40px] shadow"
          fallbackClassName="h-[40px] w-[40px]"
          fallbackType="name"
          avatar={val?.user?.avatar as string}
          fallback={`${val?.user?.firstname?.charAt(
            0
          )} ${val?.user?.surname?.charAt(0)}`}
        />
        <div className="flex flex-col ml-3 mt-1">
          <Text className="text-tremor-default truncate">
            {val?.user?.firstname}
            {val?.user?.surname}
          </Text>
          <Text className="text-tremor-label">{val?.title}</Text>
        </div>
      </div>
      <div className="flex items-end mt-3  ml-0  md:ml-auto">
        <Button
          variant="outline"
          className="ml-auto mr-4"
          size="sm"
          onClick={() => router.push(`/coach/${val?.userId}`, { scroll: true })}
        >
          View
        </Button>
        <Button
          variant="outline"
          className="ml-auto"
          size="sm"
          onClick={() => {
            handleClick(val);
          }}
        >
          Remove Coach
        </Button>
      </div>
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

const SchoolCoaches: FC<SchoolCoachesProps> = ({
  loading,
  coaches,
  handleClick,
}) => {
  const router = useRouter();
  return (
    <CardContainer className="p-4 md:p-6">
      <div className="flex flex-row items-center mb-3">
        <Title>Coaches</Title>
        <Icons.whistle className="ml-auto h-6 w-6 fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis" />
      </div>
      {loading ? (
        <> {renderLoader()}</>
      ) : !coaches?.length ? (
        <>
          <Text className="text-center h-full">No Result Found</Text>
        </>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {coaches?.map((val: Coach, index: number) => {
            return (
              <AccordionItem value={`${"item"}-${index + 1}`} key={index}>
                <AccordionTrigger>@{val?.user?.username}</AccordionTrigger>
                <AccordionContent>
                  <RenderContent
                    val={val}
                    router={router}
                    handleClick={handleClick}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </CardContainer>
  );
};

export default observer(SchoolCoaches);
