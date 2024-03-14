/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Divider, Title, Text, Card, Grid, Callout } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useDeleteAthleteMutation,
  useDeleteUserMutation,
  useGetAthleteProfileQuery,
  useUpdateAthleteMutation,
  useUpdateUserMutation,
} from "@/services/graphql";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/Icons";
import UsersAnalytics from "@/components/analytics/users";
import UserAvatar from "@/components/user-avatar";
import { formatDate } from "@/lib/utils";
import TranscriptCard from "@/components/transcript-card";
import HoverCard from "@/components/hover-card";
import InterestedSchoolCard from "@/components/interested-school-card";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRootStore } from "@/mobx";
import RecruitedSchoolCard from "@/components/recruited-school-card";
import AthleteSkillCard from "@/components/athlete-skill-card";
import MenubarCard from "@/components/menubar";
import TwitterIcon from "@/components/Icons/twitter";
import InstagramIcon from "@/components/Icons/instagram";
import TiktokIcon from "@/components/Icons/tiktok";
import ModalCard from "../modal";
import { AspectRatio } from "../ui/aspect-ratio";

interface AthleteDetailProps {
  params: {
    athleteId: string;
  };
}

const AthleteDetail: FC<AthleteDetailProps> = ({ params }) => {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();
  const { toast } = useToast();
  const [showimage, setShowImage] = useState(true);
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteAthlete] = useDeleteAthleteMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data, loading, refetch } = useGetAthleteProfileQuery({
    variables: {
      where: {
        id: Number(params?.athleteId),
      },
    },
  });

  const socialAccounts = useMemo(() => {
    return data?.athleteProfile?.socialAccounts?.map((val: any) => {
      if (val?.type === "INSTAGRAM") {
        return {
          ...val,
          name: "Instagram",
          icon: (
            <InstagramIcon className="h-[19px] w-[19px] mr-2" color="teal" />
          ),
        };
      } else if (val?.type === "TWITTER") {
        return {
          ...val,
          name: "Twitter",
          icon: <TwitterIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
        };
      } else if (val?.type === "TIKTOK")
        return {
          ...val,
          name: "Tiktok",
          icon: <TiktokIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
        };
    });
  }, [data?.athleteProfile?.socialAccounts]);

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
      if (resp?.data?.updateOneAthleteProfile) {
        // await refetch();
        toast({
          title: "Profile successfully updated.",
          description: `@${item?.user?.username} profile has been ${
            isAthleteActive ? "Deactivated" : "Activated"
          } `,
          variant: "successfull",
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
  const followingId = data?.athleteProfile?.user?.following?.map((val: any) => {
    return {
      followerId_followingId: {
        followerId: val?.followerId,
        followingId: val?.followingId,
      },
    };
  });
  const followById = data?.athleteProfile?.user?.followedBy?.map((val: any) => {
    return {
      followerId_followingId: {
        followerId: val?.followerId,
        followingId: val?.followingId,
      },
    };
  });

  const handleDeleteAthlete = async (item: any) => {
    try {
      await updateUser({
        variables: {
          where: {
            id: item?.userId,
          },
          data: {
            followedBy: {
              delete: followById,
            },
            following: {
              delete: followingId,
            },
          },
        },
      });
      const response = await deleteAthlete({
        variables: {
          where: {
            id: params?.athleteId,
          },
        },
      });
      if (response.data?.deleteOneAthleteProfile) {
        const userRes = await deleteUser({
          variables: {
            where: {
              id: item?.userId,
            },
          },
        });
        await refetch();
        if (userRes.data?.deleteOneUser) {
          router.push(`/athletes`);
        }
        toast({
          title: "Athlete successfully deleted.",
          description: `@${item?.user?.username} account has been deleted.`,
          variant: "successfull",
        });
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
          where: { id: params?.athleteId },
          data: {
            verified: { set: !isVerified },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      toast({
        title: "Athlete profile successfully updated.",
        description: `${
          data?.athleteProfile?.user?.username
        } profile has been ${isVerified ? "Unverified" : "Verified"} `,
        variant: "successfull",
      });
      // if (resp?.data?.updateOneAthleteProfile) {
      //   // await refetch();

      // }
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

  const handleFeaturedAthlete = async (item: any) => {
    try {
      const isAthleteFeatured = item?.featured;
      const resp = await updateAthlete({
        variables: {
          where: {
            id: Number(params?.athleteId),
          },
          data: {
            featured: { set: !isAthleteFeatured },
          },
        },
      });
      if (resp.data?.updateOneAthleteProfile) {
        // await refetch();
        toast({
          title: "Profile successfully updated.",
          description: `@${item?.user?.username} profile has been ${
            !isAthleteFeatured ? "added to featured" : "removed from featured"
          } `,
          variant: "successfull",
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

  const dropdownItems = [
    {
      name: `Edit Profile`,
      onClick: () =>
        router.push(`/athletes/edit?athlete=${Number(params?.athleteId)}`, {
          scroll: true,
        }),
    },
    {
      name: `${
        data?.athleteProfile?.verified ? "Unverify Profile" : "Verify Profile"
      }`,
      onClick: () => handleVerifyAthlete(data?.athleteProfile),
    },
    {
      name: `${
        data?.athleteProfile?.user?.isActive ? "Deactivate" : "Activate"
      } Profile`,
      onClick: () => handleActivateAthlete(data?.athleteProfile),
    },
    {
      name: `${
        data?.athleteProfile?.featured
          ? "Remove from featured"
          : "Add to featured"
      }`,
      onClick: () => handleFeaturedAthlete(data?.athleteProfile),
    },
    {
      name: "View School",
      onClick: () =>
        router.push(`/school/${data?.athleteProfile?.schoolId}`, {
          scroll: true,
        }),
    },
    // {
    //   name: "Delete Profile",
    //   onClick: async () => await handleDeleteAthlete(data?.athleteProfile),
    // },
    {
      name: "View Profile Picture",
      onClick: () => setViewPlayerCardUrl(true),
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
        showFeatured={true}
        showVerified
        isVerified={data?.athleteProfile?.verified || false}
        featured={data?.athleteProfile?.featured || false}
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
        <AthleteSkillCard
          athleteId={params?.athleteId}
          loading={loading}
          athleteSkills={(data?.athleteProfile?.skills as any) || []}
        />
      </Grid>
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <Card className="bg-background dark:bg-dark-background">
          <div className="flex flex-col items-center justify-start relative">
            <ModalCard
              isModal={true}
              isOpen={viewPlayerCardUrl}
              onOpenChange={() => setViewPlayerCardUrl(!viewPlayerCardUrl)}
              contentClass="container mx-auto max-w-2xl rounded-2xl bg-primary-black bg-gradient-to-bl from-primary-black via-primary-black/5 to-primary-black px-[16px] md:px-[2rem] py-[2rem]"
              trigger={
                <UserAvatar
                  className="h-[120px] w-[120px] shadow cursor-pointer"
                  height={120}
                  width={120}
                  fallbackType="icon"
                  fallbackClassName={"h-[120px] w-[120px]"}
                  avatar={data?.athleteProfile?.user.avatar as string}
                  fallback={`${data?.athleteProfile?.user?.firstname?.charAt(
                    0
                  )} ${data?.athleteProfile?.user?.surname?.charAt(0)}`}
                  icon={<Icons.user className="h-8 w-8" />}
                />
              }
              content={
                <AspectRatio ratio={16 / 16} className="cursor-pointer">
                  <Image
                    onLoadingComplete={() => setShowImage(false)}
                    priority
                    fill
                    sizes="100vw"
                    quality={80}
                    src={data?.athleteProfile?.user?.avatar as string}
                    alt="profile_picture"
                    className={`rounded-2xl object-cover border-[#717070] border-[0.1px] relative ${
                      showimage ? "blur-sm " : "blur-none"
                    }`}
                  />
                </AspectRatio>
              }
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
              {loading ? (
                <Skeleton className="w-[40px] h-[20px]" />
              ) : (
                <MenubarCard
                  trigger={<Icons.moreHorizontal className="cursor-pointer" />}
                  items={dropdownItems}
                />
              )}
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
          {data?.athleteProfile?.hudlLink ? (
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
          ) : null}
          {socialAccounts?.map((val, index) => {
            return (
              <Callout
                key={index}
                className="mt-4 min-h-[75px]"
                title={val?.name}
                icon={() => {
                  return <> {val?.icon}</>;
                }}
                color="teal"
              >
                <input
                  onClick={() => {
                    window.open(val?.link as string, "_blank");
                  }}
                  className="border-none right-0 rounded-none bg-transparent w-full focus-visible:outline-none cursor-pointer focus-visible:ring-0"
                  readOnly
                  type="url"
                  defaultValue={val?.link}
                />
              </Callout>
            );
          })}
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
      </Grid>
    </main>
  );
};

export default AthleteDetail;
