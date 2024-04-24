import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const PlayCircle = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-play"
    {...props}
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export default memo(PlayCircle);
