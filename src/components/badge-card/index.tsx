/** @format */

import React, { FC, ReactNode } from "react";
import { Badge, BadgeProps } from "@tremor/react";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  className?: string;
  icon?: BadgeProps["icon"];
  color?: BadgeProps["color"];
  size?: BadgeProps["size"];
  datatype?: string;
  children?: ReactNode;
}
const BadgeCard: FC<BadgeCardProps> = ({
  className,
  icon,
  color,
  datatype,
  size,
  children,
}) => {
  return (
    <Badge
      size={size}
      datatype={datatype}
      className={cn(
        "cursor-pointer flex text-sm font-TTHovesRegular",
        className
      )}
      color={color}
      icon={icon}
    >
      {children}
    </Badge>
  );
};

export default BadgeCard;
