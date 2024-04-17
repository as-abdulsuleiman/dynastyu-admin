import React, { FC, ReactNode } from "react";
import { Badge, BadgeProps } from "@tremor/react";

interface BadgeCardProps {
  className?: string;
  icon?: BadgeProps["icon"] | any;
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
    <div>
      <Badge
        size={size}
        datatype={datatype}
        className={`${className} cursor-pointer flex text-sm font-TTHovesRegular`}
        color={color}
        icon={icon}
      >
        {children}
      </Badge>
    </div>
  );
};

export default BadgeCard;
