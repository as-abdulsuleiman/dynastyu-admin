/** @format */

import { FC } from "react";
import { usePathname } from "next/navigation";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import { cn } from "@/lib/utils";
import UseThemeColor from "@/hooks/useThemeColor";
import Link from "next/link";
import {
  AthleteIcon,
  FanIcon,
  SchoolIcon,
  WhistleIcon,
  FlagOffIcon,
  ChevronDownIcon,
  SkillIcon,
  LayoutGridIcon,
  CircleUserRoundIcon,
  NotificationIcon,
  CogIcon,
} from "@/components/Icons";

interface SidebarItemsProps {
  handleNavigation: (val: string) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (arg: boolean) => void;
}

type IconProps = {
  className: string;
  color: string;
};
type CountBadgeProps = {
  countValue: any;
  className?: string;
};

const CountBadge = ({ countValue, className }: CountBadgeProps) => {
  const formatCount = (count: number) => {
    return +count > 99 ? `${Math.max(0, 99)}+` : Math.max(0, +count || 0);
  };

  return (
    <div
      className={cn(
        "h-[25px] w-[25px] rounded-full bg-destructive flex flex-row items-center justify-center",
        className
      )}
    >
      <div className="font-TTHovesDemiBold flex flex-row items-center justify-center m-auto text-gray-200 dark:text-dark-gray-700 text-[11.5px]">
        {formatCount(countValue)}
      </div>
    </div>
  );
};

const SidebarLinkGroup: FC<SidebarItemsProps> = ({
  handleNavigation,
  setSidebarExpanded,
  sidebarExpanded,
}) => {
  const {
    skillVerificationRequestStore: { skillVerificationRequest },
    coachVerificationRequestStore: { caochVerificationRequest: coachesCount },
    flaggedPostStore: { flaggedPost: flaggedPostCount },
    skillTypeStore: { skillTypes: skillTypeCount },
  } = useRootStore();

  const pathname = usePathname();
  const themeColor = UseThemeColor();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      parentCount: [],
      items: [],
      hasFill: false,
      hasBadge: false,
      icon: ({ className, color }: IconProps) => (
        <LayoutGridIcon className={className} color={color} />
      ),
    },
    // {
    //   name: "Users",
    //   hasFill: false,
    //   path: "/users",
    //   icon: ({ className, color }: IconProps) => (
    //     <Users className={className} color={color} />
    //   ),
    // },
    {
      name: "Athletes",
      hasFill: false,
      path: "/athletes",
      items: [],
      hasBadge: false,
      parentCount: [],
      icon: ({ className, color }: IconProps) => (
        <AthleteIcon className={className} color={color} />
      ),
    },
    {
      name: "Coaches",
      hasFill: true,
      path: "/coaches",
      hasBadge: true,
      parentCount: [coachesCount?.aggregateCoachProfile?._count?.id],
      items: [
        {
          name: "Create Coach",
          path: "/coaches/new",
        },
        {
          name: "Verification Request",
          path: "/coaches/verification-request",
          count: coachesCount?.aggregateCoachProfile?._count?.id,
          hasBadge: true,
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <WhistleIcon className={className} color={color} />
      ),
    },
    {
      name: "Fans",
      hasFill: true,
      path: "/fans",
      hasBadge: false,
      parentCount: [],
      // items: [
      //   {
      //     name: "Create Fan",
      //     path: "/fans/new",
      //   },
      // ],
      icon: ({ className, color }: IconProps) => (
        <FanIcon className={className} color={color} />
      ),
    },
    {
      name: "Schools",
      hasFill: false,
      path: "/schools/college",
      hasBadge: false,
      parentCount: [],
      items: [
        {
          name: "College",
          path: "/schools/college",
          hasBadge: false,
          count: 0,
        },
        {
          name: "High School",
          path: "/schools/high-school",
          hasBadge: false,
          count: 0,
        },
        {
          name: "Create School",
          path: "/schools/new",
          hasBadge: false,
          count: 0,
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <SchoolIcon className={className} color={color} />
      ),
    },
    {
      name: "Flagged Posts",
      hasFill: false,
      path: "/flagged-posts",
      hasBadge: false,
      parentCount: [flaggedPostCount?.aggregatePostFlag?._count?.id],
      items: [],
      icon: ({ className, color }: IconProps) => (
        <FlagOffIcon className={cn(className, "h-4 w-4")} color={color} />
      ),
    },
    {
      name: "Skill Types",
      hasFill: true,
      path: "/skill-types",
      hasBadge: false,
      parentCount: [skillVerificationRequest?.length],
      items: [
        {
          name: "Create Skill Type",
          path: "/skill-types/new",
        },
        {
          name: "Verification Request",
          path: "/skill-types/verification-request",
          hasBadge: skillVerificationRequest.length > 0 ? true : false,
          count: skillVerificationRequest?.length,
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <SkillIcon
          className={cn(className, "h-[21px] w-[21px]")}
          color={color}
        />
      ),
    },

    {
      name: "Notifications",
      hasFill: false,
      path: "/notifications",
      hasBadge: false,
      parentCount: [
        flaggedPostCount?.aggregatePostFlag?._count?.id,
        coachesCount?.aggregateCoachProfile?._count?.id,
      ],
      // items: [
      //   {
      //     name: "Create Fan",
      //     path: "/fans/new",
      //   },
      // ],
      icon: ({ className, color }: IconProps) => (
        <NotificationIcon className={className} color={color} />
      ),
    },
    {
      name: "Settings",
      hasFill: false,
      path: "/profile-settings",
      hasBadge: false,
      parentCount: [],
      items: [
        {
          name: "Profile",
          path: "/profile-settings",
          hasBadge: false,
          count: 0,
        },
        {
          name: "Staff",
          path: "/staff-settings",
          hasBadge: false,
          count: 0,
        },
        {
          name: "Security",
          path: "/security-settings",
          hasBadge: false,
          count: 0,
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <CogIcon className={cn(className)} color={color} />
      ),
    },
    {
      name: "Admin",
      hasFill: false,
      path: "/account-types",
      hasBadge: false,
      parentCount: [],
      items: [
        {
          name: "Account Types",
          path: "/account-types",
          hasBadge: false,
          count: 0,
        },
        {
          name: "School Types",
          path: "/school-types",
          hasBadge: false,
          count: 0,
        },
        {
          name: "Roles",
          path: "/roles",
          hasBadge: false,
          count: 0,
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <CircleUserRoundIcon className={cn(className)} color={color} />
      ),
    },
  ];

  return (
    <>
      {items?.map((val, index) => {
        const parentPath = val?.path;
        let pathToCheck: any = parentPath?.split("?");
        pathToCheck = pathToCheck?.length ? pathToCheck[0] : null;
        const childPath = val?.items?.some((data: any) =>
          pathname?.includes(data?.path)
        );
        const isActive = pathname?.includes(pathToCheck) || childPath;

        const hasChildren = val?.items ? val?.items.length > 0 : false;

        const iconColor = "";
        let activeIconColor = "";

        if (isActive) {
          if (val?.hasFill) {
            activeIconColor = "fill-white";
          } else {
            activeIconColor = "stroke-white";
          }
        } else {
          if (val?.hasFill) {
            activeIconColor = "fill-foreground";
          } else {
            activeIconColor = "stroke-foreground";
          }
        }
        const iconClass = `h-[19px] w-[19px] ${activeIconColor}`;
        const Icon = () =>
          val?.icon({ className: iconClass, color: iconColor });

        const showCount = val?.parentCount?.length > 0;

        return (
          <div key={index}>
            <Link
              href={val?.path}
              scroll={true}
              shallow
              className={`group flex-row flex cursor-pointer items-center mt-4 transition-transform ease-linear duration-200`}
            >
              <div
                className={`flex flex-row w-full h-full py-[8px] px-[16px] rounded-md items-center ${
                  isActive ? "bg-primary" : "bg-secondary"
                }`}
              >
                <Icon />
                <div
                  className={`text-[16px] font-TTHovesDemiBold ml-4 mt-[0px] text-base ${
                    isActive ? "text-primary-foreground" : ""
                  } `}
                >
                  {val?.name}
                </div>
                {(!isActive && showCount) || (!hasChildren && showCount) ? (
                  <div className="ml-auto flex flex-row -space-x-[8px] relative">
                    {val?.parentCount?.slice(0, 2)?.map((count: any, idx) => {
                      return (
                        <CountBadge
                          key={idx}
                          countValue={count}
                          className={`z-${
                            idx + 1
                            // idx === 0
                            //   ? "z-10 shadow-2xl bg-destructive"
                            //   : "z-[5] bg-popover-foreground"
                          }`}
                        />
                      );
                    })}
                  </div>
                ) : isActive ? (
                  <ChevronDownIcon className="ml-auto h-5 w-5 stroke-primary-foreground dark:stroke-primary-foreground" />
                ) : null}
              </div>
            </Link>
            {isActive && hasChildren ? (
              <div className="pr-2 pl-4 pb-3 mt-3">
                {val?.items?.map((value: any, index) => {
                  return (
                    <Link key={index} href={value?.path} scroll={true} shallow>
                      <div className="flex flex-row items-center h-[35px]">
                        <div
                          className={`font-TTHovesDemiBold ${
                            isActive && pathname === value?.path
                              ? "text-teal-700"
                              : ""
                          } cursor-pointer text-sm`}
                          // onClick={() => handleNavigation()}
                        >
                          {value?.name}
                        </div>
                        {value?.count ? (
                          <CountBadge
                            countValue={value?.count}
                            className="ml-auto"
                          />
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default observer(SidebarLinkGroup);
