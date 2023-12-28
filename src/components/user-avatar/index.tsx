/** @format */

"use client";

import { FC, ReactNode, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { observer } from "mobx-react-lite";

interface UserAvatarProps extends AvatarProps {
  avatar?: string;
  fallback?: string;
  fallbackType: "icon" | "name";
  icon?: ReactNode;
}

const UserAvatar: FC<UserAvatarProps> = ({
  icon,
  avatar,
  fallback,
  fallbackType = "name",
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <Avatar {...props}>
      {avatar ? (
        <div className="relative aspect-square h-full w-full shadow-xl">
          <Image
            onLoad={() => setLoading(false)}
            fill
            src={avatar}
            alt="profile"
            className={`${
              loading ? "blur-sm " : "blur-none"
            } object-cover shadow-xl`}
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </div>
      ) : (
        <AvatarFallback className="capitalize shadow-xl">
          {fallbackType === "icon" ? <>{icon}</> : <>{fallback}</>}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default observer(UserAvatar);
