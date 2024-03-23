/** @format */

"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSchoolQuery } from "@/services/graphql";
import { useRouter } from "next/navigation";
import { Title, Text, Grid } from "@tremor/react";
import { Icons } from "@/components/Icons";
import UsersAnalytics from "@/components/analytics/users";
import AthletesInterested from "@/components/athletes-interested";
import SchoolCard from "@/components/school-card";
import SchoolCoaches from "@/components/school-coaches";
import { observer } from "mobx-react-lite";
import { Separator } from "@/components/ui/separator";

interface pageProps {
  params: {
    id: number;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const { data, loading } = useGetSchoolQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const dataList: any = [
    {
      name: "Athletes Interested",
      value: data?.school?._count?.athletesInterested || 0,
      color: "teal",
      icon: () => (
        <Icons.users2 className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Athletes Prospected",
      value: data?.school?._count?.athletesProspected || 0,
      color: "teal",
      icon: () => (
        <Icons.usersRound className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Athletes Recruited",
      color: "teal",
      value: data?.school?._count?.athletesRecruited || 0,
      icon: () => (
        <Icons.athlete className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Coaches",
      color: "teal",
      value: data?.school?._count?.coaches || 0,
      icon: () => (
        <Icons.whistle className="mr-2.5 mb-[-6px] h-5 w-5 fill-teal-600" />
      ),
    },

    {
      name: "Evaluations",
      value: data?.school?._count?.evaluations || 0,
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      value: data?.school?._count?.posts || 0,
      icon: () => (
        <Icons.fileImage className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    // {
    //   name: "Evaluations Created",
    //   color: "teal",
    //   value: data?.school?._count?.evaluationsCreated || 0,
    //   icon: () => (
    //     <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
    //   ),
    // },
    // {
    //   name: "Comments",
    //   color: "teal",
    //   value: data?.school?._count?.comments || 0,
    //   icon: () => (
    //     <Icons.messageCircleCode className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
    //   ),
    // },
  ];

  return (
    <main className="w-full h-full relative">
      <Button
        variant="destructive"
        className="mb-6"
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
            <div className="ml-0">
              <div className="flex flex-row items-center">
                <Title>
                  {data?.school?.name} {/* {data?.s?.user?.surname} */}
                </Title>
                <Icons.school className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              </div>
              <Text>
                {data?.school?.schoolType?.name} at {data?.school?.address}
              </Text>
            </div>
            <div className="ml-auto">
              <Button
                variant="ghost"
                onClick={() =>
                  router.push(`/schools/edit?school=${params?.id}`)
                }
              >
                Edit School
              </Button>
            </div>
          </div>
        </div>
      )}
      <Separator className="my-6" />
      <UsersAnalytics
        loading={loading}
        data={dataList}
        showStatus={false}
        // isActive={data?.school?.user?.isActive || false}
        title={`${data?.school?.name} 
       Analytics`}
      />
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SchoolCoaches
          loading={loading}
          coaches={(data?.school?.coaches as any) || []}
        />
        <AthletesInterested
          loading={loading}
          athletesInterested={(data?.school?.athletesInterested as any) || []}
        />
      </Grid>
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <SchoolCard loading={loading} school={data?.school as any} />
      </Grid>
    </main>
  );
};

export default observer(Page);
