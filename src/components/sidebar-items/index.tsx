/** @format */

import { FC } from "react";
import { FolderRoot, Home, Medal, Settings } from "lucide-react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Icons } from "../Icons";
import { Text } from "@tremor/react";
import SkillIcon from "../Icons/skill";
import { useRootStore } from "@/mobx";
import { Badge } from "@/components/ui/badge";
import { observer } from "mobx-react-lite";
import FlagOffIcon from "@/components/Icons/flag-off";
import ChevronDownIcon from "@/components/Icons/chevron-down";
import { cn } from "@/lib/utils";
import UseThemeColor from "@/hooks/useThemeColor";
interface SidebarItemsProps {
  handleNavigation: (val: string) => void;
}

type IconProps = {
  className: string;
  color: string;
};

const SidebarItems: FC<SidebarItemsProps> = ({ handleNavigation }) => {
  const {
    verificationRequestStore: { verificationRequest },
  } = useRootStore();
  const pathname = usePathname();

  const themeColor = UseThemeColor();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: ({ className, color }: IconProps) => (
        <Home className={className} color={color} />
      ),
      hasFill: false,
      items: [],
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
      icon: ({ className, color }: IconProps) => (
        <Icons.athlete className={className} color={color} />
      ),
    },
    {
      name: "Coaches",
      hasFill: true,
      path: "/coaches",
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
      items: [],
      icon: ({ className, color }: IconProps) => (
        <FlagOffIcon className={cn(className, "h-4 w-4")} color={color} />
      ),
    },
    {
      name: "Skill Types",
      hasFill: true,
      path: "/skill-types",
      items: [
        // {
        //   name: "Create Skill",
        //   path: "/skills/new",
        // },
        {
          name: "Verification Request",
          path: "/skill-types/verification-request",
          hasBadge: verificationRequest.length > 0 ? true : false,
          count: verificationRequest?.length,
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
      items: [],
      icon: ({ className, color }: IconProps) => (
        <Settings className={className} color={color} />
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
              onClick={() => handleNavigation(val?.path)}
              className={`group flex flex-row ${
                isActive
                  ? "bg-primary"
                  : "bg-background dark:bg-dark-background"
              }  flex cursor-pointer items-center py-[8px] px-[16px] border rounded-lg mt-4 hover:scale-105 transition-transform ease-out duration-200`}
            >
              <>
                <Icon />
                <Text
                  className={`text-[16px] dark:text-gray-200 text-gray-700 ${
                    isActive ? "text-gray-200 dark:text-dark-gray-700" : ""
                  } ml-4 mt-[0px] text-tremor-default`}
                >
                  {val?.name}
                </Text>
              </>
              {isActive ? (
                <ChevronDownIcon className="ml-auto h-5 w-5 stroke-gray-200 dark:stroke-gray-200" />
              ) : null}
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
                        } cursor-pointer text-[16px] text-tremor-default`}
                        onClick={() => handleNavigation(value?.path)}
                      >
                        {value?.name}
                      </div>
                      {value?.hasBadge ? (
                        <div className="ml-auto">
                          <Badge className="">{value?.count}</Badge>
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

export default observer(SidebarItems);
