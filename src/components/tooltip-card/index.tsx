/** @format */

"use client";

import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface TooltipProps {
  trigger: React.ReactNode;
  message: JSX.Element | string;
}
const TooltipCard: FC<TooltipProps> = ({ trigger, message }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent className="rounded-tremor-default cursor-pointer bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card">
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCard;
