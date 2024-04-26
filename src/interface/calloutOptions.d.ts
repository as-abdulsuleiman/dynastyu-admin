/** @format */

import { CalloutProps } from "@tremor/react";

export interface CalloutCardProps {
  title: string;
  className?: string;
  icon?: CalloutProps["icon"];
  color?: CalloutProps["color"];
  type: "link" | "string" | "flag";
  flagUrl?: string;
  content: string | null | undefined;
}
