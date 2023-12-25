/** @format */

"use client";

import { FC } from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Drawer from "../drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import UserAvatar from "../user-avatar";
import { LogOut } from "lucide-react";
import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";

interface NavbarProps {
  user?: any;
  isLoggedIn: boolean;
  isInitializing: boolean;
}

const Navbar: FC<NavbarProps> = ({ isInitializing, isLoggedIn }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const {
    authStore: { user },
  } = useRootStore();

  return (
    <header className="fixed top-0 supports-backdrop-blur:bg-background/60 inset-x-0 w-full z-50 border-b bg-background/95 backdrop-blur">
      <nav className="w-full h-16 mx-auto flex items-center px-[16px] md:px-6">
        <Link href="/dashboard" className="flex gap-2 items-center">
          <p className="hidde text-lg font-medium md:block">DynastyU</p>
        </Link>
        <div className="ml-auto flex items-center">
          <div className="ml-auto">
            {user ? (
              <>
                <div className="hidden lg:flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <UserAvatar
                        fallbackType="icon"
                        avatar={user.avatar as string}
                        fallback={`${user?.firstname?.charAt(
                          0
                        )} ${user?.surname?.charAt(0)}`}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={10}>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {user?.username && (
                            <p className="font-medium">@{user.username}</p>
                          )}
                          {user?.email && (
                            <p className="truncate w-[200px] text-sm text-zin-700">
                              {user?.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/coaches">Coaches</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={(event) => {
                          event.preventDefault();
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
                <Drawer />
              </>
            ) : (
              <Link href="/sign-in" className={buttonVariants()}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default observer(Navbar);
