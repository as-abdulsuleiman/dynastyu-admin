/** @format */

import { Title, Text } from "@tremor/react";
import { FC } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CardContainer from "../card-container";

interface TranscriptCardProps {
  transcripts: Transcripts[];
  loading: boolean;
}

type Transcripts = {
  athleteProfileId: number;
  id: number;
  name: string;
  url: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  __typename: "Transcripts";
};
const renderContent = (val: Transcripts) => {
  return (
    <div className="flex flex-row items-center">
      <Text className="truncate text-tremor-default ">{val?.name}</Text>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() => window?.open(val?.url, "_blank")}
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

const TranscriptCard: FC<TranscriptCardProps> = ({ transcripts, loading }) => {
  return (
    <CardContainer className="p-4 md:p-6">
      <div className="flex flex-row items-center mb-3">
        <Title>Transcripts</Title>
        <Icons.scrollText className="ml-auto h-6 w-6 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
      </div>
      {loading ? (
        renderLoader()
      ) : !transcripts.length ? (
        <>
          <Text className="text-center h-full">No Result Found</Text>
        </>
      ) : (
        <>
          <Accordion type="single" collapsible className="w-full">
            {transcripts?.map((val: Transcripts, index: number) => {
              return (
                <AccordionItem value={`${"item"}-${index + 1}`} key={index}>
                  <AccordionTrigger>{`${"Transcript"} ${
                    index + 1
                  }`}</AccordionTrigger>
                  <AccordionContent>{renderContent(val)}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      )}
    </CardContainer>
  );
};

export default TranscriptCard;
