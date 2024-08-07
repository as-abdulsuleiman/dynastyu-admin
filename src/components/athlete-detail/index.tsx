/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Text, Grid } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useDeleteFirebaseUserMutation,
  useDeleteUserMutation,
  useGetAggregateAthleteProfileLazyQuery,
  useGetUserQuery,
  useUpdateAthleteMutation,
} from "@/services/graphql";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  TiktokIcon,
  InstagramIcon,
  TwitterIcon,
  School2Icon,
  SchoolIcon,
  ClipboardEditIcon,
  WarehouseIcon,
  FileLineChartIcon,
  ScrollTextIcon,
  BadgeCheckIcon,
  BadgeAlertIcon,
  AthleteIcon,
  MailIcon,
  GraduationCapIcon,
  PresentationIcon,
  LinkIcon,
  CakeIcon,
  MapPinIcon,
  UserIcon,
  VerifiedIcon,
  MoreHorizontalIcon,
  StarIcon,
  LocateFixedIcon,
} from "@/components/Icons/index";
import ModalCard from "../modal";
import { Separator } from "../ui/separator";
import AthleteRecruitingContact from "../athlete-recruiting-contact";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import ProfileImage from "../profile-image";
import CalloutCard from "../callout";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import CardContainer from "../card-container";
import AthleteSkillCard from "../athlete-skill-card";
import { renderLoader } from "@/lib/loader-helper";
import { CalloutCardProps } from "@/interface/calloutOptions";
import PromptAlert from "../prompt-alert";
import AccessControl from "../accesscontrol";
import { getPermission } from "@/lib/helpers";
import { observer } from "mobx-react-lite";
interface AthleteDetailProps {
  params: {
    id: number;
  };
}

const AthleteDetail: FC<AthleteDetailProps> = ({ params }) => {
  const {
    authStore: { user },
    athleteStore: { setAthletes },
  } = useRootStore();
  const router = useRouter();
  const { toast } = useToast();
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [deletingProfile, setDeletingProfile] = useState<boolean>(false);
  const [updateAthlete] = useUpdateAthleteMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteFirebaseUser] = useDeleteFirebaseUserMutation();
  const [aggregateAthlete] = useGetAggregateAthleteProfileLazyQuery();

  const { data, loading, refetch } = useGetUserQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });
  const athleteData = data?.user;

  const permissionName = getPermission(
    user?.role?.permissions,
    "athletes.accesslevel.update"
  );

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
        <ClipboardEditIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Interested Schools",
      value: athleteData?._count?.interestedSchools || 0,
      color: "teal",
      icon: () => (
        <SchoolIcon className="mr-2.5 mb-[-6px] h-5 w-5 lucide lucide-school  stroke-teal-600" />
      ),
    },
    {
      name: "Prospected Schools",
      value: athleteData?._count?.prospectedSchools || 0,
      color: "teal",
      icon: () => (
        <School2Icon className="mr-2.5 mb-[-6px] h-5 w-5 lucide lucide-school-2 stroke-teal-600" />
      ),
    },
    {
      name: "Recruited Schools",
      value: athleteData?._count?.recruitedSchools || 0,
      color: "teal",
      icon: () => (
        <WarehouseIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Skills",
      value: athleteData?.athleteProfile?._count?.skills || 0,
      color: "teal",
      icon: () => (
        <FileLineChartIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Transcripts",
      value: athleteData?.athleteProfile?._count?.transcripts || 0,
      color: "teal",
      icon: () => (
        <ScrollTextIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
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

  const handleDeleteAthleteConfirmPrompt = async (item: any) => {
    setDeletingProfile(true);
    try {
      const res = await deleteUser({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      if (res?.data?.deleteOneUser) {
        await deleteFirebaseUser({
          variables: {
            data: {
              email: item?.email,
            },
          },
        });
        const athleteResp = await aggregateAthlete();
        setAthletes(athleteResp?.data as any);
        toast({
          title: "Athlete successfully deleted.",
          description: ` @${item?.username} profile has been deleted`,
          variant: "successfull",
        });
        router.push("/athletes");
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete athlete profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setDeletingProfile(false);
      setUpdatingProfile(null);
    }
  };

  const handleDeleteAthlete = () => {
    setUpdatingProfile(StatusEnum.DELETING);
  };

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
          error || "Could not successfully verify athlete. Please try again."
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
    {
      name: "Delete Profile",
      onClick: handleDeleteAthlete,
    },
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

  const calloutOptions: CalloutCardProps[] = [
    {
      color: "teal",
      type: "string",
      title: "Name",
      className: "mt-4 min-h-[75px]",
      icon: () => <UserIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: `${athleteData?.firstname} ${athleteData?.surname}`,
    },
    {
      color: "teal",
      type: "string",
      title: "Email",
      className: "mt-4 min-h-[75px]",
      icon: () => <MailIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: athleteData?.email,
    },
    {
      color: "teal",
      type: "string",
      title:
        athleteData?.athleteProfile?.school?.schoolType?.name || "High School",
      className: "mt-4",
      icon: () => (
        <SchoolIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: formattedSchoolName,
    },
    {
      color: "teal",
      type: "string",
      title: "Position",
      className: "mt-4",
      icon: () => (
        <AthleteIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: `${athleteData?.athleteProfile?.position?.name} (${athleteData?.athleteProfile?.position?.shortName})`,
    },
    {
      color: "teal",
      type: "string",
      title: "GraduationYear",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <GraduationCapIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: athleteData?.athleteProfile?.graduationYear,
    },
    {
      color: "teal",
      type: "string",
      title: "Gpa",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <PresentationIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: athleteData?.athleteProfile?.gpa,
    },
    {
      color: "teal",
      type: "link",
      title: "Huddle",
      className: "mt-4 min-h-[75px]",
      icon: () => <LinkIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: athleteData?.athleteProfile?.hudlLink,
    },
    {
      color: "teal",
      type: "string",
      title: "Date of Birth",
      className: "mt-4 min-h-[75px]",
      icon: () => <CakeIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: athleteData?.dob && formatDate(athleteData?.dob),
    },
    {
      color: "teal",
      type: "flag",
      title: "Country",
      className: "mt-4 min-h-[75px]",
      icon: () => (
        <MapPinIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: athleteData?.athleteProfile?.country?.name,
      flagUrl: athleteData?.athleteProfile?.country?.flag,
    },
    {
      color: "teal",
      type: "string",
      title: "State",
      className: "mt-4",
      icon: () => (
        <MapPinIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: athleteData?.state,
    },
    {
      color: "teal",
      type: "string",
      title: "city",
      className: "mt-4",
      icon: () => (
        <LocateFixedIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: athleteData?.city,
    },
  ];

  const renderCallout = () => {
    return (
      <>
        {calloutOptions?.map((item: CalloutCardProps, id: number) => {
          return (
            <CalloutCard
              key={id}
              color={item?.color as any}
              type={item?.type}
              title={item?.title}
              className={item?.className}
              icon={() => <>{item?.icon}</>}
              content={item?.content || "N/A"}
              flagUrl={item?.flagUrl}
            />
          );
        })}
        {socialAccounts?.map((val, index) => {
          return (
            <CalloutCard
              key={index}
              className="mt-4 min-h-[75px]"
              title={val?.name}
              icon={() => <>{val?.icon}</>}
              color="teal"
              type="link"
              content={val?.link || "N/A"}
            />
          );
        })}
      </>
    );
  };

  const renderBadges = (className: string) => {
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
          <div className={className}>
            <BadgeCard
              datatype={athleteData?.isActive ? "increase" : "decrease"}
              className="mb-2 xl:mb-0 ml-0 xl:ml-3"
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
              className="mb-2 xl:mb-0 ml-0 xl:ml-3"
              color={athleteData?.athleteProfile?.verified ? "sky" : "rose"}
              icon={() => {
                if (updatingProfile === StatusEnum.VERIFYING) {
                  return undefined;
                } else if (athleteData?.athleteProfile?.verified) {
                  return (
                    <BadgeCheckIcon className="h-4 w-4 mr-2" color="sky" />
                  );
                } else {
                  return (
                    <BadgeAlertIcon className="h-4 w-4 mr-2" color="rose" />
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
              className="ml-0 mr-0 xl:ml-3 xl:mr-3"
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

  const subHeaderItems = [
    {
      title: "Class of:",

      content: athleteData?.athleteProfile?.graduationYear || "N/A",
    },
    {
      title: "School:",
      content:
        `${athleteData?.athleteProfile?.position?.name} at ${athleteData?.athleteProfile?.school?.name}` ||
        "N/A",
    },
    {
      title: "Username:",
      content: `@${athleteData?.username?.toLowerCase()}` || "N/A",
    },
    {
      title: "UpdatedAt:",
      content:
        `${
          athleteData?.updatedAt
            ? formatDate(new Date(athleteData?.updatedAt), "MMMM dd yyyy")
            : ""
        }` || "N/A",
    },
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
            <ContentHeader
              title={`${athleteData?.firstname} ${athleteData?.surname}`}
              // icon={
              //   <AthleteIcon className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              // }
              subItems={subHeaderItems}
            />
          </div>
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
        <AthleteSkillCard
          athleteId={params?.id}
          loading={loading}
          athleteSkills={(data?.user?.athleteProfile?.skills as any) || []}
        />
        {/* <AthleteRecruitingContact
          loading={false}
          recruitingContact={recruitingContact}
        /> */}
      </Grid>
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <CardContainer className="p-2 md:p-4">
          <div className="flex flex-col items-center justify-start relative">
            <ModalCard
              isModal={true}
              isOpen={viewPlayerCardUrl}
              contentClass=" "
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
                  icon={<UserIcon className="h-8 w-8" />}
                />
              }
            >
              <ProfileImage
                imageUrl={athleteData?.avatar as string}
                alt={athleteData?.username?.toLowerCase() as string}
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
                  @{athleteData?.username?.toLowerCase()}
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
            <div className="xl:hidden ml-0 absolute left-0 top-0">
              <>{renderBadges("flex flex-col")}</>
            </div>
            <div className="ml-auto absolute right-0 top-0">
              <div className="flex flex-row items-center">
                <div className="hidden xl:flex xl:flex-row">
                  {renderBadges("flex flex-row items-center")}
                </div>
                {loading ? (
                  <Skeleton className="w-[40px] h-[35px]" />
                ) : (
                  <AccessControl name={permissionName}>
                    <MenubarCard
                      trigger={
                        <Button size="icon" variant="outline">
                          <MoreHorizontalIcon className="cursor-pointer" />
                        </Button>
                      }
                      items={dropdownItems}
                    />
                  </AccessControl>
                )}
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          {loading ? renderLoader() : renderCallout()}
        </CardContainer>
      </Grid>
      <ModalCard
        isModal={true}
        isOpen={viewAnalytics}
        contentClass="md:max-w-3xl lg:max-w-3xl xl:max-w-4xl"
        onOpenChange={() => setViewAnalytics(!viewAnalytics)}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <UsersAnalytics
              loading={loading}
              data={dataList}
              title={`${athleteData?.firstname} 
            ${athleteData?.surname} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
      <PromptAlert
        loading={deletingProfile}
        content={`This action will permanently delete @${athleteData?.username} from our servers.`}
        showPrompt={updatingProfile === StatusEnum.DELETING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
        }}
        handleConfirmPrompt={() =>
          handleDeleteAthleteConfirmPrompt(athleteData)
        }
      />
    </main>
  );
};

export default observer(AthleteDetail);
