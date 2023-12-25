/** @format */

"use client";

import { FC } from "react";
import { Grid2X2, Home, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ThemeToggle from "../theme-toggle";
import { observer } from "mobx-react-lite";

interface SideBarProps {}
type IconProps = {
  className: string;
  color: string;
};

const SideBar: FC<SideBarProps> = ({}) => {
  const router = useRouter();
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
    // {
    //   name: "Athletes",
    //   hasFill: false,
    //   path: "/athletes",
    //   icon: ({ className, color }: IconProps) => (
    //     <Medal className={className} color={color} />
    //   ),
    // },
    {
      name: "Coaches",
      hasFill: false,
      path: "/coaches",
      icon: ({ className, color }: IconProps) => (
        <Grid2X2 className={className} color={color} />
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
    // {
    //   name: "Schools",
    //   hasFill: false,
    //   path: "/schools",
    //   icon: ({ className, color }: IconProps) => (
    //     <School className={className} color={color} />
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
    <div className="w-full px-6 pt-16 pb-8 h-full">
      <div className="relative w-full h-full">
        <div className="pt-[55px]">
          {items?.map((val, index) => {
            const isActive = pathname === val?.path;
            const iconClass = `h-3 w-3 sm:h-4 sm:w-4 ${
              val?.hasFill
                ? "group-hover:fill-[#2BD984] text-[#717070] group-hover:text-[#2BD984] fill-[#717070]"
                : "group-hover:stroke-[#2BD984] text-[#717070] group-hover:text-[#2BD984] stroke-[#717070]"
            } ${
              isActive
                ? `${val?.hasFill ? "fill-[#2BD984]" : "stroke-[#2BD984]"}`
                : `${val?.hasFill ? "fill-[#D8D3CB]" : "stroke-[#D8D3CB]"}`
            }`;
            const Icon = () => val?.icon({ className: iconClass, color: "" });
            return (
              <div
                key={index}
                className="mt-4"
                onClick={() => router?.push(val.path, { scroll: true })}
              >
                <div
                  className={`group ${
                    isActive ? "bg-[#dc2626]" : "bg-transparent"
                  }  flex cursor-pointer items-center border rounded-md py-[6px] px-[16px]`}
                >
                  <Icon />
                  <div
                    className={`${
                      isActive ? "text-[#e5e7eb]" : ""
                    } ml-3 mt-[0px]`}
                  >
                    {val?.name}
                  </div>
                </div>
              </div>
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
