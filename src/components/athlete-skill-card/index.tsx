/** @format */

import { FC, useState } from "react";
import { Title, Text } from "@tremor/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SkillIcon } from "../Icons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useUpdateAthleteMutation } from "@/services/graphql";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CardContainer from "../card-container";

interface AthleteSkillsCardProps {
  athleteSkills: AthleteSkill[];
  loading: boolean;
  athleteId: number;
}

type AthleteSkill = {
  athleteId: number;
  id: number;
  secondValue: string;
  skillId: number;
  skillType: {
    id: number;
    name: string;
    __typename: "SkillType";
  };
  value: string;
  verified: boolean;
  videos: string[];
  __typename: "Skills";
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

const AthleteSkillCard: FC<AthleteSkillsCardProps> = ({
  loading,
  athleteSkills,
  athleteId,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [updateAthlete] = useUpdateAthleteMutation();
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const renderContent = (val: AthleteSkill) => {
    const handleVerifySkill = async (val: AthleteSkill) => {
      setIsUpdating(val?.id);
      try {
        setIsUpdating(val?.id);
        await updateAthlete({
          variables: {
            where: {
              id: athleteId,
            },
            data: {
              skills: {
                update: [
                  {
                    where: {
                      id: val?.id,
                    },
                    data: {
                      verified: { set: !val?.verified },
                    },
                  },
                ],
              },
            },
          },
        });
      } catch (error: any) {
        toast({
          title: "Something went wrong.",
          description: error?.message,
          variant: "destructive",
        });
      } finally {
        setIsUpdating(null);
      }
    };

    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-start md:items-center mb-1">
          <div>Value:</div>
          <Text className="truncate text-left text-tremor-default ml-2">
            {val?.value}
          </Text>
        </div>
        <div className="flex flex-row items-center mb-1">
          <div>Second Value:</div>
          <Text className="truncate text-tremor-default ml-2">
            {val?.secondValue}
          </Text>
        </div>
        <div className="flex flex-row items-center mb-1">
          {val?.videos?.length ? (
            <div className=" flex-row items-center hidden">
              {/* {val?.verified ? (
                <Icons.shield className="h-5 w-5 stroke-[1.5px]" color="teal" />
              ) : null} */}

              {/* <div
                className={`text-[15px] ${
                  val?.verified ? "text-teal-700 ml-1" : "text-gray-600 ml-0"
                }`}
              >
                {val?.verified && val?.videos?.length
                  ? "Verified"
                  : "Verification Pending"}
              </div> */}
            </div>
          ) : null}
          {/* {val?.videos?.length ? (
            <Button className="ml-auto" onClick={() => handleVerifySkill(val)}>
              {isUpdating === val?.id
                ? "Verifying..."
                : val?.verified && val?.videos?.length
                ? "Unverified skill"
                : "Verify skill"}
            </Button>
          ) : null} */}
        </div>
        {/* {val?.videos?.length > 0 ? (
          <Card className="border-none">
            <CardContent className="p-6 border-none">
              <MediaCard
                loading={loading}
                items={val?.videos || []}
                type={"video"}
              />
            </CardContent>
          </Card>
        ) : null} */}
      </div>
    );
  };

  return (
    <CardContainer className="p-4 md:p-6">
      <div className="flex flex-row items-center mb-3">
        <Title>Skills</Title>
        <SkillIcon
          className="ml-auto h-6 w-6 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis"
          color="#374151"
        />
      </div>
      {loading ? (
        <> {renderLoader()}</>
      ) : !athleteSkills.length ? (
        <>
          <Text className="text-center h-full">No Result Found</Text>
        </>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {athleteSkills?.map((val: AthleteSkill, index: number) => {
            return (
              <AccordionItem value={`${"item"}-${index + 1}`} key={index}>
                <AccordionTrigger>{val?.skillType?.name}</AccordionTrigger>
                <AccordionContent>{renderContent(val)}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </CardContainer>
  );
};

export default AthleteSkillCard;
