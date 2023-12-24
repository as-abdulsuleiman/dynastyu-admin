/** @format */

"use client";

import { FC } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  avatar?: string;
  fallback: string;
  fallbackType: "icon" | "name";
}

const UserAvatar: FC<UserAvatarProps> = ({
  avatar,
  fallback,
  fallbackType = "name",
  ...props
}) => {
  return (
    <Avatar {...props}>
      {avatar ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={avatar}
            alt="profile"
            className="object-cover"
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </div>
      ) : (
        <AvatarFallback className="capitalize">
          {fallbackType === "icon" ? (
            <User className="h-4 w-4" />
          ) : (
            <>{fallback}</>
          )}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
