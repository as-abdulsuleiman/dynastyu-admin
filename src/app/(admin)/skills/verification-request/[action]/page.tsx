/** @format */

import { FC } from "react";
import VerificationRequest from "@/components/verification-request";

interface pageProps {
  params: {
    action: string;
  };
  searchParams: {
    skill: number;
  };
}

const Page: FC<pageProps> = ({ params, searchParams }) => {
  return <VerificationRequest searchParams={searchParams} params={params} />;
};

export default Page;
