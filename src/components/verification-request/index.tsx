/** @format */

"use client";

import { FC, useState } from "react";
import { Title, Text, Card, Badge } from "@tremor/react";
import { Icons } from "../Icons";
import {
  SortOrder,
  useGetSkillVerificationRequestQuery,
  useGetSkillVerificationRequestsLazyQuery,
  useUpdateSkillVerificationRequestMutation,
} from "@/services/graphql";
import UserAvatar from "../user-avatar";
import HoverCard from "../hover-card";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import MenubarCard from "../menubar";
import { useRootStore } from "@/mobx";
import MediaCard from "../media-card";
import { Separator } from "../ui/separator";
import MoreHorizontal from "../Icons/more-horizontal";
import VerifiedIcon from "@/components/Icons/verified";
import BadgeCard from "../badge-card";

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
  const {
    authStore: { user },
    skillVerificationRequestStore: {
      setSkillVerificationRequest,
      skillVerificationRequest,
    },
  } = useRootStore();

  const [updating, setUpdating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [getSkillVerificationRequest] =
    useGetSkillVerificationRequestsLazyQuery();

  const [updateSkillVerificationRequest] =
    useUpdateSkillVerificationRequestMutation();

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
        <div className="text-center text-lg">Verified By</div>
        <div className="flex flex-row">
          <div className="text-center ">
            Coach {verifiedBy?.user?.firstname} {verifiedBy?.user?.surname}
          </div>
        </div>
        <div className="text-[13px] text-center">{verifiedBy?.title}</div>
      </div>
    );
  };

  const dropdownItems = [
    {
      name: `View Profile`,
      onClick: () =>
        router.push(`/athlete/${data?.skillVerificationRequest?.userId}`, {
          scroll: true,
        }),
    },
  ];

  const handleVerifySkill = async () => {
    setUpdating(true);
    setIsVerifying(true);
    try {
      const isVerified = data?.skillVerificationRequest?.verified;
      await updateSkillVerificationRequest({
        variables: {
          where: {
            id: data?.skillVerificationRequest?.id,
          },
          data: {
            verified: { set: !isVerified },
            dateOfVerfication: { set: new Date() },
          },
        },
      });
      await refetch();
      const res = await getSkillVerificationRequest({
        variables: {
          where: {
            verified: {
              equals: false,
            },
          },
          take: 10,
          orderBy: {
            createdAt: SortOrder.Desc,
          },
        },
      });
      setSkillVerificationRequest(res?.data?.skillVerificationRequests as any);
      toast({
        title: "Skill verification successfully updated",
        description: `${
          data?.skillVerificationRequest?.skill?.skillType?.name
        } skill has been ${!isVerified ? "verified" : "unverified"}`,
        variant: "successfull",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
      setIsVerifying(false);
    }
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
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <Title>Verify Skill</Title>
          <Icons.medal className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
        </div>
        <Text>Skill Overview</Text>
      </div>
      <Separator className="my-6" />
      <div className="flex-col hidden md:flex ">
        <Button
          disabled={isVerifying}
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
      <Card className="mt-6 gap-6">
        <MediaCard
          loading={loading}
          items={data?.skillVerificationRequest?.skill?.videos || []}
          type={"video"}
        />
      </Card>
      <Card className="mt-6 gap-6">
        <div className="flex flex-col items-center justify-center relative">
          <UserAvatar
            className="h-[120px] w-[120px] shadow"
            height={120}
            width={120}
            fallbackType="icon"
            fallbackClassName={"h-[120px] w-[120px]"}
            avatar={data?.skillVerificationRequest?.user.avatar as string}
            fallback={`${data?.skillVerificationRequest?.user?.firstname?.charAt(
              0
            )} ${data?.skillVerificationRequest?.user?.surname?.charAt(0)}`}
            icon={<Icons.user className="h-8 w-8" />}
          />
          {loading ? (
            <div className="flex flex-row items-center">
              <Skeleton className="w-[170px] h-[28px] mt-2 mr-1" />
              <Skeleton className="w-[16.67px] h-[16.67px] mt-2 rounded-full" />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center mt-1">
              <div className="text-sm relative mr-1 font-TTHovesRegular">
                @{data?.skillVerificationRequest?.user?.username}
              </div>
              {data?.skillVerificationRequest?.verified ? (
                <HoverCard
                  content={renderVerifiedBy(
                    data?.skillVerificationRequest?.user?.athleteProfile
                      ?.verifiedBy
                  )}
                  trigger={
                    <div className="cursor-pointer">
                      <VerifiedIcon className="cursor-pointer" />
                    </div>
                  }
                />
              ) : null}
            </div>
          )}
          <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontal className="cursor-pointer" />
                </Button>
              }
              items={dropdownItems}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-2 md:mt-0">
          <div className="col-span-12 sm:col-span-6">
            <Title>Skill</Title>
            <div className="flex flex-row items-center mt-4 text-tremor-default ">
              Name:{" "}
              <div className="ml-2">
                {data?.skillVerificationRequest?.skill?.skillType?.name}
              </div>
            </div>
            <div className="flex flex-row items-center text-tremor-default">
              Value:{" "}
              <div className="ml-2">
                {data?.skillVerificationRequest?.skill?.value}
              </div>
            </div>
            <div className="flex flex-row items-center text-tremor-default">
              Second Value:
              <div>{data?.skillVerificationRequest?.skill?.secondValue}</div>
            </div>
            <div className="mt-1">
              {data?.skillVerificationRequest?.verified ? (
                <div className="flex flex-col">
                  <BadgeCard>
                    <span className="flex flex-row items-center text-tremor-default">
                      {data?.skillVerificationRequest?.verified ? (
                        <Icons.shield
                          className="h-4 w-4 stroke-[1.5px]"
                          color="teal"
                        />
                      ) : null}
                      <span className="text-[15px] text-teal-700 ml-1 text-tremor-default">
                        DU Verified
                      </span>
                    </span>
                  </BadgeCard>

                  <div className="flex flex-row items-center text-tremor-default mt-1">
                    Verification Date:{" "}
                    <div className="ml-2">
                      {formatDate(
                        data?.skillVerificationRequest.dateOfVerfication,
                        "dd MMMM, yyyy"
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-[15px] text-teal-700 ml-0">
                  Verification Pending
                </div>
              )}
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6  md:place-self-end">
            <Title>Camp</Title>
            <div className="flex flex-row items-center mt-4 text-tremor-default">
              Name:
              <div className="ml-2">
                {data?.skillVerificationRequest?.camp?.name}
              </div>
            </div>
            <div className="flex flex-row items-center text-tremor-default">
              Address:
              <div className="ml-2">
                {data?.skillVerificationRequest?.camp?.address}
              </div>
            </div>
            <div className="flex flex-row items-center text-tremor-default">
              Description:
              <div className="ml-2">
                {data?.skillVerificationRequest?.camp?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:hidden mt-4">
          <Button
            className="ml-auto w-full"
            disabled={isVerifying}
            onClick={() => handleVerifySkill()}
          >
            {updating
              ? "Verifying..."
              : data?.skillVerificationRequest?.verified
              ? "Unverify Skill"
              : "Verify Skill"}
          </Button>
        </div>
      </Card>
    </main>
  );
};

export default VerificationRequest;
