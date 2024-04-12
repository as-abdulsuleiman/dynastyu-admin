/** @format */

import { FC } from "react";
import { Bell, FolderRoot, Home, Medal, Settings } from "lucide-react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Icons } from "../Icons";
import SkillIcon from "../Icons/skill";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import FlagOffIcon from "@/components/Icons/flag-off";
import ChevronDownIcon from "@/components/Icons/chevron-down";
import { cn } from "@/lib/utils";
import UseThemeColor from "@/hooks/useThemeColor";
import Link from "next/link";
import LayoutGridIcon from "@/components/Icons/layout-grid";
// import Notification from "../Icons/notification";

interface SidebarItemsProps {
  handleNavigation: (val: string) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (arg: boolean) => void;
}

type IconProps = {
  className: string;
  color: string;
};

const SidebarLinkGroup: FC<SidebarItemsProps> = ({
  handleNavigation,
  setSidebarExpanded,
  sidebarExpanded,
}) => {
  const {
    skillVerificationRequestStore: { skillVerificationRequest },
  } = useRootStore();
  const pathname = usePathname();
  const themeColor = UseThemeColor();

  const formatCount = (count: number) => {
    return +count > 99 ? `${Math.max(0, 99)}+` : Math.max(0, +count || 0);
  };

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      count: 0,
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
      count: 0,
      icon: ({ className, color }: IconProps) => (
        <Icons.athlete className={className} color={color} />
      ),
    },
    {
      name: "Coaches",
      hasFill: true,
      path: "/coaches",
      hasBadge: false,
      count: 0,
      items: [
        {
          name: "Create Coach",
          path: "/coaches/new",
        },
        { name: "Verification Request", path: "/coaches/verification-request" },
      ],
      icon: ({ className, color }: IconProps) => (
        <Icons.whistle className={className} color={color} />
      ),
    },
    {
      name: "Fans",
      hasFill: true,
      path: "/fans",
      hasBadge: false,
      count: 0,
      // items: [
      //   {
      //     name: "Create Fan",
      //     path: "/fans/new",
      //   },
      // ],
      icon: ({ className, color }: IconProps) => (
        <Icons.fans className={className} color={color} />
      ),
    },
    {
      name: "Schools",
      hasFill: false,
      path: "/schools",
      hasBadge: false,
      count: 0,
      items: [
        {
          name: "Create School",
          path: "/schools/new",
          hasBadge: false,
          count: 0,
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <Icons.school className={className} color={color} />
      ),
    },
    {
      name: "Flagged Posts",
      hasFill: false,
      path: "/flagged-posts",
      hasBadge: false,
      count: 11,
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
      count: 0,
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

    // {
    //   name: "Notifications",
    //   hasFill: false,
    //   path: "/notifications",
    //   hasBadge: false,
    //   count: 0,
    //   // items: [
    //   //   {
    //   //     name: "Create Fan",
    //   //     path: "/fans/new",
    //   //   },
    //   // ],
    //   icon: ({ className, color }: IconProps) => (
    //     <Bell className={className} color={color} />
    //   ),
    // },

    {
      name: "Settings",
      hasFill: false,
      path: "/settings",
      hasBadge: false,
      count: 0,
      items: [],
      icon: ({ className, color }: IconProps) => (
        <Settings className={cn(className, "stroke-[1.7]")} color={color} />
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
                {isActive ? (
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
                          {/* <Link
                          href={value?.path}
                          scroll
                          className="flex flex-row items-center"
                        >
                          
                        </Link> */}
                        </div>
                        {value?.hasBadge ? (
                          <div className="ml-auto">
                            <div className="h-5 w-7 bg-primary font-TTHovesDemiBold rounded-full flex flex-row items-center justify-center m-auto text-gray-200 dark:text-dark-gray-700 text-sm">
                              {formatCount(value?.count)}
                            </div>
                          </div>
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
