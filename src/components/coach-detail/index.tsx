/** @format */

"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteCoachMutation,
  useDeleteUserMutation,
  useGetCoachQuery,
  useGetUserQuery,
  useUpdateCoachMutation,
} from "@/services/graphql";
import { Title, Text, Grid, Callout, Badge } from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import TooltipCard from "@/components/tooltip-card";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import MenubarCard from "@/components/menubar";
import ModalCard from "../modal";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import MoreHorizontal from "../Icons/more-horizontal";
import VerifiedIcon from "@/components/Icons/verified";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";

interface CoachDetailProps {
  params: {
    id: number;
  };
}

const CoachDetail: FC<CoachDetailProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showimage, setShowImage] = useState(true);
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [deleteCoach] = useDeleteCoachMutation();
  const [updateCoach] = useUpdateCoachMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { data, loading, refetch } = useGetUserQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const coachData = data?.user;

  const handleDeleteCoach = async (item: any) => {
    setUpdatingProfile(StatusEnum.DELETING);
    try {
      const response = await deleteCoach({
        variables: {
          where: {
            id: item?.coachProfile?.id,
          },
        },
      });
      if (response.data?.deleteOneCoachProfile) {
        await deleteUser({
          variables: {
            where: {
              id: item?.id,
            },
          },
        });
        await refetch();
        toast({
          title: "Profile successfully deleted.",
          description: `@${item?.username} account has been deleted.`,
          variant: "successfull",
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
    } finally {
      setUpdatingProfile(null);
    }
  };

  const handleActivateCoach = async (item: any) => {
    setUpdatingProfile(StatusEnum.ACTIVATING);
    try {
      const isCoachActive = item?.isActive;
      await updateCoach({
        variables: {
          where: {
            id: item?.coachProfile?.id,
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
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          isCoachActive ? "deactivated" : "activated"
        }`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
    }
  };

  const handleVerifyCoach = async (item: any) => {
    setUpdatingProfile(StatusEnum.VERIFYING);
    try {
      const isVerified = item?.coachProfile?.verified;
      await updateCoach({
        variables: {
          where: {
            id: item?.coachProfile?.id,
          },
          data: {
            verified: {
              set: !isVerified,
            },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          !isVerified ? "verified" : "unverified"
        } `,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
    }
  };

  const handleEditCoach = (item: any) => {
    router.push(`/coaches/edit?coach=${item?.coachProfile?.id}`, {
      scroll: true,
    });
  };

  const dropdownItems = [
    {
      name: `Edit Profile`,
      onClick: () => handleEditCoach(coachData),
    },
    {
      name: `${
        coachData?.coachProfile?.verified
          ? "Unverify Profile"
          : "Verify Profile"
      }`,
      onClick: async () => await handleVerifyCoach(coachData),
    },
    {
      name: `View School`,
      onClick: () =>
        router.push(`/school/${coachData?.coachProfile?.schoolId}`, {
          scroll: true,
        }),
    },
    {
      name: `${coachData?.isActive ? "Deactivate" : "Activate"} Profile`,
      onClick: async () => await handleActivateCoach(coachData),
    },
    {
      name: "View Profile Picture",
      onClick: () => setViewPlayerCardUrl(true),
    },
    {
      name: "View User Analytics",
      onClick: () => setViewAnalytics(true),
    },
    // {
    //   name: "Delete Profile",
    //   onClick: async () => await handleDeleteCoach(coachData),
    // },
  ];

  const dataList: any = [
    {
      name: "Following",
      value: coachData?._count?.following || 0,
      color: "teal",
      icon: () => (
        <Icons.users2 className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Follwers",
      value: coachData?._count?.followedBy || 0,
      color: "teal",
      icon: () => (
        <Icons.usersRound className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      color: "teal",
      value: coachData?._count?.posts || 0,
      icon: () => (
        <Icons.fileImage className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Verified Athletes",
      color: "teal",
      value: coachData?.coachProfile?._count?.verifiedAthletes || 0,
      icon: () => (
        <Icons.athlete className="mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600" />
      ),
    },

    {
      name: "Reposts",
      value: coachData?._count?.reposts || 0,
      icon: () => (
        <Icons.switchCamera className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Interested Schools",
      value: coachData?._count?.interestedSchools || 0,
      icon: () => (
        <Icons.school className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Evaluations Created",
      color: "teal",
      value: coachData?._count?.evaluationsCreated || 0,
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Comments",
      color: "teal",
      value: coachData?._count?.comments || 0,
      icon: () => (
        <Icons.messageCircleCode className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
  ];

  const renderBadges = () => {
    return (
      <>
        {loading ? (
          <>
            {Array.from([1, 2, 3]).map((a, i) => {
              return (
                <Skeleton
                  key={i}
                  className={`w-[80px] h-[20px] flex flex-row ml-3 rounded-xl ${
                    i === 2 ? "mr-3" : ""
                  }`}
                />
              );
            })}
          </>
        ) : (
          <div className="hidden lg:flex lg:flex-row lg:items-center">
            <Badge
              datatype={coachData?.isActive ? "increase" : "decrease"}
              className="flex flex-row  text-sm font-TTHovesRegular pl-3"
              color={coachData?.isActive ? "teal" : "rose"}
              icon={
                updatingProfile === StatusEnum.ACTIVATING
                  ? undefined
                  : coachData?.isActive
                  ? StatusOnlineIcon
                  : StatusOfflineIcon
              }
            >
              {updatingProfile === StatusEnum.ACTIVATING
                ? "Updating..."
                : coachData?.isActive
                ? "Active"
                : "Deactivated"}
            </Badge>
            <Badge
              datatype={
                updatingProfile === StatusEnum.VERIFYING
                  ? undefined
                  : coachData?.coachProfile?.verified
                  ? "increase"
                  : "decrease"
              }
              className="flex flex-row ml-3 mr-3"
              color={coachData?.coachProfile?.verified ? "sky" : "rose"}
              icon={() => {
                if (updatingProfile === StatusEnum.VERIFYING) {
                  return undefined;
                } else if (coachData?.coachProfile?.verified) {
                  return (
                    <Icons.badgeCheck className="h-4 w-4 mr-2" color="sky" />
                  );
                } else {
                  return (
                    <Icons.badgeAlert className="h-4 w-4 mr-2" color="rose" />
                  );
                }
              }}
            >
              {updatingProfile === StatusEnum.VERIFYING
                ? "Updating..."
                : coachData?.coachProfile?.verified
                ? "Verified"
                : "Not Verified"}
            </Badge>
          </div>
        )}
      </>
    );
  };

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
                  {coachData?.firstname} {coachData?.surname}
                </Title>
                <Icons.whistle className="h-4 w-4 ml-2 fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis" />
              </div>
              <Text>
                {coachData?.coachProfile?.title} at{" "}
                {coachData?.coachProfile?.school?.name}
              </Text>
            </div>
            <div className="ml-auto hidden">
              <Button
                variant="ghost"
                onClick={() => handleEditCoach(coachData)}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      )}
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center relative">
              <ModalCard
                isModal={true}
                isOpen={viewPlayerCardUrl}
                onOpenChange={() => setViewPlayerCardUrl(!viewPlayerCardUrl)}
                trigger={
                  <UserAvatar
                    className="h-[120px] w-[120px] shadow cursor-pointer"
                    height={120}
                    width={120}
                    type="image"
                    fallbackType="icon"
                    fallbackClassName={"h-[120px] w-[120px]"}
                    avatar={coachData?.avatar as string}
                    fallback={`${coachData?.username?.charAt(
                      0
                    )} ${coachData?.firstname?.charAt(0)}`}
                    icon={<Icons.user className="h-8 w-8" />}
                  />
                }
              >
                <AspectRatio ratio={16 / 16} className="cursor-pointer">
                  <Image
                    onLoadingComplete={() => setShowImage(false)}
                    priority
                    fill
                    sizes="100vw"
                    quality={80}
                    src={coachData?.avatar as string}
                    alt=""
                    className={`rounded-2xl object-cover border-[#717070] border-[0.1px] relative ${
                      showimage ? "blur-sm " : "blur-none"
                    }`}
                  />
                </AspectRatio>
              </ModalCard>

              {loading ? (
                <div className="flex flex-row items-center">
                  <Skeleton className="w-[120px] h-[25px] mt-2 mr-1" />
                  <Skeleton className="w-[24px] h-[24px] mt-2 rounded-full" />
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center">
                  <Text className="text-sm relative mr-1">
                    @{coachData?.username}
                  </Text>
                  {coachData?.coachProfile?.verified ? (
                    <TooltipCard
                      message="Verified"
                      trigger={<VerifiedIcon className="cursor-pointer" />}
                    />
                  ) : null}
                </div>
              )}
              <div className="ml-auto absolute right-0 top-0">
                <div className="flex flex-row items-center">
                  {renderBadges()}
                  {loading ? (
                    <Skeleton className="w-[40px] h-[20px]" />
                  ) : (
                    <MenubarCard
                      trigger={
                        <Button size="icon" variant="outline">
                          <MoreHorizontal className="cursor-pointer" />
                        </Button>
                      }
                      items={dropdownItems}
                    />
                  )}
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <Callout
              className="mt-4"
              title="Name"
              icon={() => {
                return <Icons.user className="h-5 w-5" color="teal" />;
              }}
              color="teal"
            >
              {coachData?.firstname} {coachData?.surname}
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
              {coachData?.email}
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
              {coachData?.coachProfile?.title}
            </Callout>
            <Callout
              className="mt-4"
              title="High Scool"
              icon={() => {
                return (
                  <Icons.school
                    className="h-[19px] w-[19px] mr-2"
                    color="teal"
                  />
                );
              }}
              color="teal"
            >
              {coachData?.coachProfile?.school?.name}
            </Callout>
            <Callout
              className="mt-4"
              title="Country"
              icon={() => {
                return (
                  <Icons.mapPin
                    className="h-[20px] w-[20px] mr-2"
                    color="teal"
                  />
                );
              }}
              color="teal"
            >
              <span className="flex flex-row items-center">
                <>{coachData?.coachProfile?.country?.name}</>
                {coachData?.coachProfile?.country?.flag ? (
                  <Image
                    alt="country_flag"
                    width={30}
                    height={30}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    quality={100}
                    priority
                    src={coachData?.coachProfile?.country?.flag}
                    className="h-[30px] w-[30px] rounded-full ml-auto object-cover"
                  />
                ) : null}
              </span>
            </Callout>
            <Callout
              className="mt-4"
              title="State"
              icon={() => {
                return (
                  <Icons.mapPin
                    className="h-[20px] w-[20px] mr-2"
                    color="teal"
                  />
                );
              }}
              color="teal"
            >
              {coachData?.coachProfile?.state}
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
              {coachData?.coachProfile?.city}
            </Callout>
          </CardContent>
        </Card>
      </Grid>
      <ModalCard
        isModal={true}
        isOpen={viewAnalytics}
        onOpenChange={() => setViewAnalytics(!viewAnalytics)}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <UsersAnalytics
              loading={loading}
              data={dataList}
              showStatus={true}
              showVerified
              isVerified={coachData?.coachProfile?.verified || false}
              isActive={coachData?.isActive || false}
              title={`${coachData?.firstname} 
          ${coachData?.surname} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
    </main>
  );
};

export default CoachDetail;
