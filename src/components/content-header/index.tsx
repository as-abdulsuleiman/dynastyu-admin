/** @format */

import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContentHeaderProps {
  title: string;
  subHeader?: string;
  className?: string;
  icon?: ReactNode;
  isIcon?: boolean;
  isSubItem?: boolean;
  renderSubItem?: ReactNode;
}

const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  subHeader,
  className,
  icon,
  isIcon,
  isSubItem = false,
  renderSubItem,
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-row items-center">
        <h3 className={`text-lg font-TTHovesDemiBold`}>{title}</h3>
        {isIcon ? <div className="">{icon}</div> : null}
      </div>
      {isSubItem ? (
        <div>{renderSubItem}</div>
      ) : (
        <h1 className={`text-sm font-TTHovesRegular`}>{subHeader}</h1>
      )}
    </div>
  );
};

export default ContentHeader;
