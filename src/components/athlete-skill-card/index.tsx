/** @format */

import { FC, useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import AccordionCard from "../accordion-card";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { observer } from "mobx-react-lite";
import CarouselCard from "../carousel-card";
import { useUpdateAthleteMutation } from "@/services/graphql";
import { useToast } from "@/hooks/use-toast";
import SkillIcon from "../Icons/skill";
import { useRouter } from "next/navigation";

interface AthleteSkillsCardProps {
  athleteSkills: AthleteSkill[];
  loading: boolean;
  athleteId: string;
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
            <div className="flex flex-row items-center">
              {val?.verified ? (
                <Icons.shield className="h-5 w-5 stroke-[1.5px]" color="teal" />
              ) : null}

              <div
                className={`text-[15px] ${
                  val?.verified ? "text-teal-700 ml-1" : "text-gray-600 ml-0"
                }`}
              >
                {val?.verified && val?.videos?.length
                  ? "Verified"
                  : "Verification Pending"}
              </div>
            </div>
          ) : null}
          {val?.videos?.length ? (
            <Button className="ml-auto" onClick={() => handleVerifySkill(val)}>
              {isUpdating === val?.id
                ? "Verifying..."
                : val?.verified && val?.videos?.length
                ? "Unverified skill"
                : "Verify skill"}
            </Button>
          ) : null}
        </div>
        {val?.videos?.length ? (
          <div className="flex flex-row mx-auto mt-3">
            <CarouselCard videos={val?.videos} />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Card className="bg-background dark:bg-dark-background">
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
        <>
          {athleteSkills?.map((val: AthleteSkill, index: number) => {
            return (
              <AccordionCard
                key={index}
                value={`${"item"}-${index + 1}`}
                trigger={val?.skillType?.name}
                content={renderContent(val)}
              />
            );
          })}
        </>
      )}
    </Card>
  );
};

export default AthleteSkillCard;
