/** @format */

"use client";

import { FC } from "react";
import { Divider, Title, Text } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface pageProps {
  params: {
    fanId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  return (
    <main className="w-full h-full relative">
      <Button
        variant="ghost"
        className="absolute top-[-53px]"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <Title>Fan Overview</Title>
      <Text>In Progress</Text>
      <Divider></Divider>
    </main>
  );
};

export default Page;
