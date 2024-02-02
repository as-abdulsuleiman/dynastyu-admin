/** @format */

"use client";

import { FC, useState } from "react";
import {
  Title,
  Text,
  Divider,
  Card,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Icons } from "../Icons";
import {
  useGetSkillVerificationRequestQuery,
  useUpdateSkillVerificationMutation,
} from "@/services/graphql";
import UserAvatar from "../user-avatar";
import HoverCard from "../hover-card";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import CarouselCard from "../carousel-card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

interface VerificationRequestProps {
  params: {
    action: string;
  };
  searchParams: {
    skill: number;
  };
}

const VerificationRequest: FC<VerificationRequestProps> = ({
  params,
  searchParams,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateSkillVerificationRequest] = useUpdateSkillVerificationMutation();
  const { data, loading, refetch } = useGetSkillVerificationRequestQuery({
    variables: {
      where: {
        id: params?.action,
      },
    },
  });

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

  const dropdownItems = [
    {
      name: `View Profile`,
      onclick: () =>
        router.push(
          `/athlete/${data?.skillVerificationRequest?.skill?.athleteId}`,
          {
            scroll: true,
          }
        ),
    },
  ];

  const handleVerifySkill = async () => {
    setUpdating(true);
    try {
      const response = await updateSkillVerificationRequest({
        variables: {
          where: {
            id: data?.skillVerificationRequest?.id,
          },
          data: {
            verified: { set: !data?.skillVerificationRequest?.verified },
            dateOfVerfication: { set: new Date() },
          },
        },
      });
      if (response?.data) {
        // toast({
        //   title: "Skill verification successfully updated",
        //   description: `${data?.skillVerificationRequest?.skill?.skillType?.name} has been verified`,
        //   variant: "default",
        // });
        await refetch();
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <main className="w-full h-full relative">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <Title>Verify Skill</Title>
          <Icons.medal className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
        </div>
        <Text>Skill Overview</Text>
      </div>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Card className="bg-background dark:bg-dark-background">
              <div className="flex flex-col items-center justify-center relative">
                <UserAvatar
                  className="h-[120px] w-[120px] shadow"
                  height={120}
                  width={120}
                  fallbackType="icon"
                  avatar={data?.skillVerificationRequest?.user.avatar as string}
                  fallback={`${data?.skillVerificationRequest?.user?.username?.charAt(
                    0
                  )} ${data?.skillVerificationRequest?.user?.firstname?.charAt(
                    0
                  )}`}
                  icon={<Icons.user className="h-8 w-8" />}
                />
                {loading ? (
                  <div className="flex flex-row items-center">
                    <Skeleton className="w-[170px] h-[28px] mt-2 mr-1" />
                    <Skeleton className="w-[16.67px] h-[16.67px] mt-2 rounded-full" />
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center mt-1">
                    <Text className="text-xl relative mr-1">
                      @{data?.skillVerificationRequest?.user?.username}
                    </Text>
                    {data?.skillVerificationRequest?.verified ? (
                      <HoverCard
                        content={renderVerifiedBy(
                          data?.skillVerificationRequest?.user?.athleteProfile
                            ?.verifiedBy
                        )}
                        trigger={
                          <div className="cursor-pointer">
                            <Icons.badgeCheck
                              className="h-5 w-5"
                              color="teal"
                            />
                          </div>
                        }
                      />
                    ) : (
                      <HoverCard
                        content={<Text>{"Not Verified"}</Text>}
                        trigger={
                          <div className="cursor-pointer">
                            <Icons.badgeAlert
                              className="h-5 w-5"
                              color="teal"
                            />
                          </div>
                        }
                      />
                    )}
                  </div>
                )}
                <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
                  <Menubar className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-0 mr-6">
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
                  <div className="flex flex-col">
                    <Button
                      className="ml-auto "
                      onClick={() => handleVerifySkill()}
                    >
                      {updating
                        ? "Verifying..."
                        : data?.skillVerificationRequest?.verified
                        ? "Unverify Skill"
                        : "Verify Skill"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <Title>Skill</Title>
                  <div className="flex flex-row items-center mt-4 text-tremor-default ">
                    Name:{" "}
                    <Text className="ml-2">
                      {data?.skillVerificationRequest?.skill?.skillType?.name}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center text-tremor-default">
                    Value:{" "}
                    <Text className="ml-2">
                      {data?.skillVerificationRequest?.skill?.value}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center text-tremor-default">
                    Second Value:
                    <Text>
                      {data?.skillVerificationRequest?.skill?.secondValue}
                    </Text>
                  </div>
                  <div className="mt-1">
                    <div className="flex flex-row items-center text-tremor-default">
                      {data?.skillVerificationRequest?.verified ? (
                        <Icons.shield
                          className="h-5 w-5 stroke-[1.5px]"
                          color="teal"
                        />
                      ) : null}
                      <div
                        className={`text-[15px]  ${
                          data?.skillVerificationRequest?.verified
                            ? "text-teal-700 ml-1"
                            : "text-gray-600 ml-0"
                        } `}
                      >
                        {data?.skillVerificationRequest?.verified
                          ? "DU Verified"
                          : "Verification Pending"}
                      </div>
                    </div>
                    {data?.skillVerificationRequest?.verified ? (
                      <div className="flex flex-row items-center text-tremor-default mt-1">
                        Verification Date:{" "}
                        <Text className="ml-2">
                          {formatDate(
                            data?.skillVerificationRequest.dateOfVerfication,
                            "dd MMMM, yyyy"
                          )}
                        </Text>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-6  md:place-self-end">
                  <Title>Camp</Title>
                  <div className="flex flex-row items-center mt-4 text-tremor-default">
                    Name:
                    <Text className="ml-2">
                      {data?.skillVerificationRequest?.camp?.name}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center text-tremor-default">
                    Address:
                    <Text className="ml-2">
                      {data?.skillVerificationRequest?.camp?.address}
                    </Text>
                  </div>
                  <div className="flex flex-row items-center text-tremor-default">
                    Description:
                    <Text className="ml-2">
                      {data?.skillVerificationRequest?.camp?.description}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
            {data?.skillVerificationRequest?.skill?.videos ? (
              <div className="flex flex-row mx-auto mt-3">
                <CarouselCard
                  videos={data?.skillVerificationRequest?.skill?.videos}
                />
              </div>
            ) : null}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default VerificationRequest;
