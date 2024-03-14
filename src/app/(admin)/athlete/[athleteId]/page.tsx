/** @format */

import { FC } from "react";
import AthleteDetail from "@/components/athlete-detail";

interface AthleteProps {
  params: {
    athleteId: string;
  };
}

const Athlete: FC<AthleteProps> = ({ params }) => {
  return <AthleteDetail params={params} />;
};
export default Athlete;
