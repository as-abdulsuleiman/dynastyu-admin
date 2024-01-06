/** @format */

"use client";

import { FC } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HoverOnCardProps {
  trigger: React.ReactNode | JSX.Element;
  content: JSX.Element | string;
  contentClass?: string;
}

const HoverOnCard: FC<HoverOnCardProps> = ({
  trigger,
  content,
  contentClass,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent
        className={`w-auto rounded-tremor-default cursor-pointer ${contentClass}`}
      >
        <div className="flex flex-row w-full">{content}</div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverOnCard;
