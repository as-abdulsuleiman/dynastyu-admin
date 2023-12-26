/** @format */

"use client";

import { Divider, Title, Text } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { FC } from "react";

interface FansProps {}

const Fans: FC<FansProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <Title>Fans</Title>
      <Text>In Progress</Text>
      <Divider></Divider>
    </main>
  );
};
export default observer(Fans);
