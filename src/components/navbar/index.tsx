/** @format */

"use client";

import { FC } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import UserAvatar from "../user-avatar";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import { Icons } from "../Icons";
import Notification from "../Icons/notification";
import MenuIcon from "@/components/Icons/menu";
import {
  SortOrder,
  useGetSkillVerificationRequestsQuery,
} from "@/services/graphql";
import UseThemeColor from "@/hooks/useThemeColor";
import LogOut from "@/components/Icons/log-out";
import { Skeleton } from "../ui/skeleton";
interface NavbarProps {
  user?: any;
  isLoggedIn?: boolean;
  isInitializing?: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ setSidebarOpen, sidebarOpen }) => {
  const { logout, isInitializing } = useAuth();
  const router = useRouter();
  const {
    authStore: { user },
    skillVerificationRequestStore: {
      setSkillVerificationRequest,
      setLoading,
      skillVerificationRequest,
    },
  } = useRootStore();
  const themeColor = UseThemeColor();
  const { data, loading } = useGetSkillVerificationRequestsQuery({
    variables: {
      where: {
        verified: {
          equals: false,
        },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    fetchPolicy: "cache-first",
    pollInterval: 30 * 1000,
    onCompleted: (data) => {
      setSkillVerificationRequest(data?.skillVerificationRequests as any);
      setLoading(loading);
    },
  });

  const showNotificationBadge = skillVerificationRequest?.length;

  const renderNotificationSection = () => {
    return (
      <div
        className="relative flex h-[31px] w-[31px] items-center justify-center rounded-full border-[0.5px] bg-[#14b8a6] mr-3"
        onClick={() => router.push(`/skill-types/verification-request`)}
      >
        <span
          className={`absolute top-0 right-0 z-1 h-[10px] w-[10px] rounded-full bg-[#DC3545] ${
            !showNotificationBadge ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-[#DC3545] opacity-75"></span>
        </span>
        <Notification
          className="h-[20px] w-[20px] cursor-pointer"
          color={"#fff"}
        />
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-[100] flex w-full supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
      <nav className="w-full h-16 mx-auto flex items-center px-[16px] md:px-6 ">
        <MenuIcon
          className="z-99999 block lg:hidden"
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        />

        {isInitializing ? (
          <div className="flex flex-row justify-center items-center ml-auto">
            <Skeleton className="shadow h-[31px] w-[31px] rounded-full relative mr-3">
              <span
                className={`absolute top-0 right-0 z-1 h-[10px] w-[10px] rounded-full bg-[#706F70] ${
                  !showNotificationBadge ? "hidden" : "inline"
                }`}
              >
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-[#706F70] opacity-75"></span>
              </span>
            </Skeleton>
            <Skeleton className="shadow h-[49px] w-[49px] rounded-full" />
          </div>
        ) : (
          <div className="ml-auto flex items-center">
            {renderNotificationSection()}
            <div className="ml-auto">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <UserAvatar
                      className="shadow h-[49px] w-[49px]"
                      icon={<Icons.user className="h-4 w-4" />}
                      fallbackType="icon"
                      avatar={user?.avatar as string}
                      fallback={`${user?.firstname?.charAt(
                        0
                      )} ${user?.surname?.charAt(0)}`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={10}>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user?.username && (
                          <p className="font-medium">@{user?.username}</p>
                        )}
                        {user?.email && (
                          <p className="truncate w-[200px] text-sm text-zin-700">
                            {user?.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/coaches">Coaches</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={(event) => {
                        // event?.preventDefault();
                        logout();
                        router.push("/sign-in");
                      }}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default observer(Navbar);
