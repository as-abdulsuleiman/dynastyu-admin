/** @format */

"use client";

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
import { useRootStore } from "@/mobx";
import UserAvatar from "../user-avatar";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, isLoggedIn, isInitializing } = useAuth();

  const {
    authStore: { user },
  } = useRootStore();
  const router = useRouter();

  return (
    <header className="fixed top-0 supports-backdrop-blur:bg-background/60 inset-x-0 w-full z-50 border-b bg-background/95 backdrop-blur">
      <nav className="w-full h-16 mx-auto flex items-center px-[16px] md:px-6">
        <Link href="/dashboard" className="flex gap-2 items-center">
          <p className="hidde text-lg font-medium md:block">DynastyU</p>
        </Link>
        <div className="ml-auto flex items-center">
          <div className="hidden lg:flex">
            {isLoggedIn && !isInitializing ? (
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

                  {/* 
                  <DropdownMenuItem asChild>
                    <Link href="/r/create">Create community</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem> */}

                  {/* <DropdownMenuSeparator /> */}

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
            ) : (
              // <Menubar className="rounded-none border-none border-0 right-0">
              //   <MenubarMenu>
              //     <MenubarTrigger className="cursor-pointer rounded-none border-none border-0 right-0 data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent focus-within:bg-transparent focus-visible:bg-transparent active:bg-transparent">
              //       <Avatar>
              //         <AvatarImage
              //           className="cursor-pointer"
              //           src="https://github.com/shadcn.png"
              //           alt="@shadcn"
              //         />
              //         <AvatarFallback>CN</AvatarFallback>
              //       </Avatar>
              //     </MenubarTrigger>
              //     <MenubarContent
              //       side="bottom"
              //       align="center"
              //       sideOffset={0}
              //       alignOffset={-100}
              //     >
              //       <MenubarItem>
              //         New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              //       </MenubarItem>
              //       <MenubarItem>
              //         New Window <MenubarShortcut>⌘N</MenubarShortcut>
              //       </MenubarItem>
              //       <MenubarItem disabled>New Incognito Window</MenubarItem>
              //       <MenubarSeparator />
              //       <MenubarItem>
              //       Logout
              //       </MenubarItem>
              //     </MenubarContent>
              //   </MenubarMenu>
              // </Menubar>
              // <Button
              //   onClick={async () => {
              //     logout();
              //     router.push("/sign-in");
              //   }}
              // >
              //   Logout
              // </Button>
              <Link href="/sign-in" className={buttonVariants()}>
                Sign In
              </Link>
            )}
          </div>
          <Drawer />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
