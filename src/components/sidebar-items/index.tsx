/** @format */

import { FC } from "react";
import { FolderRoot, Home, Settings } from "lucide-react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Icons } from "../Icons";
import { Text } from "@tremor/react";
interface SidebarItemsProps {
  handleNavigation: (val: string) => void;
}

type IconProps = {
  className: string;
  color: string;
};

const SidebarItems: FC<SidebarItemsProps> = ({ handleNavigation }) => {
  const pathname = usePathname();

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
    // {
    //   name: "Fans",
    //   hasFill: false,
    //   path: "/fans",
    //   icon: ({ className, color }: IconProps) => (
    //     <Medal className={className} color={color} />
    //   ),
    // },
    {
      name: "Schools",
      hasFill: false,
      path: "/schools",
      items: [
        {
          name: "Create School",
          path: "/schools/new",
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <Icons.school className={className} color={color} />
      ),
    },
    {
      name: "Skills",
      hasFill: false,
      path: "/skills",
      items: [
        // {
        //   name: "Create Skill",
        //   path: "/skills/new",
        // },
        {
          name: "Verification Request",
          path: "/skills/verification-request",
        },
      ],
      icon: ({ className, color }: IconProps) => (
        <FolderRoot className={className} color={color} />
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
        // const isActive = pathname.includes(val?.path);

        const parentPath = val?.path;
        let pathToCheck: any = parentPath?.split("?");
        pathToCheck = pathToCheck?.length ? pathToCheck[0] : null;
        const childPath = val?.items?.some((data: any) =>
          pathname.includes(data?.path)
        );
        const isActive = pathname.includes(pathToCheck) || childPath;

        const iconColor = "";
        const iconClass = `h-[19px] w-[19px] ${
          val?.hasFill
            ? "text-tremor-default fill-gray-700 dark:fill-white "
            : "text-tremor-default stroke-gray-700 dark:stroke-white"
        } ${
          isActive &&
          `${
            val?.hasFill
              ? " fill-gray-700 dark:fill-white"
              : "stroke-white stroke-gray-700 dark:stroke-white"
          }`
        }`;
        const Icon = () =>
          val?.icon({ className: iconClass, color: iconColor });
        return (
          <div key={index}>
            <div
              onClick={() => handleNavigation(val?.path)}
              className={`group ${
                isActive
                  ? "bg-primary"
                  : "bg-background dark:bg-dark-background"
              }  flex cursor-pointer items-center py-[8px] px-[16px] border rounded-lg mt-4 hover:scale-105 transition-transform ease-out duration-200`}
            >
              <Icon />
              <Text
                className={`text-[16px] dark:text-gray-200 text-gray-700 ${
                  isActive ? "text-gray-200 dark:text-dark-gray-700" : ""
                } ml-4 mt-[0px] text-tremor-default`}
              >
                {val?.name}
              </Text>
            </div>
            {isActive && val?.items?.length ? (
              <div className="pr-2 pl-5 pb-3 mt-2">
                {val?.items?.map((val, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        isActive && pathname === val.path ? "text-teal-700" : ""
                      } cursor-pointer text-[16px] text-tremor-default`}
                      onClick={() => handleNavigation(val?.path)}
                    >
                      {val?.name}
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

export default SidebarItems;
