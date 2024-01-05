/** @format */

import { Card, Title, Text } from "@tremor/react";
import { FC } from "react";
import AccordionCard from "../accordion-card";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

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
    <Card className="bg-background dark:bg-dark-background">
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
          {transcripts?.map((val: Transcripts, index: number) => {
            return (
              <AccordionCard
                key={val?.id}
                value={`${"item"}-${index + 1}`}
                trigger={`${"Transcript"} ${index + 1}`}
                content={renderContent(val)}
              />
            );
          })}
        </>
      )}
    </Card>
  );
};

export default TranscriptCard;
