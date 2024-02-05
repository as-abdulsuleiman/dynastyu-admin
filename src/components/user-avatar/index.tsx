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
  width?: number;
  height?: number;
  fallbackClassName?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({
  icon,
  avatar,
  fallback,
  fallbackType = "name",
  height,
  width,
  fallbackClassName,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <Avatar {...props}>
      {avatar ? (
        <Image
          onLoad={() => setLoading(false)}
          width={width || 110}
          height={height || 110}
          src={avatar}
          alt="profile"
          className={`${loading ? "blur-sm " : "blur-none"} object-cover `}
          referrerPolicy="no-referrer"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
      ) : (
        <AvatarFallback
          className={`capitalize text-xs h-[59px] w-[59px] ${fallbackClassName}`}
        >
          {fallbackType === "icon" ? <>{icon}</> : <>{fallback}</>}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default observer(UserAvatar);
