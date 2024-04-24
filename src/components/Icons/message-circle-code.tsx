import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const MessageCircleCode = (props: LucideProps) => (
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
    className="lucide lucide-message-circle-code"
    {...props}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="m10 10-2 2 2 2" />
    <path d="m14 10 2 2-2 2" />
  </svg>
);

export default memo(MessageCircleCode);
