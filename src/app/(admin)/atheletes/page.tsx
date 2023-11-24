/** @format */
"use client";

import { useRootStore } from "@/mobx";
import { Title, Text, Divider } from "@tremor/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface AtheletesProps {}

const Atheletes: FC<AtheletesProps> = ({}) => {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();

  return (
    <main className="w-full h-full">
      <Title>Atheletes</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
    </main>
  );
};

export default Atheletes;
