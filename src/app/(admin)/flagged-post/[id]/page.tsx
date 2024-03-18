/** @format */

import { FC } from "react";
import FlaggedPostDetail from "@/components/flagged-post-detail";

interface pageProps {
  params: {
    id: number;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  return <FlaggedPostDetail params={params} />;
};

export default Page;
