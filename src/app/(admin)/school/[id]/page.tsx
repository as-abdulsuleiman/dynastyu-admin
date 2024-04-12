/** @format */

"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSchoolQuery } from "@/services/graphql";
import { useRouter } from "next/navigation";
import { Title, Text, Grid } from "@tremor/react";
import { Icons } from "@/components/Icons";
import AthletesInterested from "@/components/athletes-interested";
import SchoolCard from "@/components/school-card";
import SchoolCoaches from "@/components/school-coaches";
import { observer } from "mobx-react-lite";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: {
    id: number;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { data, loading } = useGetSchoolQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

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
          </div>
        </div>
      )}
      <Separator className="my-6" />

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
