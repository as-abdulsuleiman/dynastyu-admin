/** @format */

import { Title, Text } from "@tremor/react";
import { FC } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Card, CardContent } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface InterestedSchoolCardProps {
  interestedSchools: InterestedSchool[];
  loading: boolean;
}

type InterestedSchool = {
  school: {
    id: number;
    address: string;
    backgroundImage: string;
    conference: null;
    description: string;
    division: string;
    email: string;
    logo: string;
    name: string;
    primaryColor: string;
    schoolType: {
      __typename: "SchoolType";
      name: string;
      id: number;
      _count: any;
    };
    secondaryColor: string;
    yearFounded: string;
    yearlyTuition: string;
    __typename: "School";
  };
  __typename: "InterestedSchools";
};

const renderContent = (val: InterestedSchool, router: AppRouterInstance) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start md:items-center mb-1">
        <div>School Type:</div> {""}
        <Text className="truncate text-left text-tremor-default ml-2">
          {val?.school?.schoolType?.name}
        </Text>
      </div>
      <div className="flex flex-row items-center mb-1">
        <div>Name:</div> {""}
        <Text className="truncate text-tremor-default ml-2">
          {val?.school?.name}
        </Text>
      </div>
      <div className="flex flex-row items-center mb-1">
        <div>Address:</div> {""}
        <Text className="truncate text-tremor-default ml-2">
          {val?.school?.address}
        </Text>
      </div>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() =>
          router.push(`/school/${Number(val?.school?.id)}`, { scroll: true })
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

const InterestedSchoolCard: FC<InterestedSchoolCardProps> = ({
  interestedSchools,
  loading,
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-row items-center mb-3">
          <Title>Interested Schools</Title>
          <Icons.school className="ml-auto h-6 w-6 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
        </div>
        {loading ? (
          <> {renderLoader()}</>
        ) : !interestedSchools.length ? (
          <>
            <Text className="text-center h-full">No Result Found</Text>
          </>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {interestedSchools?.map((val: InterestedSchool, index: number) => {
              return (
                <AccordionItem value={`${"item"}-${index + 1}`} key={index}>
                  <AccordionTrigger>{val?.school?.name}</AccordionTrigger>
                  <AccordionContent>
                    {renderContent(val, router)}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default observer(InterestedSchoolCard);
