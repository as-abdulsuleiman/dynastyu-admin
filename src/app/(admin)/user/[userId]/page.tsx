/** @format */

"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useGetUserQuery } from "@/services/graphql";
import { Title, Divider, Text } from "@tremor/react";
import {
  Loader2,
  UserCheck,
  FileImage,
  PictureInPicture,
  User,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";

interface pageProps {
  params: {
    userId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, loading } = useGetUserQuery({
    variables: {
      where: {
        id: params?.userId,
      },
    },
  });

  const dataList = [
    {
      name: "Following",
      value: data?.user?._count?.following || 0,
      href: "https://twitter.com/tremorlabs",
      icon: function TwitterIcon() {
        return <User className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />;
      },
    },
    {
      name: "Follwers",
      value: data?.user?._count?.followedBy || 0,
      href: "https://twitter.com/tremorlabs",
      icon: function TwitterIcon() {
        return <User className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />;
      },
    },
    {
      name: "Posts",
      value: data?.user?._count?.posts || 0,
      href: "https://twitter.com/tremorlabs",
      icon: function TwitterIcon() {
        return (
          <FileImage className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />
        );
      },
    },
    {
      name: "Reposts",
      value: data?.user?._count?.reposts || 0,
      href: "https://twitter.com/tremorlabs",
      icon: function TwitterIcon() {
        return (
          <PictureInPicture className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />
        );
      },
    },
    {
      name: "Comments",
      value: data?.user?._count?.comments || 0,
      href: "https://twitter.com/tremorlabs",
      icon: function TwitterIcon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-circle-code mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="m10 10-2 2 2 2" />
            <path d="m14 10 2 2-2 2" />
          </svg>
        );
      },
    },
  ];

  return (
    <div className="w-full h-full relative">
      <Button
        variant="ghost"
        className="absolute top-[-53px]"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      {loading ? (
        <Skeleton className="w-[100px] h-[20px]" />
      ) : (
        <Title>
          {data?.user?.firstname} {data?.user?.surname}
        </Title>
      )}

      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <UsersAnalytics data={dataList} />
        </>
      )}
    </div>
  );
};

export default Page;
