/** @format */

import CreateAthlete from "@/components/create-athlete";
import { FC } from "react";

interface pageProps {
  params: {
    action: string;
  };
  searchParams: {
    athlete: number;
  };
}

const Page: FC<pageProps> = ({ params, searchParams }) => {
  return <CreateAthlete params={params} searchParams={searchParams} />;
};

export default Page;
