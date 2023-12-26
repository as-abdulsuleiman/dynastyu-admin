/** @format */

"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useGetCoachQuery } from "@/services/graphql";
import { Title, Divider, Text, Grid, Card, Callout } from "@tremor/react";
import {
  BadgeCheck,
  Camera,
  LocateFixed,
  Mail,
  PictureInPicture,
  School,
  SwitchCamera,
  Tags,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";
import { observer } from "mobx-react-lite";
import SchoolCard from "@/components/school-card";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import {
  CheckCircleIcon,
  UserIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import TooltipCard from "@/components/tooltip-card";

interface pageProps {
  params: {
    coachId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();

  const { data, loading } = useGetCoachQuery({
    variables: {
      where: {
        id: Number(params?.coachId),
      },
    },
  });

  const dataList: any = [
    {
      name: "Following",
      value: data?.coachProfile?.user?._count?.following || 0,
      color: "teal",
      icon: function TwitterIcon() {
        return <Users className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />;
      },
    },

    {
      name: "Follwers",
      value: data?.coachProfile?.user?._count?.followedBy || 0,
      color: "teal",
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
            className="lucide lucide-users-round mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600"
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
      color: "teal",
      value: data?.coachProfile?.user?._count?.posts || 0,
      icon: function TwitterIcon() {
        return <Camera className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />;
      },
    },

    {
      name: "Verified Athletes",
      color: "teal",
      value: data?.coachProfile?._count?.verifiedAthletes || 0,
      icon: function TwitterIcon() {
        return (
          <BadgeCheck className="mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600" />
        );
      },
    },

    {
      name: "Reposts",
      value: data?.coachProfile?.user?._count?.reposts || 0,
      icon: function TwitterIcon() {
        return (
          <SwitchCamera className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
        );
      },
    },
    {
      name: "Interested Schools",
      value: data?.coachProfile?.user?._count?.interestedSchools || 0,
      icon: function TwitterIcon() {
        return <School className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />;
      },
    },
    {
      name: "Evaluations Created",
      color: "teal",
      value: data?.coachProfile?.user?._count?.evaluationsCreated || 0,
      icon: function TwitterIcon() {
        return (
          <PictureInPicture className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
        );
      },
    },
    {
      name: "Comments",
      color: "teal",
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
            className="lucide lucide-message-circle-code mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600"
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
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <Card>
          <div className="flex flex-col items-center justify-center">
            <UserAvatar
              className="h-[90px] w-[90px]"
              fallbackType="icon"
              avatar={data?.coachProfile?.user.avatar as string}
              fallback={`${data?.coachProfile?.user?.username?.charAt(
                0
              )} ${data?.coachProfile?.user?.firstname?.charAt(0)}`}
              icon={<Icons.user className="h-8 w-8" />}
            />
            {loading ? (
              <div className="flex flex-row items-center">
                <Skeleton className="w-[120px] h-[25px] mt-2 mr-1" />
                <Skeleton className="w-[24px] h-[24px] mt-2 rounded-full" />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center">
                <Text className="text-xl relative mr-1">
                  {/* {data?.coachProfile?.user?.firstname}{" "} */}@
                  {data?.coachProfile?.user?.username}
                </Text>
                {data?.coachProfile?.verified ? (
                  <TooltipCard
                    message="Verified"
                    trigger={
                      <Icons.badgeCheck className="h-5 w-5" color="teal" />
                    }
                  />
                ) : (
                  <TooltipCard
                    message="Not Verified"
                    trigger={
                      <Icons.badgeAlert className="h-5 w-5" color="teal" />
                    }
                  />
                )}
              </div>
            )}
          </div>
          <Divider></Divider>
          <Callout className="mt-4" title="Name" icon={UserIcon} color="teal">
            {data?.coachProfile?.user?.firstname}{" "}
            {data?.coachProfile?.user?.surname}
          </Callout>
          <Callout
            className="mt-4 "
            title="Email"
            icon={() => {
              return <Mail className="h-[19px] w-[19px] mr-2" color="teal" />;
            }}
            color="teal"
          >
            {data?.coachProfile?.user.email}
          </Callout>
          <Callout
            className="mt-4"
            title="Coach Title"
            icon={() => {
              return <Tags className="h-[20px] w-[20px] mr-2" color="teal" />;
            }}
            color="teal"
          >
            {data?.coachProfile?.title}
          </Callout>
          <Callout
            className="mt-4"
            title="State"
            icon={LocationMarkerIcon}
            color="teal"
          >
            {data?.coachProfile?.state}
          </Callout>
          <Callout
            className="mt-4"
            title="City"
            icon={() => {
              return (
                <LocateFixed className="h-[20px] w-[20px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.coachProfile?.city}
          </Callout>
        </Card>
        <SchoolCard
          loading={loading}
          division={data?.coachProfile?.school?.division as string}
          title={data?.coachProfile?.school.schoolType.name as string}
          description={data?.coachProfile?.school?.description as string}
          address={data?.coachProfile?.school?.address as string}
          schoolName={data?.coachProfile?.school?.name as string}
          avatar={data?.coachProfile?.school?.logo as string}
        />
      </Grid>
    </div>
  );
};

export default observer(Page);
