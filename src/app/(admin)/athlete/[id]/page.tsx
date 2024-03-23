/** @format */

import { FC } from "react";
import AthleteDetail from "@/components/athlete-detail";

interface AthleteProps {
  params: {
    id: number;
  };
}

const Athlete: FC<AthleteProps> = ({ params }) => {
  return <AthleteDetail params={params} />;
};
export default Athlete;
