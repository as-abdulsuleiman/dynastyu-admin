/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Title, Text, Grid } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useDeleteAthleteMutation,
  useDeleteUserMutation,
  useGetUserQuery,
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
import { useToast } from "@/hooks/use-toast";
import { useRootStore } from "@/mobx";
import RecruitedSchoolCard from "@/components/recruited-school-card";
import MenubarCard from "@/components/menubar";
import TwitterIcon from "@/components/Icons/twitter";
import InstagramIcon from "@/components/Icons/instagram";
import TiktokIcon from "@/components/Icons/tiktok";
import ModalCard from "../modal";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import VerifiedIcon from "@/components/Icons/verified";
import MoreHorizontal from "../Icons/more-horizontal";
import AthleteRecruitingContact from "../athlete-recruiting-contact";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";
import StarIcon from "../Icons/starIcon";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import ProfileImage from "../profile-image";
import CalloutCard from "../callout";
import BadgeCard from "../badge-card";
interface AthleteDetailProps {
  params: {
    id: number;
  };
}

const AthleteDetail: FC<AthleteDetailProps> = ({ params }) => {
  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();
  const { toast } = useToast();
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteAthlete] = useDeleteAthleteMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data, loading, refetch } = useGetUserQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const athleteData = data?.user;

  const socialAccounts = useMemo(() => {
    return athleteData?.athleteProfile?.socialAccounts?.map((val: any) => {
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
  }, [athleteData?.athleteProfile?.socialAccounts]);

  const dataList: any = [
    {
      name: "Evaluations",
      value: athleteData?.athleteProfile?._count?.evaluations || 0,
      color: "teal",
      icon: () => (
        <Icons.clipboardEdit className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Interested Schools",
      value: athleteData?._count?.interestedSchools || 0,
      color: "teal",
      icon: () => (
        <Icons.school className="mr-2.5 mb-[-6px] h-5 w-5 lucide lucide-school  stroke-teal-600" />
      ),
    },
    {
      name: "Prospected Schools",
      value: athleteData?._count?.prospectedSchools || 0,
      color: "teal",
      icon: () => (
        <Icons.school2 className="mr-2.5 mb-[-6px] h-5 w-5 lucide lucide-school-2 stroke-teal-600" />
      ),
    },
    {
      name: "Recruited Schools",
      value: athleteData?._count?.recruitedSchools || 0,
      color: "teal",
      icon: () => (
        <Icons.warehouse className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Skills",
      value: athleteData?.athleteProfile?._count?.skills || 0,
      color: "teal",
      icon: () => (
        <Icons.fileLineChart className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Transcripts",
      value: athleteData?.athleteProfile?._count?.transcripts || 0,
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
    setUpdatingProfile(StatusEnum.ACTIVATING);
    try {
      const isAthleteActive = item?.isActive;
      await updateAthlete({
        variables: {
          where: {
            id: item?.athleteProfile?.id,
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
      // await refetch();
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
          isAthleteActive ? "Deactivated" : "Activated"
        } `,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Athlete. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
    }
  };
  const followingId = athleteData?.following?.map((val: any) => {
    return {
      followerId_followingId: {
        followerId: val?.followerId,
        followingId: val?.followingId,
      },
    };
  });
  const followById = athleteData?.followedBy?.map((val: any) => {
    return {
      followerId_followingId: {
        followerId: val?.followerId,
        followingId: val?.followingId,
      },
    };
  });

  const recruitingContact = useMemo(() => {
    let newecruitingContact = [];
    newecruitingContact?.push({
      recruitingContactName: athleteData?.athleteProfile?.recruitingContactName,
      recruitingPhoneNumber: athleteData?.athleteProfile?.recruitingPhoneNumber,
      recruitingRelationship:
        athleteData?.athleteProfile?.recruitingRelationship,
    });
    return loading ? [] : newecruitingContact;
  }, [athleteData?.athleteProfile, loading]);

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
            id: params?.id,
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
    setUpdatingProfile(StatusEnum.VERIFYING);

    try {
      const isVerified = item?.athleteProfile?.verified;
      await updateAthlete({
        variables: {
          where: { id: item?.athleteProfile?.id },
          data: {
            verified: { set: !isVerified },
            verifiedBy: { connect: { id: user?.coachProfile?.id } },
          },
        },
      });
      toast({
        title: "Athlete profile successfully updated.",
        description: `${athleteData?.username} profile has been ${
          isVerified ? "Unverified" : "Verified"
        } `,
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
    } finally {
      setUpdatingProfile(null);
    }
  };

  const handleFeaturedAthlete = async (item: any) => {
    setUpdatingProfile(StatusEnum.FEATURING);

    try {
      const isAthleteFeatured = item?.athleteProfile?.featured;
      const resp = await updateAthlete({
        variables: {
          where: {
            id: item?.athleteProfile?.id,
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
          description: `@${item?.username} profile has been ${
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
    } finally {
      setUpdatingProfile(null);
    }
  };

  const dropdownItems = [
    {
      name: `Edit Profile`,
      onClick: () =>
        router.push(
          `/athletes/edit?athlete=${athleteData?.athleteProfile?.id}`,
          {
            scroll: true,
          }
        ),
    },
    {
      name: "View Skills",
      onClick: () => {
        router.push(`/skills?athlete=${athleteData?.athleteProfile?.id}`, {
          scroll: true,
        });
      },
    },
    {
      name: `${
        athleteData?.athleteProfile?.verified
          ? "Unverify Profile"
          : "Verify Profile"
      }`,
      onClick: () => handleVerifyAthlete(athleteData),
    },
    {
      name: `${athleteData?.isActive ? "Deactivate" : "Activate"} Profile`,
      onClick: () => handleActivateAthlete(athleteData),
    },
    {
      name: `${
        athleteData?.athleteProfile?.featured
          ? "Remove from featured"
          : "Add to featured"
      }`,
      onClick: () => handleFeaturedAthlete(athleteData),
    },
    {
      name: "View Analytics",
      onClick: () => setViewAnalytics(true),
    },
    // {
    //   name: "Delete Profile",
    //   onClick: async () => await handleDeleteAthlete(data?.athleteProfile),
    // },
    {
      name: "View Profile",
      onClick: () => {
        if (athleteData?.avatar) {
          setViewPlayerCardUrl(true);
        }
      },
    },
  ];

  if (athleteData?.athleteProfile?.schoolId) {
    dropdownItems.push({
      name: "View School",
      onClick: () =>
        router.push(`/school/${athleteData?.athleteProfile?.schoolId}`, {
          scroll: true,
        }),
    });
  }

  const formattedSchoolName = useMemo(() => {
    let formattedName;
    if (athleteData?.athleteProfile?.school) {
      if (athleteData?.athleteProfile?.school?.name) {
        formattedName = athleteData?.athleteProfile?.school?.name;
      }
      if (athleteData?.athleteProfile?.school?.city) {
        formattedName = `${formattedName}, ${athleteData?.athleteProfile?.school?.city}`;
      }
      if (athleteData?.athleteProfile?.school?.state) {
        formattedName = `${formattedName}, ${athleteData?.athleteProfile?.school?.state}`;
      }
    }
    return formattedName;
  }, [athleteData?.athleteProfile]);

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
            <BadgeCard
              datatype={athleteData?.isActive ? "increase" : "decrease"}
              className="ml-3"
              color={athleteData?.isActive ? "teal" : "rose"}
              icon={
                updatingProfile === StatusEnum.ACTIVATING
                  ? undefined
                  : athleteData?.isActive
                  ? StatusOnlineIcon
                  : StatusOfflineIcon
              }
            >
              {updatingProfile === StatusEnum.ACTIVATING
                ? "Updating..."
                : athleteData?.isActive
                ? "Active"
                : "Deactivated"}
            </BadgeCard>

            <BadgeCard
              datatype={
                updatingProfile === StatusEnum.VERIFYING
                  ? undefined
                  : athleteData?.athleteProfile?.verified
                  ? "increase"
                  : "decrease"
              }
              className="ml-3"
              color={athleteData?.athleteProfile?.verified ? "sky" : "rose"}
              icon={() => {
                if (updatingProfile === StatusEnum.VERIFYING) {
                  return undefined;
                } else if (athleteData?.athleteProfile?.verified) {
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
                : athleteData?.athleteProfile?.verified
                ? "Verified"
                : "Not Verified"}
            </BadgeCard>

            <BadgeCard
              datatype={
                athleteData?.athleteProfile?.featured ? "increase" : "decrease"
              }
              className="ml-3 mr-3"
              color={athleteData?.athleteProfile?.featured ? "yellow" : "rose"}
              icon={() => {
                if (updatingProfile === StatusEnum.FEATURING) {
                  return undefined;
                } else {
                  return <StarIcon className="h-4 w-4 mr-1" />;
                }
              }}
            >
              {updatingProfile === StatusEnum.FEATURING
                ? "Updating..."
                : athleteData?.athleteProfile?.featured
                ? "Featured"
                : "Not Featured"}
            </BadgeCard>
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
            <Title>
              {athleteData?.firstname} {athleteData?.surname}
            </Title>
            <Icons.athlete className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          </div>
          <Text>@{athleteData?.username}</Text>
          <Text>
            Class of:{" "}
            {athleteData?.athleteProfile?.graduationYear
              ? athleteData?.athleteProfile?.graduationYear
              : "N/A"}
          </Text>
          <Text>
            {athleteData?.athleteProfile?.position?.name
              ? `${athleteData?.athleteProfile?.position?.name} at`
              : ""}{" "}
            {athleteData?.athleteProfile?.school?.name}
          </Text>
        </div>
      )}
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <InterestedSchoolCard
          loading={loading}
          interestedSchools={
            (athleteData?._count?.interestedSchools as any) || []
          }
        />
        <RecruitedSchoolCard
          loading={loading}
          recruitedSchools={
            (athleteData?._count?.recruitedSchools as any) || []
          }
        />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <TranscriptCard
          loading={loading}
          transcripts={(athleteData?.athleteProfile?.transcripts as any) || []}
        />
        <AthleteRecruitingContact
          loading={false}
          recruitingContact={recruitingContact}
        />
      </Grid>
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-start relative">
              <ModalCard
                isModal={true}
                isOpen={viewPlayerCardUrl}
                onOpenChange={() => {
                  if (athleteData?.avatar) {
                    setViewPlayerCardUrl(!viewPlayerCardUrl);
                  }
                }}
                trigger={
                  <UserAvatar
                    className="h-[120px] w-[120px] shadow cursor-pointer"
                    height={120}
                    width={120}
                    type="image"
                    fallbackType="icon"
                    fallbackClassName={"h-[120px] w-[120px]"}
                    avatar={athleteData?.avatar as string}
                    fallback={`${athleteData?.firstname?.charAt(
                      0
                    )} ${athleteData?.surname?.charAt(0)}`}
                    icon={<Icons.user className="h-8 w-8" />}
                  />
                }
              >
                <ProfileImage
                  imageUrl={athleteData?.avatar as string}
                  alt={athleteData?.username as string}
                />
              </ModalCard>
              {loading ? (
                <div className="flex flex-row items-center">
                  <Skeleton className="w-[170px] h-[28px] mt-2 mr-1" />
                  <Skeleton className="w-[16.67px] h-[16.67px] mt-2 rounded-full" />
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center mt-1">
                  <Text className="text-base relative mr-1">
                    @{athleteData?.username}
                  </Text>
                  {athleteData?.athleteProfile?.verified ? (
                    <HoverCard
                      content={renderVerifiedBy(
                        athleteData?.athleteProfile?.verifiedBy
                      )}
                      trigger={<VerifiedIcon className="cursor-pointer" />}
                    />
                  ) : null}
                </div>
              )}
              <div className="ml-auto absolute right-0 top-0">
                <div className="flex flex-row items-center">
                  <>{renderBadges()}</>
                  {loading ? (
                    <Skeleton className="w-[40px] h-[35px]" />
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
            <CalloutCard
              color="teal"
              type="string"
              title="Name"
              className="mt-4 min-h-[75px]"
              icon={() => (
                <Icons.user className="h-[19px] w-[19px] mr-2" color="teal" />
              )}
              content={`${athleteData?.firstname} ${athleteData?.surname}`}
            />
            <CalloutCard
              color="teal"
              type="string"
              title="Email"
              className="mt-4 min-h-[75px]"
              content={athleteData?.email}
              icon={() => (
                <Icons.mail className="h-[19px] w-[19px] mr-2" color="teal" />
              )}
            />
            <CalloutCard
              color="teal"
              type="string"
              className="mt-4"
              title="High Scool"
              content={formattedSchoolName}
              icon={() => (
                <Icons.school className="h-[19px] w-[19px] mr-2" color="teal" />
              )}
            />
            <CalloutCard
              color="teal"
              type="string"
              className="mt-4"
              title="Position"
              icon={() => (
                <Icons.athlete
                  className="h-[19px] w-[19px] mr-2"
                  color="teal"
                />
              )}
              content={`${athleteData?.athleteProfile?.position?.name} (${athleteData?.athleteProfile?.position?.shortName})`}
            />
            <CalloutCard
              color="teal"
              type="string"
              className="mt-4 min-h-[75px]"
              title="Graduation Year"
              icon={() => (
                <Icons.graduationCap
                  className="h-[19px] w-[19px] mr-2"
                  color="teal"
                />
              )}
              content={athleteData?.athleteProfile?.graduationYear}
            />
            <CalloutCard
              title="gpa"
              color="teal"
              type="string"
              className="mt-4 min-h-[75px]"
              icon={() => (
                <Icons.presentation
                  className="h-[19px] w-[19px] mr-2"
                  color="teal"
                />
              )}
              content={athleteData?.athleteProfile?.gpa}
            />
            {athleteData?.athleteProfile?.hudlLink ? (
              <CalloutCard
                color="teal"
                type="link"
                className="mt-4 min-h-[75px]"
                title="Huddle"
                icon={() => (
                  <Icons.link className="h-[19px] w-[19px] mr-2" color="teal" />
                )}
                content={athleteData?.athleteProfile?.hudlLink}
              />
            ) : null}
            {socialAccounts?.map((val, index) => {
              return (
                <CalloutCard
                  key={index}
                  className="mt-4 min-h-[75px]"
                  title={val?.name}
                  icon={() => <> {val?.icon}</>}
                  color="teal"
                  type="link"
                  content={val?.link}
                />
              );
            })}
            <CalloutCard
              title="Date of Birth"
              color="teal"
              type="string"
              className="mt-4 min-h-[75px]"
              icon={() => (
                <Icons.cake className="h-[19px] w-[19px] mr-2" color="teal" />
              )}
              content={athleteData?.dob && formatDate(athleteData?.dob)}
            />
            <CalloutCard
              color="teal"
              type="flag"
              className="mt-4"
              title="Country"
              icon={() => (
                <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
              )}
              content={athleteData?.athleteProfile?.country?.name}
              flagUrl={athleteData?.athleteProfile?.country?.flag}
            />
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
              showFeatured={true}
              showVerified
              isVerified={athleteData?.athleteProfile?.verified || false}
              featured={athleteData?.athleteProfile?.featured || false}
              isActive={athleteData?.isActive || false}
              title={`${athleteData?.firstname} 
            ${athleteData?.surname} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
    </main>
  );
};

export default AthleteDetail;
