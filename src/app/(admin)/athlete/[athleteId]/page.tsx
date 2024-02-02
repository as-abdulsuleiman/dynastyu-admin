/** @format */

"use client";

import { FC } from "react";
import { Divider, Title, Text, Card, Grid, Callout } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useDeleteAthleteMutation,
  useDeleteUserMutation,
  useGetAthleteProfileQuery,
  useUpdateAthleteMutation,
} from "@/services/graphql";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/Icons";
import UsersAnalytics from "@/components/analytics/users";
import SchoolCard from "@/components/school-card";
import UserAvatar from "@/components/user-avatar";
import { formatDate } from "@/lib/utils";
import TranscriptCard from "@/components/transcript-card";
import HoverCard from "@/components/hover-card";
import InterestedSchoolCard from "@/components/interested-school-card";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useToast } from "@/hooks/use-toast";
import { useRootStore } from "@/mobx";
import RecruitedSchoolCard from "@/components/recruited-school-card";
import AthleteSkillCard from "@/components/athlete-skill-card";

interface pageProps {
  params: {
    athleteId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();
  const { toast } = useToast();
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteAthlete] = useDeleteAthleteMutation();

  const { data, loading, refetch } = useGetAthleteProfileQuery({
    variables: {
      where: {
        id: Number(params?.athleteId),
      },
    },
  });
  const dataList: any = [
    {
      name: "Evaluations",
      value: data?.athleteProfile?._count?.evaluations || 0,
      color: "teal",
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Interested Schools",
      value: data?.athleteProfile?._count?.interestedSchools || 0,
      color: "teal",
      icon: () => (
        <Icons.school className="mr-2.5 mb-[-6px] h-5 w-5 lucide lucide-school  stroke-teal-600" />
      ),
    },
    {
      name: "Prospected Schools",
      value: data?.athleteProfile?._count?.prospectedSchools || 0,
      color: "teal",
      icon: () => (
        <Icons.school2 className="mr-2.5 mb-[-6px] h-5 w-5 lucide lucide-school-2 stroke-teal-600" />
      ),
    },
    {
      name: "Recruited Schools",
      value: data?.athleteProfile?._count?.recruitedSchools || 0,
      color: "teal",
      icon: () => (
        <Icons.warehouse className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Skills",
      value: data?.athleteProfile?._count?.skills || 0,
      color: "teal",
      icon: () => (
        <Icons.fileLineChart className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Transcripts",
      value: data?.athleteProfile?._count?.transcripts || 0,
      color: "teal",
      icon: () => (
        <Icons.scrollText className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
  ];

  const renderVerifiedBy = (verifiedBy: any) => {
    return (
      <div className="flex flex-col">
        <Text className="text-center text-lg">Verified By</Text>
        <div className="flex flex-row">
          <Text className="text-center ">
            Coach {verifiedBy?.user?.firstname} {verifiedBy?.user?.surname}
          </Text>
        </div>
        <Text className="text-[13px] text-center">{verifiedBy?.title}</Text>
      </div>
    );
  };

  const handleActivateAthlete = async (item: any) => {
    try {
      const isAthleteActive = item?.user?.isActive;
      const resp = await updateAthlete({
        variables: {
          where: {
            id: Number(params?.athleteId),
          },
          data: {
            user: {
              update: {
                isActive: { set: !isAthleteActive },
              },
            },
          },
        },
      });
      if (resp.data?.updateOneAthleteProfile) {
        // await refetch();
        toast({
          title: "Profile successfully updated.",
          description: `@${item?.user?.username} has been ${
            isAthleteActive ? "Deactivated" : "Activated"
          } `,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteAthlete = async (item: any) => {
    try {
      const response = await deleteAthlete({
        variables: {
          where: {
            id: Number(params?.athleteId),
          },
        },
      });
      if (response.data?.deleteOneAthleteProfile) {
        const userRes = await deleteUser({
          variables: {
            where: {
              id: Number(item?.user?.id),
            },
          },
        });
        await refetch();
        if (userRes.data?.deleteOneUser) {
          router.push(`/athletes`);
        }
        // toast({
        //   title: "Athlete successfully deleted.",
        //   description: `@${item?.user?.username} account has been deleted.`,
        //   variant: "default",
        // });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete athlete profile. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleVerifyAthlete = async (item: any) => {
    try {
      const isVerified = item?.verified;
      const resp = await updateAthlete({
        variables: {
          where: { id: Number(params?.athleteId) },
          data: {
            verified: { set: !isVerified },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      if (resp.data?.updateOneAthleteProfile) {
        // await refetch();
        toast({
          title: "Athlete profile successfully updated.",
          description: `${data?.athleteProfile?.user?.username} has been ${
            isVerified ? "Unverified" : "Verified"
          } `,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const dropdownItems = [
    {
      name: `Edit Profile`,
      onclick: () =>
        router.push(`/athletes/edit?athlete=${Number(params?.athleteId)}`, {
          scroll: true,
        }),
    },
    {
      name: `${
        data?.athleteProfile?.verified ? "Unverify Profile" : "Verify Profile"
      }`,
      onclick: async () => await handleVerifyAthlete(data?.athleteProfile),
    },
    {
      name: `${
        data?.athleteProfile?.user?.isActive ? "Deactivate" : "Activate"
      } Profile`,
      onclick: async () => await handleActivateAthlete(data?.athleteProfile),
    },
    {
      name: "Delete Profile",
      onclick: async () => await handleDeleteAthlete(data?.athleteProfile),
    },
  ];

  return (
    <main className="w-full h-full relative">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
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
              {data?.athleteProfile?.user?.firstname}{" "}
              {data?.athleteProfile?.user?.surname}
            </Title>
            <Icons.athlete className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          </div>
          <Text>@{data?.athleteProfile?.user?.username}</Text>
          <Text>
            {data?.athleteProfile?.position?.name} at{" "}
            {data?.athleteProfile?.school?.name}
          </Text>
          <Text>
            Class of:{" "}
            {data?.athleteProfile?.graduationYear
              ? data?.athleteProfile?.graduationYear
              : "N/A"}
          </Text>
        </div>
      )}
      <Divider></Divider>
      <UsersAnalytics
        loading={loading}
        data={dataList}
        showStatus={true}
        isActive={data?.athleteProfile?.user?.isActive || false}
        title={`${data?.athleteProfile?.user?.firstname} 
        ${data?.athleteProfile?.user?.surname} Analytics`}
      />
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <InterestedSchoolCard
          loading={loading}
          interestedSchools={
            (data?.athleteProfile?.interestedSchools as any) || []
          }
        />
        <RecruitedSchoolCard
          loading={loading}
          recruitedSchools={
            (data?.athleteProfile?.recruitedSchools as any) || []
          }
        />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <TranscriptCard
          loading={loading}
          transcripts={(data?.athleteProfile?.transcripts as any) || []}
        />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <AthleteSkillCard
          athleteId={params?.athleteId}
          loading={loading}
          athleteSkills={(data?.athleteProfile?.skills as any) || []}
        />
        <Card className="bg-background dark:bg-dark-background">
          <div className="flex flex-col items-center justify-center relative">
            <UserAvatar
              className="h-[120px] w-[120px] shadow"
              height={120}
              width={120}
              fallbackType="icon"
              avatar={data?.athleteProfile?.user.avatar as string}
              fallback={`${data?.athleteProfile?.user?.username?.charAt(
                0
              )} ${data?.athleteProfile?.user?.firstname?.charAt(0)}`}
              icon={<Icons.user className="h-8 w-8" />}
            />
            {loading ? (
              <div className="flex flex-row items-center">
                <Skeleton className="w-[170px] h-[28px] mt-2 mr-1" />
                <Skeleton className="w-[16.67px] h-[16.67px] mt-2 rounded-full" />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center mt-1">
                <Text className="text-xl relative mr-1">
                  @{data?.athleteProfile?.user?.username}
                </Text>
                {data?.athleteProfile?.verified ? (
                  <HoverCard
                    content={renderVerifiedBy(data?.athleteProfile?.verifiedBy)}
                    trigger={
                      <div className="cursor-pointer">
                        <Icons.badgeCheck className="h-5 w-5" color="teal" />
                      </div>
                    }
                  />
                ) : (
                  <HoverCard
                    content={<Text>{"Not Verified"}</Text>}
                    trigger={
                      <div className="cursor-pointer">
                        <Icons.badgeAlert className="h-5 w-5" color="teal" />
                      </div>
                    }
                  />
                )}
              </div>
            )}
            <div className="ml-auto absolute right-0 top-0">
              <Menubar className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-0">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer px-0 data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent focus-within:bg-transparent focus-visible:bg-transparent active:bg-transparent">
                    <Icons.moreHorizontal className="cursor-pointer" />
                  </MenubarTrigger>
                  <MenubarContent
                    side="bottom"
                    align="start"
                    sideOffset={-2}
                    alignOffset={-150}
                    className="rounded-tremor-default cursor-pointer bg-background dark:bg-dark-background"
                  >
                    {dropdownItems?.map((val, id) => {
                      return (
                        <MenubarItem
                          onClick={val?.onclick}
                          key={id}
                          className="cursor-pointer tremor-SelectItem-root flex justify-start items-center text-tremor-default  ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis px-2.5 py-2.5"
                        >
                          {val?.name}
                        </MenubarItem>
                      );
                    })}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
          <Divider></Divider>
          <Callout
            className="mt-4 min-h-[75px]"
            title="Name"
            icon={() => {
              return (
                <Icons.user className="h-[19px] w-[19px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.user?.firstname}{" "}
            {data?.athleteProfile?.user?.surname}
          </Callout>
          <Callout
            className="mt-4 min-h-[75px]"
            title="Email"
            icon={() => {
              return (
                <Icons.mail className="h-[19px] w-[19px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.user?.email}
          </Callout>
          <Callout
            className="mt-4"
            title="High Scool"
            icon={() => {
              return (
                <Icons.school className="h-[19px] w-[19px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.school?.name}
          </Callout>
          <Callout
            className="mt-4"
            title="Position"
            icon={() => {
              return (
                <Icons.athlete
                  className="h-[19px] w-[19px] mr-2"
                  color="teal"
                />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.position?.name} (
            {data?.athleteProfile?.position?.shortName})
          </Callout>
          <Callout
            className="mt-4 min-h-[75px]"
            title="Graduation Year"
            icon={() => {
              return (
                <Icons.graduationCap
                  className="h-[19px] w-[19px] mr-2"
                  color="teal"
                />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.graduationYear}
          </Callout>
          <Callout
            className="mt-4 min-h-[75px]"
            title="gpa"
            icon={() => {
              return (
                <Icons.presentation
                  className="h-[19px] w-[19px] mr-2"
                  color="teal"
                />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.gpa}
          </Callout>
          <Callout
            className="mt-4 min-h-[75px]"
            title="Huddle"
            icon={() => {
              return (
                <Icons.link className="h-[19px] w-[19px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            <input
              onClick={() => {
                if (data?.athleteProfile?.hudlLink as string) {
                  window.open(
                    data?.athleteProfile?.hudlLink as string,
                    "_blank"
                  );
                }
              }}
              className="border-none right-0 rounded-none bg-transparent w-full focus-visible:outline-none cursor-pointer focus-visible:ring-0"
              readOnly
              type="url"
              defaultValue={data?.athleteProfile?.hudlLink as string}
            />
          </Callout>
          <Callout
            className="mt-4 min-h-[75px]"
            title="Date of Birth"
            icon={() => {
              return (
                <Icons.cake className="h-[19px] w-[19px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            {data?.athleteProfile?.user?.dob &&
              formatDate(data?.athleteProfile?.user?.dob)}
          </Callout>
          <Callout
            className="mt-4"
            title="Country"
            icon={() => {
              return (
                <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            <span className="flex flex-row items-center">
              <>{data?.athleteProfile?.country?.name}</>
              {data?.athleteProfile?.country?.flag ? (
                <Image
                  alt="country_flag"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  quality={100}
                  priority
                  width={30}
                  height={30}
                  src={data?.athleteProfile?.country?.flag}
                  className="h-[30px] w-[30px] rounded-full ml-auto object-cover"
                />
              ) : null}
            </span>
          </Callout>
        </Card>
        {/* <SchoolCard
          loading={loading}
          school={data?.athleteProfile?.school as any}
        /> */}
      </Grid>
    </main>
  );
};

export default Page;
