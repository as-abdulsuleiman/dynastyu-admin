/** @format */

import { FC } from "react";
import CoachDetail from "@/components/coach-detail";

interface pageProps {
  params: {
    coachId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  return <CoachDetail params={params} />;
};

export default Page;
