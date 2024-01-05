/** @format */

"use client";

import { FC } from "react";
import { FolderRoot, Home, Settings } from "lucide-react";
import { usePathname, useParams } from "next/navigation";
import ThemeToggle from "../theme-toggle";
import { observer } from "mobx-react-lite";
import { Icons } from "../Icons";
import Link from "next/link";
import { Text } from "@tremor/react";

interface SideBarProps {}
type IconProps = {
  className: string;
  color: string;
};

const SideBar: FC<SideBarProps> = ({}) => {
  const pathname = usePathname();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: ({ className, color }: IconProps) => (
        <Home className={className} color={color} />
      ),
      hasFill: false,
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
      icon: ({ className, color }: IconProps) => (
        <Icons.athlete className={className} color={color} />
      ),
    },
    {
      name: "Coaches",
      hasFill: true,
      path: "/coaches",
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
      icon: ({ className, color }: IconProps) => (
        <Icons.school className={className} color={color} />
      ),
    },
    // {
    //   name: "Skills",
    //   hasFill: false,
    //   path: "/skills",
    //   icon: ({ className, color }: IconProps) => (
    //     <FolderRoot className={className} color={color} />
    //   ),
    // },
    {
      name: "Settings",
      hasFill: false,
      path: "/settings",
      icon: ({ className, color }: IconProps) => (
        <Settings className={className} color={color} />
      ),
    },
  ];
  return (
    <div className="w-full px-6 pt-16 pb-8 h-full shadow-xl">
      <div className="relative w-full h-full">
        <div className="pt-[60px]">
          {items?.map((val, index) => {
            const isActive = pathname === val?.path;
            const iconColor = "";
            const iconClass = `h-[19px] w-[19px] ${
              val?.hasFill
                ? "group-hover:fill-teal-600  text-tremor-default fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis "
                : "group-hover:stroke-teal-600 text-tremor-default stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis"
            } ${
              isActive &&
              `${
                val?.hasFill
                  ? "fill-tremor-content-teal dark:fill-dark-tremor-content-teal"
                  : "stroke-tremor-content-teal dark:stroke-dark-tremor-content-teal"
              }`
            }`;
            const Icon = () =>
              val?.icon({ className: iconClass, color: iconColor });
            return (
              <Link
                href={val.path}
                shallow={false}
                scroll={true}
                key={index}
                prefetch={true}
              >
                <div
                  className={`group ${
                    isActive
                      ? "bg-secondary"
                      : "bg-background dark:bg-dark-background"
                  } "bg-background dark:bg-dark-background flex cursor-pointer items-center py-[6px] px-[16px] border rounded-sm mt-4 hover:scale-105 transition-transform ease-out duration-200`}
                >
                  <Icon />
                  <Text
                    className={`${
                      isActive
                        ? "text-tremor-content-teal dark:text-dark-tremor-content-teal"
                        : "text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-teal group-hover:text-tremor-content-teal"
                    } ml-4 mt-[0px] text-3xl`}
                  >
                    {val?.name}
                  </Text>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="absolute bottom-0">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default observer(SideBar);
