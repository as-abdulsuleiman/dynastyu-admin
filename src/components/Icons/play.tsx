/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const PlayIcon = (props: LucideProps) => (
  <svg width={24} height={24} fill="none" viewBox="0 0 12 12" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 2.827a.938.938 0 0 1 1.39-.822l5.77 3.174a.937.937 0 0 1 0 1.643L3.64 9.996a.938.938 0 0 1-1.39-.822V2.827Z"
      fill={props.color || "#8D97A5"}
    />
  </svg>
);

export default memo(PlayIcon);
