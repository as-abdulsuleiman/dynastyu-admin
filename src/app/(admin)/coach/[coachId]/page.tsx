/** @format */

"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { GetSchoolQuery, useGetCoachQuery } from "@/services/graphql";
import { Title, Divider, Text, Grid, Card, Callout } from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";
import { observer } from "mobx-react-lite";
import SchoolCard from "@/components/school-card";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
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
      icon: () => (
        <Icons.users2 className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Follwers",
      value: data?.coachProfile?.user?._count?.followedBy || 0,
      color: "teal",
      icon: () => (
        <Icons.usersRound className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      color: "teal",
      value: data?.coachProfile?.user?._count?.posts || 0,
      icon: () => (
        <Icons.fileImage className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Verified Athletes",
      color: "teal",
      value: data?.coachProfile?._count?.verifiedAthletes || 0,
      icon: () => (
        <Icons.athlete className="mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600" />
      ),
    },

    {
      name: "Reposts",
      value: data?.coachProfile?.user?._count?.reposts || 0,
      icon: () => (
        <Icons.switchCamera className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Interested Schools",
      value: data?.coachProfile?.user?._count?.interestedSchools || 0,
      icon: () => (
        <Icons.school className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Evaluations Created",
      color: "teal",
      value: data?.coachProfile?.user?._count?.evaluationsCreated || 0,
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Comments",
      color: "teal",
      value: data?.coachProfile?.user?._count?.comments || 0,
      icon: () => (
        <Icons.messageCircleCode className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
  ];

  return (
    <main className="w-full h-full relative">
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
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <Title>
              {data?.coachProfile?.user?.firstname}{" "}
              {data?.coachProfile?.user?.surname}
            </Title>
            <Icons.whistle className="h-4 w-4 ml-2 fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis" />
          </div>
          <Text>
            {data?.coachProfile?.title} at {data?.coachProfile?.school?.name}
          </Text>
        </div>
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
        <Card className="bg-background dark:bg-dark-background">
          <div className="flex flex-col items-center justify-center">
            <UserAvatar
              className="h-[70px] w-[70px] shadow"
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
          <Callout
            className="mt-4"
            title="Name"
            icon={() => {
              return <Icons.user className="h-5 w-5" color="teal" />;
            }}
            color="teal"
          >
            {data?.coachProfile?.user?.firstname}{" "}
            {data?.coachProfile?.user?.surname}
          </Callout>
          <Callout
            className="mt-4"
            title="Email"
            icon={() => {
              return (
                <Icons.mail className="h-[19px] w-[19px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.coachProfile?.user.email}
          </Callout>
          <Callout
            className="mt-4"
            title="Coach Title"
            icon={() => {
              return (
                <Icons.tags className="h-[20px] w-[20px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.coachProfile?.title}
          </Callout>
          <Callout
            className="mt-4"
            title="State"
            icon={() => {
              return (
                <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.coachProfile?.state}
          </Callout>
          <Callout
            className="mt-4"
            title="City"
            icon={() => {
              return (
                <Icons.locateFixed
                  className="h-[20px] w-[20px] mr-2"
                  color="teal"
                />
              );
            }}
            color="teal"
          >
            {data?.coachProfile?.city}
          </Callout>
        </Card>
        <SchoolCard
          loading={loading}
          school={data?.coachProfile?.school as GetSchoolQuery}
        />
      </Grid>
    </main>
  );
};

export default observer(Page);
