/** @format */

import { FC } from "react";
import { FolderRoot, Home, Medal, Settings } from "lucide-react";
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
        // {
        //   name: "Create Skill",
        //   path: "/skills/new",
        // },
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
        const iconColor = "";
        let activeIconColor = "";

        if (isActive) {
          if (val?.hasFill) {
            activeIconColor = "fill-gray-700 dark:fill-white fill-white";
          } else {
            activeIconColor = "stroke-gray-700 dark:stroke-white stroke-white";
          }
        }
        const iconClass = `h-[19px] w-[19px] 
        ${
          val?.hasFill
            ? "fill-gray-700 dark:fill-white"
            : "stroke-gray-700 dark:stroke-white"
        } ${activeIconColor}
        `;
        const Icon = () =>
          val?.icon({ className: iconClass, color: iconColor });
        return (
          <div key={index}>
            <div
              key={index}
              onClick={(e) => {
                // handleNavigation();
              }}
              className={`group flex-row flex cursor-pointer items-center mt-4 hover:scale-105 transition-transform ease-linear duration-200`}
            >
              <div
                className={`flex flex-row w-full h-full py-[8px] px-[16px] rounded-lg items-center ${
                  isActive ? "bg-primary hover:bg-primary/90" : "bg-secondary"
                }`}
              >
                <Icon />
                <div
                  className={`text-[16px] dark:text-gray-200 text-gray-700 ${
                    isActive ? "text-primary-foreground" : ""
                  } ml-4 mt-[0px] text-base`}
                >
                  <Link
                    className={`text-[16px]  ${
                      isActive
                        ? "text-gray-200"
                        : "dark:text-gray-200 text-gray-700"
                    } ml-4 mt-[0px] text-base`}
                    key={index}
                    href={val?.path}
                    scroll={true}
                  >
                    {val?.name}
                  </Link>
                </div>
                {isActive && val?.hasBadge ? (
                  <div className="ml-auto">
                    <div className="h-5 w-7 bg-teal-500 rounded-lg flex flex-row items-center justify-center m-auto text-gray-200 dark:text-dark-gray-700 text-sm">
                      {formatCount(val?.count)}
                    </div>
                  </div>
                ) : (
                  <ChevronDownIcon className="ml-auto h-5 w-5 stroke-gray-200 dark:stroke-gray-200" />
                )}
              </div>
            </div>
            {isActive && val?.items?.length ? (
              <div className="pr-2 pl-4 pb-3 mt-4">
                {val?.items?.map((value: any, index) => {
                  return (
                    <div key={index} className="flex flex-row items-center">
                      <div
                        className={`${
                          isActive && pathname === value?.path
                            ? "text-teal-700"
                            : ""
                        } cursor-pointer text-base`}
                        // onClick={() => handleNavigation()}
                      >
                        <Link
                          href={value?.path}
                          scroll
                          className="flex flex-row items-center"
                        >
                          {value?.name}
                        </Link>
                      </div>
                      {value?.hasBadge ? (
                        <div className="ml-auto">
                          <div className="h-5 w-7 bg-primary rounded-full flex flex-row items-center justify-center m-auto text-gray-200 dark:text-dark-gray-700 text-sm">
                            {formatCount(value?.count)}
                          </div>
                        </div>
                      ) : null}
                    </div>
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
