/** @format */

"use client";

import { FC, useState } from "react";
import {
  useDeleteFirebaseUserMutation,
  useDeleteUserMutation,
  useGetAggregateUserLazyQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import { Title, Text } from "@tremor/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import {
  CakeIcon,
  FanIcon,
  FileImageIcon,
  FlagOffIcon,
  LocateFixedIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareMoreIcon,
  MoreHorizontalIcon,
  UserRoundXIcon,
  Users2Icon,
  UsersRoundIcon,
  UserIcon,
  VerifiedIcon,
} from "../Icons";
import UserAvatar from "../user-avatar";
import UsersAnalytics from "@/components/analytics/users";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import MenubarCard from "../menubar";
import ModalCard from "../modal";
import { Separator } from "../ui/separator";
import { StatusEnum } from "@/lib/enums/updating-profile.enum";
import StatusOnlineIcon from "@heroicons/react/outline/StatusOnlineIcon";
import StatusOfflineIcon from "@heroicons/react/outline/StatusOfflineIcon";
import ProfileImage from "../profile-image";
import CalloutCard from "../callout";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";
import CardContainer from "../card-container";
import { renderLoader } from "@/lib/loader-helper";
import { CalloutCardProps } from "@/interface/calloutOptions";
import PromptAlert from "../prompt-alert";
import { useRootStore } from "@/mobx";
import { getPermission } from "@/lib/helpers";
import AccessControl from "../accesscontrol";
import { observer } from "mobx-react-lite";
interface FanDetailProps {
  params: {
    id: number;
  };
}

const FanDetail: FC<FanDetailProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    fanStore: { setFans },
    authStore: { user },
  } = useRootStore();
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState<StatusEnum | null>();
  const [deletingFan, setDeletingFan] = useState(false);
  const [isverifyingFan, setIsverifyingFan] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteFirebaseUser] = useDeleteFirebaseUserMutation();
  const [aggregateFan] = useGetAggregateUserLazyQuery();

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

  const permissionName = getPermission(
    user?.role?.permissions,
    "fans.accesslevel.update"
  );

  const handleDeleteFanConfirmPrompt = async (item: any) => {
    setDeletingFan(true);
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

        const fanResp = await aggregateFan({
          variables: {
            where: {
              accountTypeId: {
                equals: 2,
              },
            },
          },
        });

        setFans(fanResp.data as any);
        toast({
          title: "Fan successfully deleted.",
          description: `@${item?.username} profile has been deleted.`,
          variant: "successfull",
        });
        router.push(`/fans`);
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not delete fan profile. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setDeletingFan(false);
      setUpdatingProfile(null);
    }
  };

  const handleVerifyFan = () => {
    setUpdatingProfile(StatusEnum.VERIFYING);
  };

  const handleVerifyFanConfrimPropmt = async (item: any) => {
    setIsverifyingFan(true);

    try {
      const isVerified = item?.fanVerified;
      await updateUser({
        variables: {
          where: { id: item?.id },
          data: {
            fanVerified: { set: !isVerified },
            // verifiedBy: { connect: { id: fanData?.user?.coachProfile?.id } },
          },
        },
      });
      toast({
        title: "Fan profile successfully updated.",
        description: `${fanData?.user?.username} profile has been ${
          isVerified ? "unverified" : "verified"
        } `,
        variant: "successfull",
      });
      await refetch();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully verify fan. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setUpdatingProfile(null);
      setIsverifyingFan(false);
    }
  };

  const handleDeleteFan = () => {
    setUpdatingProfile(StatusEnum.DELETING);
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
    {
      name: `${
        fanData?.user?.fanVerified ? "Unverify Profile" : "Verify Profile"
      }`,

      onClick: () => handleVerifyFan(),
    },
    {
      name: "Delete Profile",
      onClick: handleDeleteFan,
    },
  ];

  const dataList: any = [
    {
      name: "Following",
      value: fanData?.user?._count?.following || 0,
      color: "teal",
      icon: () => (
        <Users2Icon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Follwers",
      value: fanData?.user?._count?.followedBy || 0,
      color: "teal",
      icon: () => (
        <UsersRoundIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Posts",
      color: "teal",
      value: fanData?.user?._count?.posts || 0,
      icon: () => (
        <FileImageIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Comments",
      color: "teal",
      value: fanData?.user?._count?.comments || 0,
      icon: () => (
        <MessageSquareMoreIcon className="mr-2.5 mb-[-6px] h-5 w-5 stroke-teal-600" />
      ),
    },
    {
      name: "Post Flag",
      value: fanData?.user?._count?.postFlag || 0,
      icon: () => (
        <FlagOffIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
    {
      name: "Blocked Users",
      value: fanData?.user?._count?.blockedUsers || 0,
      icon: () => (
        <UserRoundXIcon className="mr-2.5 mb-[-6px] h-5 w-5  stroke-teal-600" />
      ),
    },
  ];

  const calloutOptions: CalloutCardProps[] = [
    {
      color: "teal",
      type: "string",
      title: "Name",
      className: "mt-4 min-h-[75px]",
      icon: () => <UserIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: `${fanData?.user?.firstname} ${fanData?.user?.surname}`,
    },
    {
      color: "teal",
      type: "string",
      title: "Email",
      className: "mt-4 min-h-[75px]",
      icon: () => <MailIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: fanData?.user?.email,
    },
    {
      color: "teal",
      type: "string",
      title: "Date of Birth",
      className: "mt-4 min-h-[75px]",
      icon: () => <CakeIcon className="h-[19px] w-[19px] mr-2" color="teal" />,
      content: fanData?.user?.dob && formatDate(fanData?.user?.dob),
    },
    {
      color: "teal",
      type: "flag",
      title: "Country",
      className: "mt-4",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: fanData?.user?.country?.name,
      flagUrl: fanData?.user?.country?.flag,
    },
    {
      color: "teal",
      type: "string",
      title: "State",
      className: "mt-4",
      icon: () => (
        <MapPinIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: fanData?.user?.state,
    },
    {
      color: "teal",
      type: "string",
      title: "City",
      className: "mt-4",
      icon: () => (
        <LocateFixedIcon className="h-[20px] w-[20px] mr-2" color="teal" />
      ),
      content: fanData?.user?.city,
    },
  ];

  const renderCallout = () => {
    return (
      <>
        {calloutOptions?.map((item: CalloutCardProps, id) => {
          return (
            <div key={id}>
              <CalloutCard
                color={item?.color as any}
                type={item?.type}
                title={item?.title}
                className={item?.className}
                icon={() => <>{item?.icon}</>}
                content={item?.content || "N/A"}
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
      content: fanData?.user?.email?.toLowerCase() || "N/A",
    },
    {
      title: "Username:",
      content: `@${fanData?.user?.username?.toLowerCase()}` || "N/A",
    },
    {
      title: "Updated at:",
      content:
        `${
          fanData?.user?.updatedAt
            ? formatDate(new Date(fanData?.user?.updatedAt))
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
              title={
                `${fanData?.user?.firstname} ${fanData?.user?.surname}` || ""
              }
              // icon={
              //   <FanIcon className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
              // }
              subItems={subHeaderItems}
            />
          </div>
        </div>
      )}
      <Separator className="my-6" />
      <CardContainer className="p-4 md:p-4">
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
                icon={<UserIcon className="h-8 w-8" />}
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
                @{fanData?.user?.username?.toLowerCase()}
              </Text>
              {fanData?.user?.fanVerified ? (
                <VerifiedIcon className="cursor-pointer" />
              ) : null}
            </div>
          )}
          <div className="xl:hidden ml-0 absolute left-0 top-0">
            <>{renderBadges("flex flex-col")}</>
          </div>
          <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
            <div className="flex flex-row items-center">
              <div className="hidden xl:flex xl:flex-row">
                {renderBadges("flex flex-row items-center mr-3")}
              </div>
              {loading ? (
                <Skeleton className="w-[40px] h-[20px]" />
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
              title={`${fanData?.user?.firstname} 
        ${fanData?.user?.surname} Analytics`}
            />
          </div>
        </div>
      </ModalCard>
      <PromptAlert
        title={`Are you absolutely sure?`}
        loading={deletingFan}
        content={`This will permanently delete ${fanData?.user?.username} from our servers.`}
        showPrompt={updatingProfile === StatusEnum.DELETING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
        }}
        handleConfirmPrompt={() => handleDeleteFanConfirmPrompt(fanData?.user)}
      />
      <PromptAlert
        title={`Are you absolutely sure?`}
        loading={isverifyingFan}
        content={`This will permanently ${
          fanData?.user?.fanVerified ? "unverify" : "verify"
        } @${fanData?.user?.username} from our servers.`}
        showPrompt={updatingProfile === StatusEnum.VERIFYING}
        handleHidePrompt={() => {
          setUpdatingProfile(null);
          setIsverifyingFan(false);
        }}
        handleConfirmPrompt={() => handleVerifyFanConfrimPropmt(fanData?.user)}
      />
    </main>
  );
};

export default observer(FanDetail);
