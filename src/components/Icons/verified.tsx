/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const VerifiedIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#67A6F0"
        fillRule="evenodd"
        d="M5.735 2.533A2.993 2.993 0 018 1.5c.905 0 1.715.4 2.265 1.033a2.993 2.993 0 012.332.871 2.995 2.995 0 01.871 2.331A2.992 2.992 0 0114.5 8a2.993 2.993 0 01-1.033 2.265 2.994 2.994 0 01-1.942 3.02c-.402.15-.832.213-1.26.182A2.993 2.993 0 018 14.5a2.993 2.993 0 01-2.265-1.033 2.993 2.993 0 01-3.021-1.942 2.994 2.994 0 01-.182-1.26A2.994 2.994 0 011.5 8c0-.905.4-1.715 1.033-2.265a2.993 2.993 0 01.871-2.331 2.993 2.993 0 012.331-.871zm4.672 4.258a.5.5 0 10-.814-.582L7.436 9.23 6.353 8.147a.5.5 0 00-.706.706l1.5 1.5a.5.5 0 00.76-.062l2.5-3.5z"
        clipRule="evenodd"
      ></path>
      <g clipPath="url(#xknwwz1dha)">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5.676 8.218l1.806 1.515 3.03-3.611"
        ></path>
      </g>
      <defs>
        <clipPath id="xknwwz1dha">
          <path fill="#fff" d="M0 0h8v8H0z" transform="translate(4 4)"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(VerifiedIcon);
