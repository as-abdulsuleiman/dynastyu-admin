/** @format */

import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { Title, Text } from "@tremor/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PhoneIcon from "@/components/Icons/phone";
import CardContainer from "../card-container";
interface AthleteRecruitingContactProps {
  loading: boolean;
  recruitingContact: RecruitingContact[];
}

type RecruitingContact = {
  recruitingContactName?: string | null;
  recruitingPhoneNumber?: string | null;
  recruitingRelationship?: string | null;
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

const AthleteRecruitingContact: FC<AthleteRecruitingContactProps> = ({
  loading,
  recruitingContact,
}) => {
  const renderContent = (val: RecruitingContact) => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-start md:items-center mb-1">
          <div>Name:</div>
          <Text className="truncate text-left text-tremor-default ml-2">
            {val?.recruitingContactName}
          </Text>
        </div>
        <div className="flex flex-row items-center mb-1">
          <div>Phone Number:</div>
          <Text className="truncate text-tremor-default ml-2">
            {val?.recruitingPhoneNumber}
          </Text>
        </div>
        <div className="flex flex-row items-center mb-1">
          <div>Relationship:</div>
          <Text className="truncate text-tremor-default ml-2">
            {val?.recruitingRelationship}
          </Text>
        </div>
      </div>
    );
  };

  return (
    <CardContainer className="p-4 md:p-6">
      <div className="flex flex-row items-center mb-3">
        <Title>Recruiting Contact</Title>
        <PhoneIcon className="ml-auto h-5 w-5 stroke-foreground dark:stroke-foreground" />
      </div>
      {loading ? (
        <> {renderLoader()}</>
      ) : !recruitingContact.length ? (
        <>
          <Text className="text-center h-full">No Result Found</Text>
        </>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {recruitingContact?.map((val: RecruitingContact, index: number) => {
            return (
              <AccordionItem value={`${"item"}-${index + 1}`} key={index}>
                <AccordionTrigger>
                  {val?.recruitingContactName}
                </AccordionTrigger>
                <AccordionContent>{renderContent(val)}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </CardContainer>
  );
};

export default AthleteRecruitingContact;
