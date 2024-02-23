/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const ProfileIcon = (props: LucideProps) => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
      fill={props.color || "#8D97A5"}
    />
  </svg>
);

export default memo(ProfileIcon);
