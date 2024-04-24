/** @format */

"use client";

import { FC, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import { Title, Text } from "@tremor/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Icons } from "../Icons";
import UserAvatar from "../user-avatar";
import UsersAnalytics from "@/components/analytics/users";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import MenubarCard from "../menubar";
import ModalCard from "../modal";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import MoreHorizontal from "../Icons/more-horizontal";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";
import ProfileImage from "../profile-image";
import CalloutCard from "../callout";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import { renderLoader } from "@/lib/loader-helper";

interface FanDetailProps {
  params: {
    id: number;
  };
}

const FanDetail: FC<FanDetailProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const {
    data: fanData,
    loading: loading,
    refetch,
    fetchMore,
  } = useGetUserQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const handleDeleteProfile = async (item: any) => {
    try {
      await deleteUser({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      toast({
        title: "Fan successfully deleted.",
        description: `@${item?.username} account has been deleted.`,
        variant: "default",
      });
      router.push(`/fans`);
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete fan profile. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleActivateProfile = async (item: any) => {
    setUpdatingProfile(StatusEnum.ACTIVATING);
    try {
      const isFanActive = item?.isActive;
      await updateUser({
        variables: {
          where: {
            id: item?.id,
          },
          data: {
            isActive: { set: !isFanActive },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.username} profile has been ${
          isFanActive ? "deactivated" : "activated"
        }`,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update fan. Please try again."
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
        router.push(`/fans/edit?fan=${params?.id}`, {
          scroll: true,
        }),
    },
    {
      name: `${fanData?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
      onClick: async () => await handleActivateProfile(fanData?.user),
    },
    {
      name: "View Profile",
      onClick: () => {
        if (fanData?.user?.avatar) {
          setViewPlayerCardUrl(!viewPlayerCardUrl);
        }
      },
    },
    {
      name: "View Analytics",
      onClick: () => setViewAnalytics(true),
    },
    // {
    //   name: "Delete Profile",
    //   onClick: async () => await handleDeleteProfile(fanData?.user),
    // },
  ];

  const dataList: any = [
    {
      name: "Following",
      value: fanData?.user?._count?.following || 0,
      color: "teal",
      icon: () => (
        <Icons.users2 className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Follwers",
      value: fanData?.user?._count?.followedBy || 0,
      color: "teal",
      icon: () => (
        <Icons.usersRound className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      color: "teal",
      value: fanData?.user?._count?.posts || 0,
      icon: () => (
        <Icons.fileImage className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Comments",
      color: "teal",
      value: fanData?.user?._count?.comments || 0,
      icon: () => (
        <Icons.messageSquareMore className="mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600" />
      ),
    },
    {
      name: "Post Flag",
      value: fanData?.user?._count?.postFlag || 0,
      icon: () => (
        <Icons.flagOff className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Blocked Users",
      value: fanData?.user?._count?.blockedUsers || 0,
      icon: () => (
        <Icons.userRoundX className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
  ];

  const renderCallout = () => {
    return (
      <>
        <CalloutCard
          color="teal"
          title="Name"
          type="string"
          className="mt-4 min-h-[75px]"
          icon={() => (
            <Icons.user className="h-[19px] w-[19px] mr-2" color="teal" />
          )}
          content={`${fanData?.user?.firstname} ${fanData?.user?.surname}`}
        />

        <CalloutCard
          color="teal"
          title="Email"
          type="string"
          className="mt-4 min-h-[75px]"
          icon={() => (
            <Icons.mail className="h-[19px] w-[19px] mr-2" color="teal" />
          )}
          content={fanData?.user?.email}
        />

        <CalloutCard
          color="teal"
          type="string"
          title="Date of Birth"
          className="mt-4 min-h-[75px]"
          icon={() => (
            <Icons.cake className="h-[19px] w-[19px] mr-2" color="teal" />
          )}
          content={fanData?.user?.dob && formatDate(fanData?.user?.dob)}
        />

        <CalloutCard
          color="teal"
          type="flag"
          className="mt-4"
          title="Country"
          icon={() => (
            <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
          )}
          content={fanData?.user?.country?.name}
          flagUrl={fanData?.user?.country?.flag}
        />

        <CalloutCard
          type="string"
          title="State"
          color="teal"
          className="mt-4"
          icon={() => (
            <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
          )}
          content={fanData?.user?.state}
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
          content={fanData?.user?.city}
        />
      </>
    );
  };

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
          <div className="hidden lg:flex lg:flex-row lg:items-center mr-3">
            <BadgeCard
              datatype={fanData?.user?.isActive ? "increase" : "decrease"}
              color={fanData?.user?.isActive ? "teal" : "rose"}
              icon={
                updatingProfile === StatusEnum.ACTIVATING
                  ? undefined
                  : fanData?.user?.isActive
                  ? StatusOnlineIcon
                  : StatusOfflineIcon
              }
            >
              {updatingProfile === StatusEnum.ACTIVATING
                ? "Updating..."
                : fanData?.user?.isActive
                ? "Active"
                : "Deactivated"}
            </BadgeCard>
          </div>
        )}
      </>
    );
  };

  const subHeaderItems = [
    {
      title: "Email:",
      content: fanData?.user?.email || "N/A",
    },
    {
      title: "Username:",
      content: `@${fanData?.user?.username}` || "N/A",
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
              title={
                `${fanData?.user?.firstname} ${fanData?.user?.surname}` || ""
              }
              icon={
                <Icons.fans className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              }
              subItems={subHeaderItems}
            />
          </div>
        </div>
      )}
      <Separator className="my-6" />
      <Card className="mt-6 gap-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center relative">
            <ModalCard
              isModal={true}
              isOpen={viewPlayerCardUrl}
              onOpenChange={() => {
                if (fanData?.user?.avatar) {
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
                  avatar={fanData?.user?.avatar as string}
                  fallback={`${fanData?.user?.firstname?.charAt(
                    0
                  )} ${fanData?.user?.surname?.charAt(0)}`}
                  icon={<Icons.user className="h-8 w-8" />}
                />
              }
            >
              <ProfileImage
                imageUrl={fanData?.user?.avatar as string}
                alt={fanData?.user?.username as string}
              />
            </ModalCard>
            {loading ? (
              <div className="flex flex-row items-center">
                <Skeleton className="w-[170px] h-[28px] mt-2 mr-1" />
                <Skeleton className="w-[16.67px] h-[16.67px] mt-2 rounded-full" />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center mt-1">
                <Text className="text-sm relative mr-1">
                  @{fanData?.user?.username}
                </Text>
              </div>
            )}
            <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
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
          {loading ? renderLoader() : renderCallout()}
        </CardContent>
      </Card>
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
              isActive={fanData?.user?.isActive || false}
              title={`${fanData?.user?.firstname} 
        ${fanData?.user?.surname} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
    </main>
  );
};

export default FanDetail;
