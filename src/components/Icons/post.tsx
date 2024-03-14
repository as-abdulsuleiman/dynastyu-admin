/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const PostIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <g
      stroke={props?.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      clipPath="url(#8zl4ee8qda)"
    >
      <path d="M2.5 6V4.5c0-.398.138-.78.384-1.06.247-.282.58-.44.929-.44H9.5M8.187 1.5L9.5 3 8.187 4.5M9.5 6v1.5c0 .398-.138.78-.384 1.06-.247.282-.58.44-.928.44H2.5m1.313 1.5L2.5 9l1.313-1.5"></path>
    </g>
    <defs>
      <clipPath id="8zl4ee8qda">
        <path fill="#fff" d="M0 0h12v12H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default memo(PostIcon);
