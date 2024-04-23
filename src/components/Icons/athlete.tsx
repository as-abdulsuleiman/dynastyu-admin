/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const Athlete = (props: LucideProps) => (
  <svg width={24} height={24} fill="none" viewBox="0 0 16 16" {...props}>
    <g
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      clipPath="url(#a)"
    >
      <path d="m10 6-4 4M6.667 8 8 9.333M8 6.667 9.333 8M5.333 14A3.333 3.333 0 0 0 2 10.667" />
      <path d="M10.667 2A8.666 8.666 0 0 0 2 10.667 3.333 3.333 0 0 0 5.333 14 8.666 8.666 0 0 0 14 5.333 3.333 3.333 0 0 0 10.667 2" />
      <path d="M10.667 2A3.333 3.333 0 0 0 14 5.333" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default memo(Athlete);
