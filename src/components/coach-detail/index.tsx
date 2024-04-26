/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  QueryMode,
  SortOrder,
  useDeleteCoachMutation,
  useDeleteUserMutation,
  useGetSchoolsQuery,
  useGetUserQuery,
  useUpdateCoachMutation,
} from "@/services/graphql";
import { Text, Grid } from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";
import {
  VerifiedIcon,
  MoreHorizontalIcon,
  Users2Icon,
  UsersRoundIcon,
  FileImageIcon,
  AthleteIcon,
  SwitchCameraIcon,
  SchoolIcon,
  ClipboardEditIcon,
  MessageCircleCodeIcon,
  MailIcon,
  TagsIcon,
  MapPinIcon,
  LocateFixedIcon,
  BadgeCheckIcon,
  BadgeAlertIcon,
  WhistleIcon,
  UserIcon,
} from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import TooltipCard from "@/components/tooltip-card";
import { useToast } from "@/hooks/use-toast";
import MenubarCard from "@/components/menubar";
import ModalCard from "../modal";
import { Separator } from "../ui/separator";
import {
  PromptStatusEnum,
  StatusEnum,
} from "@/lib/enums/updating-profile.enum";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";
import ProfileImage from "../profile-image";
import ComboboxCard from "../combobox-card";
import { useDebouncedValue } from "@mantine/hooks";
import { CheckIcon, User } from "lucide-react";
import { CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import PromptAlert from "../prompt-alert";
import CalloutCard from "../callout";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import CardContainer from "../card-container";
import { renderLoader } from "@/lib/loader-helper";
import { ICallOutOptions } from "../interface/calloutOptions";

interface CoachDetailProps {
  params: {
    id: number;
  };
}

const CoachDetail: FC<CoachDetailProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [openSchool, setOpenSchool] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<any | number>({});
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [promptStatus, setPromptStatus] = useState<PromptStatusEnum | null>();
  const [IsAddingSchool, setIsAddingSchool] = useState<boolean>(false);
  const [deletingSkillType, setDeletingSkillType] = useState(false);

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

  const coachSchoolId = useMemo(() => {
    if (coachData?.coachProfile?.schoolId) {
      return {
        id: {
          not: {
            equals: coachData?.coachProfile?.schoolId,
          },
        },
      };
    } else {
      return {};
    }
  }, [coachData?.coachProfile]);

  const { data: schoolData, loading: loadingSchool } = useGetSchoolsQuery({
    variables: {
      where: {
        ...coachSchoolId,
        OR: [
          { name: { contains: debounced, mode: QueryMode.Insensitive } },
          { email: { contains: debounced, mode: QueryMode.Insensitive } },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const schoolDataOptions = useMemo(() => {
    return (
      schoolData?.schools.map((school) => {
        let schoolLoaction;
        if (school) {
          if (school?.city) {
            schoolLoaction = school?.city;
          }
          if (school?.state) {
            schoolLoaction = `${schoolLoaction}, ${school?.state}`;
          }
        }
        return {
          label: `${school?.name}${schoolLoaction ? "," : ""} ${
            schoolLoaction || ""
          }`,
          value: school?.name,
          id: school?.id,
          logo: school?.logo,
          city: school?.city,
          state: school?.state,
        };
      }) || []
    );
  }, [schoolData?.schools]);

  const handleDeleteCaochConfirmPrompt = async (userId: number) => {
    setDeletingSkillType(true);

    try {
      await deleteUser({
        variables: {
          where: {
            id: userId,
          },
        },
      });
      toast({
        title: "Profile successfully deleted.",
        description: `@${coachData?.username} account has been deleted.`,
        variant: "successfull",
      });
      router.push("/coaches");
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
      setDeletingSkillType(false);
    }
  };

  const handleDeleteCoach = () => {
    setUpdatingProfile(StatusEnum.DELETING);
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

  const handleAddCoachToSchool = async (school: any) => {
    setIsAddingSchool(true);
    try {
      await updateCoach({
        variables: {
          where: { id: coachData?.coachProfile?.id },
          data: {
            school: {
              connect: {
                id: school?.id,
              },
            },
          },
        },
      });
      refetch();
      toast({
        title: "School successfully added.",
        description: `@${coachData?.username} has successfully been added ${school?.value}`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully add coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsAddingSchool(false);
      setPromptStatus(null);
      setSelectedSchool({});
      setSearchValue("");
    }
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
      name: `${coachData?.isActive ? "Deactivate" : "Activate"} Profile`,
      onClick: async () => await handleActivateCoach(coachData),
    },
    {
      name: "View Profile",
      onClick: () => {
        if (coachData?.avatar) {
          setViewPlayerCardUrl(true);
        }
      },
    },
    {
      name: "View Analytics",
      onClick: () => setViewAnalytics(true),
    },
    // {
    //   name: "Delete Profile",
    //   onClick: handleDeleteCoach,
    // },
  ];
  if (coachData?.coachProfile?.schoolId) {
    dropdownItems.push({
      name: `View School`,
      onClick: () =>
        router.push(`/school/${coachData?.coachProfile?.schoolId}`, {
          scroll: true,
        }),
    });
  }

  const dataList: any = [
    {
      name: "Following",
      value: coachData?._count?.following || 0,
      color: "teal",
      icon: () => (
        <Users2Icon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },

    {
      name: "Follwers",
      value: coachData?._count?.followedBy || 0,
      color: "teal",
      icon: () => (
        <UsersRoundIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      color: "teal",
      value: coachData?._count?.posts || 0,
      icon: () => (
        <FileImageIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Verified Athletes",
      color: "teal",
      value: coachData?.coachProfile?._count?.verifiedAthletes || 0,
      icon: () => (
        <AthleteIcon className="mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600" />
      ),
    },

    {
      name: "Reposts",
      value: coachData?._count?.reposts || 0,
      icon: () => (
        <SwitchCameraIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Interested Schools",
      value: coachData?._count?.interestedSchools || 0,
      icon: () => (
        <SchoolIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Evaluations Created",
      color: "teal",
      value: coachData?._count?.evaluationsCreated || 0,
      icon: () => (
        <ClipboardEditIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Comments",
      color: "teal",
      value: coachData?._count?.comments || 0,
      icon: () => (
        <MessageCircleCodeIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
  ];

  const formattedSchoolName = useMemo(() => {
    let formattedName;
    if (coachData?.coachProfile?.school) {
      if (coachData?.coachProfile?.school?.name) {
        formattedName = coachData?.coachProfile?.school?.name;
      }
      if (coachData?.coachProfile?.school?.city) {
        formattedName = `${formattedName}, ${coachData?.coachProfile?.school?.city}`;
      }
      if (coachData?.coachProfile?.school?.state) {
        formattedName = `${formattedName}, ${coachData?.coachProfile?.school?.state}`;
      }
    }
    return formattedName;
  }, [coachData?.coachProfile?.school]);

  const formattedCoachTitle = useMemo(() => {
    let formattedTitle;
    if (coachData?.coachProfile) {
      if (coachData?.coachProfile?.title) {
        formattedTitle = coachData?.coachProfile?.title;
      }
      if (coachData?.coachProfile?.school?.name) {
        formattedTitle = `${formattedTitle} at ${coachData?.coachProfile?.school?.city}`;
      }
    }
    return formattedTitle;
  }, [coachData?.coachProfile]);

  const calloutOptions: ICallOutOptions[] = [
    {
      color: "teal",
      type: "string",
      title: "Name",
      className: "mt-4",
      icon: () => <UserIcon className="h-5 w-5" color="teal" />,
      content: `${coachData?.firstname} ${coachData?.surname}`,
    },
    {
      color: "teal",
      type: "string",
      title: "Email",
      className: "mt-4",
      icon: () => <MailIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: coachData?.email?.toLowerCase(),
    },
    {
      color: "teal",
      type: "string",
      title: "Coach Title",
      className: "mt-4",
      icon: () => <TagsIcon className="h-[20px] w-[20px] mr-2" color="teal" />,
      content: coachData?.coachProfile?.title,
    },
    {
      color: "teal",
      type: "string",
      title: coachData?.coachProfile?.school?.schoolType?.name || "High School",
      className: "mt-4",
      icon: () => (
        <SchoolIcon className="h-[19px] w-[19px] mr-2" color="teal" />
      ),
      content: formattedSchoolName,
    },
    {
      color: "teal",
      type: "flag",
      title: "Country",
      className: "mt-4",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: coachData?.coachProfile?.country?.name,
      flagUrl: coachData?.coachProfile?.country?.flag,
    },
    {
      color: "teal",
      type: "string",
      title: "State",
      className: "mt-4",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: coachData?.coachProfile?.state,
    },
    {
      color: "teal",
      type: "string",
      title: "City",
      className: "mt-4",
      icon: () => (
        <LocateFixedIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: coachData?.coachProfile?.city,
    },
  ];

  const renderCallout = () => {
    return (
      <>
        {calloutOptions?.map((item: ICallOutOptions, id) => {
          return (
            <div key={id}>
              <CalloutCard
                color={item?.color as any}
                type={item?.type}
                title={item?.title}
                className={item?.className}
                icon={() => <>{item?.icon}</>}
                content={item?.content}
                flagUrl={item?.flagUrl}
              />
            </div>
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
              datatype={coachData?.isActive ? "increase" : "decrease"}
              className="mb-2 xl:mb-0 pl-3 xl:pl-3"
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
            </BadgeCard>
            <BadgeCard
              datatype={
                updatingProfile === StatusEnum.VERIFYING
                  ? undefined
                  : coachData?.coachProfile?.verified
                  ? "increase"
                  : "decrease"
              }
              className="ml-0 xl:ml-3  xl:mr-3 "
              color={coachData?.coachProfile?.verified ? "sky" : "rose"}
              icon={() => {
                if (updatingProfile === StatusEnum.VERIFYING) {
                  return undefined;
                } else if (coachData?.coachProfile?.verified) {
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
                : coachData?.coachProfile?.verified
                ? "Verified"
                : "Not Verified"}
            </BadgeCard>
          </div>
        )}
      </>
    );
  };

  const CustomSchoolItems = ({ item, id }: { item: any; id: number }) => {
    let schoolLoaction;
    if (item) {
      if (item?.city) {
        schoolLoaction = item?.city;
      }
      if (item?.state) {
        schoolLoaction = `${schoolLoaction}, ${item?.state}`;
      }
    }
    return (
      <CommandItem
        className="capitalize cursor-pointer"
        key={item?.id || id}
        value={selectedSchool}
        onSelect={() => {
          setSelectedSchool({ value: item?.value, id: item?.id });
          setOpenSchool(false);
        }}
      >
        <div className="flex items-center">
          <UserAvatar
            fallbackClassName="h-[55px] w-[55px]"
            className="h-[55px] w-[55px] shadow mr-4 "
            fallbackType="name"
            avatar={item?.avatar as string}
            fallback={`${item?.label?.charAt(0)} `}
          />
          <div>
            <div className="text-sm mb-0.5">{item?.label}</div>
            <div className="text-sm text-primary">{schoolLoaction || ""}</div>
          </div>
        </div>
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            selectedSchool?.id === item?.id ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
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
                <ContentHeader
                  title={`${coachData?.firstname} ${coachData?.surname}`}
                  // icon={
                  //   <Icons.whistle className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
                  // }
                  subHeader={formattedCoachTitle}
                />
              </div>
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
      <div className="mb-6 w-full  sm:w-1/2 ml-auto flex flex-col">
        <ComboboxCard
          valueKey="value"
          displayKey="label"
          IdKey="value"
          label="Add School"
          id="school-coach-add"
          placeholder={"Select School"}
          isOpen={openSchool}
          scrollAreaClass="h-72"
          hasSearch
          shouldFilter={false}
          searchValue={searchValue}
          handleSearch={(search) => setSearchValue(search)}
          loading={loadingSchool}
          onClose={() => setOpenSchool(!openSchool)}
          items={schoolDataOptions as any}
          selectedValue={selectedSchool}
          customRenderItems={CustomSchoolItems}
        />
        {Object?.keys(selectedSchool)?.length === 0 ? null : (
          <div className="w-full flex mt-6 ">
            <Button
              size="sm"
              className="ml-auto"
              variant="default"
              onClick={() => setPromptStatus(PromptStatusEnum.ADDING)}
            >
              Add School
            </Button>
          </div>
        )}
      </div>
      <Grid numItemsMd={1} numItemsLg={1} className="mt-6 gap-6">
        <CardContainer className="p-4 md:p-4">
          <div className="flex flex-col items-center justify-center relative">
            <ModalCard
              isModal={true}
              isOpen={viewPlayerCardUrl}
              onOpenChange={() => {
                if (coachData?.avatar) {
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
                  avatar={coachData?.avatar as string}
                  fallback={`${coachData?.username?.charAt(
                    0
                  )} ${coachData?.firstname?.charAt(0)}`}
                  icon={<UserIcon className="h-8 w-8" />}
                />
              }
            >
              <ProfileImage
                imageUrl={coachData?.avatar as string}
                alt={coachData?.username?.toLowerCase() as string}
              />
            </ModalCard>
            {loading ? (
              <div className="flex flex-row items-center">
                <Skeleton className="w-[120px] h-[25px] mt-2 mr-1" />
                <Skeleton className="w-[24px] h-[24px] mt-2 rounded-full" />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center">
                <Text className="text-sm relative mr-1">
                  @{coachData?.username?.toLowerCase()}
                </Text>
                {coachData?.coachProfile?.verified ? (
                  <TooltipCard
                    message="Verified"
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
                  <Skeleton className="w-[40px] h-[20px]" />
                ) : (
                  <MenubarCard
                    trigger={
                      <Button size="icon" variant="outline">
                        <MoreHorizontalIcon className="cursor-pointer" />
                      </Button>
                    }
                    items={dropdownItems}
                  />
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
        onOpenChange={() => setViewAnalytics(!viewAnalytics)}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <UsersAnalytics
              loading={loading}
              data={dataList}
              title={`${coachData?.firstname} 
          ${coachData?.surname} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
      <PromptAlert
        loading={IsAddingSchool}
        content={`This action will add @${coachData?.username} to ${selectedSchool?.value}.`}
        showPrompt={promptStatus === PromptStatusEnum.ADDING}
        handleHidePrompt={() => {
          setPromptStatus(null);
          setSelectedSchool({});
        }}
        handleConfirmPrompt={() => handleAddCoachToSchool(selectedSchool)}
      />
      <PromptAlert
        title={`Are you absolutely sure?`}
        loading={deletingSkillType}
        content={`This will permanently delete ${coachData?.username} from our servers.`}
        showPrompt={updatingProfile === StatusEnum.DELETING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
        }}
        handleConfirmPrompt={() =>
          handleDeleteCaochConfirmPrompt(coachData?.id)
        }
      />
    </main>
  );
};

export default CoachDetail;
