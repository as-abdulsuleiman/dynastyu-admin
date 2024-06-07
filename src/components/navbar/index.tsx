/** @format */

"use client";

import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import { MenuIcon, PanelRightOpenIcon } from "@/components/Icons";
import {
  SortOrder,
  useGetSkillVerificationRequestsQuery,
} from "@/services/graphql";
import UseThemeColor from "@/hooks/useThemeColor";
import { Skeleton } from "../ui/skeleton";
import UserAccountNav from "../user-account-nav";
import DropdownNotification from "../dropdown-notification";
import { getPermission } from "@/lib/helpers";
import Accesscontrol from "../accesscontrol";
interface NavbarProps {
  user?: any;
  isLoggedIn?: boolean;
  isInitializing?: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ setSidebarOpen, sidebarOpen }) => {
  const { isInitializing } = useAuth();
  const themeColor = UseThemeColor();
  const router = useRouter();
  const {
    authStore: { user },
  } = useRootStore();

  const permissionName = getPermission(
    user?.role?.permissions,
    "notifications.accesslevel.update"
  );

  return (
    <header className="sticky top-0 z-20 flex w-full supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
      <nav className="w-full h-16 mx-auto flex items-center px-[16px] md:px-6 ">
        <PanelRightOpenIcon
          className="z-99999 block lg:hidden cursor-pointer"
          aria-controls="sidebar"
          strokeWidth="1.5"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        />
        {isInitializing ? (
          <div className="flex flex-row justify-center items-center ml-auto">
            <Skeleton className="shadow h-[31px] w-[31px] rounded-full relative mr-3">
              <span className="absolute top-0 right-0 z-1 h-[10px] w-[10px] rounded-full bg-[#706F70] hidden">
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-[#706F70] opacity-75"></span>
              </span>
            </Skeleton>
            <Skeleton className="shadow h-[49px] w-[49px] rounded-full" />
          </div>
        ) : (
          <div className="ml-auto flex items-center">
            <Accesscontrol name={permissionName}>
              <DropdownNotification />
            </Accesscontrol>
            <div className="ml-auto">
              <div className="flex items-center">
                <UserAccountNav />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default observer(Navbar);
