/** @format */

import { FC } from "react";
import { Divider, Title, Text } from "@tremor/react";

interface pageProps {
  params: {
    fanId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  return (
    <main className="w-full h-full">
      <Title>Fan Overview</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
    </main>
  );
};

export default Page;
