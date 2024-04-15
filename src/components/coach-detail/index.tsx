/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  QueryMode,
  useDeleteCoachMutation,
  useDeleteUserMutation,
  useGetSchoolsQuery,
  useGetUserQuery,
  useUpdateCoachMutation,
} from "@/services/graphql";
import { Title, Text, Grid, Badge } from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import UsersAnalytics from "@/components/analytics/users";
import { Icons } from "@/components/Icons";
import UserAvatar from "@/components/user-avatar";
import TooltipCard from "@/components/tooltip-card";
import { useToast } from "@/hooks/use-toast";
import MenubarCard from "@/components/menubar";
import ModalCard from "../modal";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import MoreHorizontal from "../Icons/more-horizontal";
import VerifiedIcon from "@/components/Icons/verified";
import {
  PromptStatusEnum,
  StatusEnum,
} from "@/lib/enums/updating-profile.enum";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";
import ProfileImage from "../profile-image";
import ComboboxCard from "../combobox-card";
import { useDebouncedValue } from "@mantine/hooks";
import { CheckIcon } from "lucide-react";
import { CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import PromptAlert from "../prompt-alert";
import CalloutCard from "../callout";
import ContentHeader from "../content-header";

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
    //   onClick: async () => await handleDeleteCoach(coachData),
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
                  icon={
                    <Icons.whistle className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
                  }
                  isIcon
                  subHeader="Coach Details"
                />
              </div>
              {/* <Text>
                {coachData?.coachProfile?.title}{" "}
                {coachData?.coachProfile?.school?.name ? "at" : ""}
                {""} {coachData?.coachProfile?.school?.name}
              </Text> */}
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
        <Card>
          <CardContent className="p-6">
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
                    icon={<Icons.user className="h-8 w-8" />}
                  />
                }
              >
                <ProfileImage
                  imageUrl={coachData?.avatar as string}
                  alt={coachData?.username as string}
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
            <CalloutCard
              color="teal"
              title="Name"
              type="string"
              className="mt-4"
              icon={() => <Icons.user className="h-5 w-5" color="teal" />}
              content={`${coachData?.firstname} ${coachData?.surname}`}
            />
            <CalloutCard
              title="Email"
              type="string"
              color="teal"
              className="mt-4"
              icon={() => (
                <Icons.mail className="h-[19px] w-[19px] mr-2" color="teal" />
              )}
              content={coachData?.email}
            />
            <CalloutCard
              type="string"
              color="teal"
              className="mt-4"
              title="Coach Title"
              content={coachData?.coachProfile?.title}
              icon={() => (
                <Icons.tags className="h-[20px] w-[20px] mr-2" color="teal" />
              )}
            />

            <CalloutCard
              color="teal"
              type="string"
              className="mt-4"
              title="High Scool"
              content={coachData?.coachProfile?.school?.name}
              icon={() => (
                <Icons.school className="h-[19px] w-[19px] mr-2" color="teal" />
              )}
            />
            <CalloutCard
              color="teal"
              type="flag"
              className="mt-4"
              title="Country"
              icon={() => (
                <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
              )}
              content={coachData?.coachProfile?.country?.name}
              flagUrl={coachData?.coachProfile?.country?.flag}
            />

            <CalloutCard
              type="string"
              title="State"
              color="teal"
              className="mt-4"
              icon={() => (
                <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
              )}
              content={coachData?.coachProfile?.state}
            />

            <CalloutCard
              type="string"
              title="City"
              className="mt-4"
              icon={() => (
                <Icons.locateFixed
                  className="h-[20px] w-[20px] mr-2"
                  color="teal"
                />
              )}
              content={coachData?.coachProfile?.city}
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
              showVerified
              isVerified={coachData?.coachProfile?.verified || false}
              isActive={coachData?.isActive || false}
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
    </main>
  );
};

export default CoachDetail;
