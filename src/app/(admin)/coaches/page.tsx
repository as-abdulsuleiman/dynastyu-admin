/** @format */

import { Title, Text, Divider } from "@tremor/react";
import { FC } from "react";

interface CoachesProps {}

const Coaches: FC<CoachesProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <Title>Coaches</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
    </main>
  );
};

export default Coaches;
