/** @format */

import { FC } from "react";
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
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "../Icons";
import { observer } from "mobx-react-lite";
import { User } from "lucide-react";

interface UserAccountNavProps {}

const UserAccountNav: FC<UserAccountNavProps> = ({}) => {
  const { logout } = useAuth();
  const router = useRouter();
  const {
    authStore: { user },
  } = useRootStore();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Athletes", path: "/athletes" },
    { name: "Coaches", path: "/coaches" },
    { name: "Fans", path: "/fans" },
    // { name: "Schools", path: "/schools" },
    { name: "Settings", path: "/settings" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="shadow h-[49px] w-[49px]"
          icon={<User className="h-5 w-5" />}
          fallbackType="icon"
          avatar={user?.avatar as string}
          fallback={`${user?.firstname?.charAt(0)} ${user?.surname?.charAt(0)}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.username && <p className="font-medium">@{user?.username}</p>}
            {user?.email && (
              <p className="truncate w-[200px] text-sm text-zin-700">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {navItems.map((val, index) => {
          return (
            <DropdownMenuItem key={index} asChild className="cursor-pointer">
              <Link href={val?.path}>{val?.name}</Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            // event?.preventDefault();
            logout();
            router.push("/sign-in");
          }}
          className="cursor-pointer"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Sign out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(UserAccountNav);
