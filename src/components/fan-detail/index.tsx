/** @format */

"use client";

import { FC, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import { Divider, Title, Text, Card, Callout } from "@tremor/react";
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
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

interface FanDetailProps {
  params: {
    fan: string;
  };
}

const FanDetail: FC<FanDetailProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showimage, setShowImage] = useState(true);
  const [viewPlayerCardUrl, setViewPlayerCardUrl] = useState(false);
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
        id: params?.fan,
      },
    },
    // pollInterval: 30 * 1000,
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
      await toast({
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
    }
  };

  const dropdownItems = [
    {
      name: `Edit Profile`,
      onClick: () =>
        router.push(`/fans/edit?fan=${Number(params?.fan)}`, {
          scroll: true,
        }),
    },
    {
      name: `${fanData?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
      onClick: async () => await handleActivateProfile(fanData?.user),
    },
    {
      name: "View Profile Picture",
      onClick: () => setViewPlayerCardUrl(true),
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
              {fanData?.user?.firstname} {fanData?.user?.surname}
            </Title>
            <Icons.circleUserRound className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
          </div>
          <Text>@{fanData?.user?.username}</Text>
        </div>
      )}
      <Divider></Divider>
      <UsersAnalytics
        loading={loading}
        data={dataList}
        showStatus={true}
        isActive={fanData?.user?.isActive || false}
        title={`${fanData?.user?.firstname} 
        ${fanData?.user?.surname} Analytics`}
      />

      <Card className="bg-background dark:bg-dark-background">
        <div className="flex flex-col items-center justify-center relative">
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
                avatar={fanData?.user?.avatar as string}
                fallback={`${fanData?.user?.firstname?.charAt(
                  0
                )} ${fanData?.user?.surname?.charAt(0)}`}
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
                  src={fanData?.user?.avatar as string}
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
                @{fanData?.user?.username}
              </Text>
            </div>
          )}
          <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
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
          {fanData?.user?.firstname} {fanData?.user?.surname}
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
          {fanData?.user?.email}
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
          {fanData?.user?.dob && formatDate(fanData?.user?.dob)}
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
          {fanData?.user?.state}
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
          {fanData?.user?.city}
        </Callout>
      </Card>
    </main>
  );
};

export default FanDetail;
