/** @format */

"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  GetSchoolQuery,
  useDeleteCoachMutation,
  useDeleteUserMutation,
  useGetCoachQuery,
  useUpdateCoachMutation,
} from "@/services/graphql";
import { Title, Divider, Text, Grid, Card, Callout } from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";
import { observer } from "mobx-react-lite";
import SchoolCard from "@/components/school-card";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import TooltipCard from "@/components/tooltip-card";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useToast } from "@/hooks/use-toast";

interface pageProps {
  params: {
    coachId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteCoach] = useDeleteCoachMutation();
  const [updateCoach] = useUpdateCoachMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { data, loading, refetch } = useGetCoachQuery({
    variables: {
      where: {
        id: Number(params?.coachId),
      },
    },
  });
  console.log("data", data?.coachProfile);

  const handleDeleteCoach = async (item: any) => {
    try {
      const response = await deleteCoach({
        variables: {
          where: {
            id: Number(params.coachId),
          },
        },
      });
      if (response.data?.deleteOneCoachProfile) {
        await deleteUser({
          variables: {
            where: {
              id: Number(item?.user?.id),
            },
          },
        });

        await refetch();
        toast({
          title: "Coach successfully deleted.",
          description: `@${item?.user?.username} account has been deleted.`,
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

  const handleActivateCoach = async (item: any) => {
    try {
      const isCoachActive = item?.user?.isActive;
      const resp = await updateCoach({
        variables: {
          where: {
            id: Number(params?.coachId),
          },
          data: {
            user: {
              update: {
                isActive: { set: !isCoachActive },
              },
            },
          },
        },
      });
      if (resp.data?.updateOneCoachProfile) {
        // await refetch();
        toast({
          title: "Coach successfully updated.",
          description: `@${item?.user?.username} has been ${
            isCoachActive ? "Deactivated" : "Activated"
          }`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Coach. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleVerifyCoach = async (item: any) => {
    try {
      const isVerified = item?.verified;
      const resp = await updateCoach({
        variables: {
          where: {
            id: Number(params.coachId),
          },
          data: {
            verified: {
              set: !isVerified,
            },
          },
        },
      });
      if (resp.data?.updateOneCoachProfile) {
        // await refetch();
        toast({
          title: "Coach successfully updated.",
          description: `${item?.user?.username} has been ${
            isVerified ? "Deactivated" : "Activated"
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

  const handleEditCoach = (item: any) => {
    router.push(`/coaches/edit?coach=${params?.coachId}`, { scroll: true });
  };

  const dropdownItems = [
    {
      name: `Edit Profile`,
      onclick: () => handleEditCoach(data?.coachProfile),
    },
    {
      name: `${
        data?.coachProfile?.verified ? "Unverify Profile" : "Verify Profile"
      }`,
      onclick: async () => await handleVerifyCoach(data?.coachProfile),
    },
    {
      name: `${
        data?.coachProfile?.user?.isActive ? "Deactivate" : "Activate"
      } Profile`,
      onclick: async () => await handleActivateCoach(data?.coachProfile),
    },
    {
      name: "Delete Profile",
      onclick: async () => await handleDeleteCoach(data?.coachProfile),
    },
  ];

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
            <div className="ml-0">
              <div className="flex flex-row items-center">
                <Title>
                  {data?.coachProfile?.user?.firstname}{" "}
                  {data?.coachProfile?.user?.surname}
                </Title>
                <Icons.whistle className="h-4 w-4 ml-2 fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis" />
              </div>
              <Text>
                {data?.coachProfile?.title} at{" "}
                {data?.coachProfile?.school?.name}
              </Text>
            </div>
            <div className="ml-auto hidden">
              <Button
                variant="ghost"
                onClick={() => handleEditCoach(data?.coachProfile)}
              >
                Edit Profile
              </Button>
            </div>
          </div>
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
          <div className="flex flex-col items-center justify-center relative">
            <UserAvatar
              className="h-[120px] w-[120px] shadow"
              height={120}
              width={120}
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
            title="Country"
            icon={() => {
              return (
                <Icons.pin className="h-[20px] w-[20px] mr-2" color="teal" />
              );
            }}
            color="teal"
          >
            <span className="flex flex-row items-center">
              <>{data?.coachProfile?.country?.name}</>
              {data?.coachProfile?.country?.flag ? (
                <Image
                  alt="country_flag"
                  width={30}
                  height={30}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  quality={100}
                  priority
                  src={data?.coachProfile?.country?.flag}
                  className="h-[30px] w-[30px] rounded-full ml-auto object-cover"
                />
              ) : null}

              {/*             
              <img
                
                className="h-[30px] w-[30px] rounded-full ml-auto"
              /> */}
            </span>
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
