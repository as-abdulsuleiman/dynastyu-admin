/** @format */

"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useGetCoachQuery } from "@/services/graphql";
import { Title, Divider, Text } from "@tremor/react";
import {
  BadgeCheck,
  Camera,
  PictureInPicture,
  School,
  SwitchCamera,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";

interface pageProps {
  params: {
    coachId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, loading } = useGetCoachQuery({
    variables: {
      where: {
        id: Number(params?.coachId),
      },
    },
  });

  const dataList = [
    {
      name: "Following",
      value: data?.coachProfile?.user?._count?.following || 0,

      icon: function TwitterIcon() {
        return <Users className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />;
      },
    },

    {
      name: "Follwers",
      value: data?.coachProfile?.user?._count?.followedBy || 0,

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
            className="lucide lucide-users-round mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500"
          >
            <path d="M18 21a8 8 0 0 0-16 0" />
            <circle cx="10" cy="8" r="5" />
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
          </svg>
        );
      },
    },
    {
      name: "Posts",
      value: data?.coachProfile?.user?._count?.posts || 0,
      icon: function TwitterIcon() {
        return <Camera className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />;
      },
    },

    {
      name: "Verified Athletes",
      value: data?.coachProfile?._count?.verifiedAthletes || 0,
      icon: function TwitterIcon() {
        return (
          <BadgeCheck className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />
        );
      },
    },

    {
      name: "Reposts",
      value: data?.coachProfile?.user?._count?.reposts || 0,
      icon: function TwitterIcon() {
        return (
          <SwitchCamera className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />
        );
      },
    },
    {
      name: "Interested Schools",
      value: data?.coachProfile?.user?._count?.interestedSchools || 0,
      icon: function TwitterIcon() {
        return <School className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />;
      },
    },
    {
      name: "Evaluations Created",
      value: data?.coachProfile?.user?._count?.evaluationsCreated || 0,
      icon: function TwitterIcon() {
        return (
          <PictureInPicture className="mr-2.5 mb-[-6px] h-5 w-5 stroke-blue-500" />
        );
      },
    },
    {
      name: "Comments",
      value: data?.coachProfile?.user?._count?.comments || 0,
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
        <>
          <Skeleton className="w-[100px] h-[20px]" />
          <Skeleton className="w-[100px] h-[20px] mt-4" />
        </>
      ) : (
        <>
          <Title>
            {data?.coachProfile?.user?.firstname}{" "}
            {data?.coachProfile?.user?.surname}
          </Title>
          <Text>
            {data?.coachProfile?.title} at {data?.coachProfile?.school?.name}
          </Text>
        </>
      )}
      <Divider></Divider>
      <UsersAnalytics
        loading={loading}
        data={dataList}
        showStatus={true}
        isActive={data?.coachProfile?.user?.isActive || false}
        title={`${data?.coachProfile?.user?.firstname} 
        ${data?.coachProfile?.user?.surname} Analytics`}
      />
    </div>
  );
};

export default Page;
