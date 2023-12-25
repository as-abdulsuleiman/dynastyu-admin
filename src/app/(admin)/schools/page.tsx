/** @format */

"use client";

import { Divider, Title, Text } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { FC } from "react";

interface SchoolsProps {}

const Schools: FC<SchoolsProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <Title>Schools</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
    </main>
  );
};

export default observer(Schools);
