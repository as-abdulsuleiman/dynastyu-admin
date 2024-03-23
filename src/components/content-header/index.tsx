/** @format */

import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContentHeaderProps {
  title: string;
  subHeader?: string;
  className?: string;
  icon?: ReactNode;
}

const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  subHeader,
  className,
  icon,
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-row items-center">
        <div className="text-lg font-TTHovesDemiBold">{title}</div>
        <div className="ml-2">{icon}</div>
      </div>
      <div className="text-sm font-TTHovesRegular">{subHeader}</div>
    </div>
  );
};

export default ContentHeader;
