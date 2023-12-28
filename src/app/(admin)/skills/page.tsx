/** @format */

"use client";

import { FC } from "react";
import { Title, Text, Divider } from "@tremor/react";
import { Button } from "@/components/ui/button";
import {
  useCreateSkillMutation,
  useGetSkillTypesQuery,
  useSkillsTypesQuery,
  useUpsertOneSkillMutation,
} from "@/services/graphql";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [createSkill] = useCreateSkillMutation();
  const [upsertOneSkill] = useUpsertOneSkillMutation();
  const { data: skillsData } = useGetSkillTypesQuery();

  return (
    <main className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <Title>Skills</Title>
          <Text>Skills Overview</Text>
        </div>
        <div className="ml-auto justify-end">
          <Button>Create Skill</Button>
          {/* <CreateCoach
            onCreateCoach={(values) => handleCreateCoach(values)}
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
          /> */}
        </div>
      </div>
      <Divider></Divider>
    </main>
  );
};

export default Page;
