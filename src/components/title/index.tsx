/** @format */

import { cn } from "@/lib/utils";
import { FC } from "react";

interface TitleProps {
  title: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ title, className }) => {
  return <div className={cn("", className)}>{title}</div>;
};

export default Title;
