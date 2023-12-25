/** @format */

"use client";

import { useRootStore } from "@/mobx";
import { Title, Text, Divider } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface AthletesProps {}

const Athletes: FC<AthletesProps> = ({}) => {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();

  return (
    <main className="w-full h-full">
      <Title>Athletes</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
    </main>
  );
};
export default observer(Athletes);
