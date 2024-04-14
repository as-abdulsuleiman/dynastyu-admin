/** @format */

"use client";

import { FC, ReactNode, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { observer } from "mobx-react-lite";
import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends AvatarProps {
  avatar?: string;
  fallback?: string;
  fallbackType: "icon" | "name";
  icon?: ReactNode;
  width?: number;
  height?: number;
  fallbackClassName?: string;
  type?: "image" | "video";
}

const UserAvatar: FC<UserAvatarProps> = ({
  icon,
  width,
  avatar,
  height,
  type = "image",
  fallback,
  fallbackType = "name",
  fallbackClassName,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  const renderVideoThumbnail = (url: string) => {
    return (
      <>
        {url ? (
          <div className=" absolute inset-0 w-full h-full">
            <ReactPlayer
              muted
              playing={false}
              controls={false}
              url={avatar}
              width="100%"
              height="100%"
              wrapper={(props) => (
                <div
                  {...props}
                  className="h-[100%] w-[100%]"
                  style={{ width: "auto", height: "auto" }}
                ></div>
              )}
            />
          </div>
        ) : (
          <>{renderEmptyMedia()}</>
        )}
      </>
    );
  };

  const renderEmptyMedia = () => {
    return (
      <AvatarFallback
        className={cn(
          "capitalize text-xs h-[79px] w-[79px]",
          fallbackClassName
        )}
      >
        {fallbackType === "icon" ? (
          <div className="flex h-full w-full flex-row items-center justify-center m-auto absolute inset-0">
            {icon}
          </div>
        ) : (
          <>{fallback}</>
        )}
      </AvatarFallback>
    );
  };
  const renderImageThumbnail = (url: string) => {
    return (
      <>
        {url ? (
          <Image
            onLoad={() => setLoading(false)}
            width={width || 110}
            height={height || 110}
            quality={100}
            src={url}
            alt="profile"
            className={`${loading ? "blur-sm " : "blur-none"} object-cover `}
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        ) : (
          <>{renderEmptyMedia()}</>
        )}
      </>
    );
  };

  return (
    <Avatar {...props}>
      {type === "image" ? (
        <>{renderImageThumbnail(avatar as string)}</>
      ) : (
        <>{renderVideoThumbnail(avatar as string)}</>
      )}
    </Avatar>
  );
};

export default observer(UserAvatar);
