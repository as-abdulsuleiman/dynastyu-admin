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
import { Grid2X2, Home, LogOut, Menu, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import SidebarItems from "../sidebar-items";

interface DrawerProps {}

const Drawer: FC<DrawerProps> = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const {
    authStore: { user },
  } = useRootStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild>
        <div className="w-[40px] h-[40px] border flex lg:hidden items-center justify-center cursor-pointer rounded-md">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] h-full">
        <SheetHeader>
          <SheetTitle className="text-lg font-medium md:block text-left mt-[-34.5px] ml-[0px]">
            <Image
              src="/images/dynastyu-logo.webp"
              alt="dynastyu-logo"
              title="dynastyu-logo"
              width={111}
              height={111}
              quality={100}
              className="object-cover h-auto w-auto"
              priority
            />
          </SheetTitle>
        </SheetHeader>
        <div className="w-full pb-8 h-full ml-[-8px]">
          <div className="relative w-full h-full pt-[55px]">
            <SidebarItems
              handleNavigation={(val) => {
                router.push(val);
                setIsOpen(false);
              }}
            />
            <div className="absolute bottom-[8px] w-full flex  justify-start items-start">
              <div className="flex w-full flex-col">
                <Button
                  className="mb-6"
                  variant="default"
                  onClick={async () => {
                    logout();
                    router.push("/sign-in");
                  }}
                >
                  <div className="flex items-center justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </div>
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

export default observer(Drawer);
