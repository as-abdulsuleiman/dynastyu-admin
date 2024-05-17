/** @format */

import { FC, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRootStore } from "@/mobx";
import {
  SortOrder,
  useGetCoachesQuery,
  useGetPostFlagsQuery,
  useGetSkillVerificationRequestsQuery,
} from "@/services/graphql";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "../user-avatar";
import { buttonVariants } from "../ui/button";
import { NotificationIcon } from "@/components/Icons";

interface DropdownProps {}

const DropdownNotification: FC<DropdownProps> = ({}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    skillVerificationRequestStore: {
      setSkillVerificationRequest,
      setLoading,
      skillVerificationRequest,
    },
  } = useRootStore();

  const { data } = useGetSkillVerificationRequestsQuery({
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
    pollInterval: 10 * 1000,
  });

  const {
    loading: LoadingCoachesData,
    data: coachesData,
    refetch: refetchCoachesData,
    fetchMore: fetchMoreCoachesData,
  } = useGetCoachesQuery({
    variables: {
      where: {
        verified: { equals: false },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    returnPartialData: true,
    fetchPolicy: "cache-first",
    // pollInterval: 30 * 1000,
  });

  const showNotificationBadge = skillVerificationRequest?.length;

  const renderNotificationSection = () => {
    return (
      <div className="relative flex h-[31px] w-[31px] cursor-pointer items-center justify-center rounded-full border-[0.5px] bg-[#14b8a6] mr-3">
        <span
          className={`absolute top-0 right-0 z-1 h-[10px] w-[10px] rounded-full bg-[#DC3545] ${
            !showNotificationBadge ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full border border-1 w-full animate-ping rounded-full bg-[#DC3545] opacity-75"></span>
        </span>
        <NotificationIcon
          className="h-[19px] w-[19px] cursor-pointer"
          color={"#fff"}
        />
      </div>
    );
  };

  const renderSkillVerificationRequests = () => {
    return (
      <div className="relative mt-4">
        <ScrollArea className="w-full h-72 ">
          <DropdownMenuLabel className="flex flex-row items-center sticky z-50 top-0 bg-secondary backdrop-blur-sm">
            <div className="">Skill Verification Request</div>
            <div className="ml-auto bg-destructive text-white py-1 px-2 rounded-md cursor-pointer font-TTHovesDemiBold text-xs">
              <Link
                onClick={() => setOpen(false)}
                href="/skill-types/verification-request"
              >
                View All
              </Link>
            </div>
          </DropdownMenuLabel>
          {data?.skillVerificationRequests?.map((value: any, index: any) => {
            return (
              <DropdownMenuGroup
                key={index}
                className={`${index === 0 ? "mt-2" : ""} cursor-pointer w-full`}
              >
                <DropdownMenuItem className=" flex flex-row">
                  <div className="flex flex-row items-center p-2 py-2 flex-1">
                    <div className="relative self-start">
                      <UserAvatar
                        className="h-[59px] w-[59px] shadow"
                        fallbackType="name"
                        fallbackClassName="h-[59px] w-[59px]"
                        avatar={value?.user?.avatar as string}
                        fallback={`${value?.user?.firstname?.charAt(
                          0
                        )} ${value?.user?.surname?.charAt(0)}`}
                      />
                      <div className="absolute h-[15px] rounded-full w-[15px] bg-primary top-1 border border-1 left-0"></div>
                    </div>
                    <div className="flex flex-col ml-3 justify-center w-full">
                      <div key={value?.id} className="cursor-pointer">
                        <span>@{value?.user?.username}</span> {""}
                        <span className="ml-1">
                          is requesting for{" "}
                          <strong>{value?.skill?.skillType?.name}</strong> {""}
                          verification
                        </span>
                      </div>
                      <div className="mt-0 text-[12px] py-0">
                        {formatDistanceToNow(new Date(value?.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                      <Link
                        onClick={() => setOpen(false)}
                        href={`/skill-types/verification-request/${value?.id}`}
                        className={cn(
                          buttonVariants({
                            variant: "destructive",
                            size: "sm",
                          }),
                          "mt-2 ml-auto mr-0 w"
                        )}
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                </DropdownMenuItem>
                <Separator />
              </DropdownMenuGroup>
            );
          })}
        </ScrollArea>
      </div>
    );
  };

  const renderCoachVerification = () => {
    return (
      <div className="relative mt-4">
        <ScrollArea className="w-full h-72 ">
          <DropdownMenuLabel className="flex flex-row items-center sticky z-50 top-0 bg-secondary backdrop-blur-sm">
            <div className="">Coach Verification Request</div>
            <div className="ml-auto text-white bg-destructive py-1 px-2 rounded-md cursor-pointer font-TTHovesDemiBold text-xs">
              <Link
                onClick={() => setOpen(false)}
                href={`/coaches/verification-request`}
              >
                View All
              </Link>
            </div>
          </DropdownMenuLabel>
          {coachesData?.coachProfiles?.map((value: any, index: any) => {
            return (
              <DropdownMenuGroup
                key={index}
                className={`${index === 0 ? "mt-2" : ""} cursor-pointer w-full`}
              >
                <DropdownMenuItem className=" flex flex-row">
                  <div className="flex flex-row items-center p-2 py-2 flex-1">
                    <div className="relative self-start">
                      <UserAvatar
                        className="h-[59px] w-[59px] shadow"
                        fallbackType="name"
                        fallbackClassName="h-[59px] w-[59px]"
                        avatar={value?.user?.avatar as string}
                        fallback={`${value?.user?.firstname?.charAt(
                          0
                        )} ${value?.user?.surname?.charAt(0)}`}
                      />
                      <div className="absolute h-[15px] rounded-full w-[15px] bg-primary top-1 border border-1 left-0"></div>
                    </div>
                    <div className="flex item-center flex-col justify-center ml-3">
                      <div key={value?.id} className="cursor-pointer">
                        <span>@{value?.user?.username}</span> {""}
                        <span className="ml-1">
                          is requesting for Coach verification
                        </span>
                      </div>
                      <div className="mt-0 text-[12px] py-0">
                        {formatDistanceToNow(new Date(value?.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <Separator />
              </DropdownMenuGroup>
            );
          })}
        </ScrollArea>
      </div>
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {renderNotificationSection()}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-full max-w-[540px]"
        align="end"
        sideOffset={20}
      >
        <DropdownMenuLabel className="flex flex-row items-center text-lg">
          Notifications
          <div className="ml-auto bg-secondary py-1 px-2 rounded-md cursor-pointer font-TTHovesDemiBold text-xs">
            <Link onClick={() => setOpen(false)} href="/notifications">
              View All Notifications
            </Link>
          </div>
        </DropdownMenuLabel>
        {renderCoachVerification()}
        <DropdownMenuSeparator />
        {renderSkillVerificationRequests()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(DropdownNotification);
