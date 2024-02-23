/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const TwitterIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={props.color || "#8d97a5"}
        strokeMiterlimit="10"
        d="M6 3C4.355 3 3 4.355 3 6v12c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V6c0-1.645-1.355-3-3-3zm0 2h12c.565 0 1 .435 1 1v12c0 .565-.435 1-1 1H6c-.565 0-1-.435-1-1V6c0-.565.435-1 1-1zm.701 2l3.942 5.633L6.906 17h1.332l3.002-3.516L13.697 17h3.84l-4.185-5.99L16.773 7h-1.31l-2.703 3.16L10.553 7zm1.865.988h1.487l5.63 8.024h-1.495z"
        fontFamily="none"
        fontSize="none"
        fontWeight="none"
        textAnchor="none"
        transform="scale(10.66667)"
      ></path>
    </svg>
  );
};

export default memo(TwitterIcon);
