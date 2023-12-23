/** @format */

"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Grid2X2, Home, LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useRootStore } from "@/mobx";

interface DrawerProps {}

type IconProps = {
  className: string;
  color: string;
};

const Drawer: FC<DrawerProps> = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const {
    authStore: { user },
  } = useRootStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  ];
  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild>
        <div className="w-[40px] h-[40px] border flex lg:hidden items-center justify-center cursor-pointer rounded-md">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] h-full">
        <SheetHeader>
          <SheetTitle className="text-lg font-medium md:block text-left mt-[-6px] ml-[-8px]">
            DynastyU
          </SheetTitle>
        </SheetHeader>
        <div className="w-full pb-8 h-full ml-[-8px]">
          <div className="relative w-full h-full pt-[55px]">
            {items?.map((val, index) => {
              const isActive = pathname === val.path;
              const iconClass = `h-3 w-3 sm:h-4 sm:w-4 ${
                val?.hasFill
                  ? "group-hover:fill-[#2BD984] text-[#717070] group-hover:text-[#2BD984] fill-[#717070]"
                  : "group-hover:stroke-[#2BD984] text-[#717070] group-hover:text-[#2BD984] stroke-[#717070]"
              } ${
                isActive
                  ? `${val.hasFill ? "fill-[#2BD984]" : "stroke-[#2BD984]"}`
                  : `${val.hasFill ? "fill-[#D8D3CB]" : "stroke-[#D8D3CB]"}`
              }`;
              const Icon = () => val?.icon({ className: iconClass, color: "" });
              return (
                <div
                  key={index}
                  className="mt-4"
                  onClick={() => {
                    router.push(val?.path);
                    setIsOpen(!isOpen);
                  }}
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
                      } ml-3 mt-[0px] my-0`}
                    >
                      {val?.name}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="absolute bottom-[8px]">
              <div className="flex w-full flex-col">
                <Button
                  className="mb-5"
                  onClick={async () => {
                    logout();
                    router.push("/sign-in");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
