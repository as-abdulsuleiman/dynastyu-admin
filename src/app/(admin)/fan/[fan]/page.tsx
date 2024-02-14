/** @format */

import { FC } from "react";
import FanDetail from "@/components/fan-detail";

interface pageProps {
  params: {
    fan: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  return <FanDetail params={params} />;
};

export default Page;
