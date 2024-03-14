/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const Notification = (props: LucideProps) => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      d="M14.836 17.625C14.836 19.489 13.566 21 12 21c-1.566 0-2.836-1.511-2.836-3.375m8.507-8.775c0-1.552-.597-3.04-1.66-4.137A5.585 5.585 0 0 0 12 3a5.585 5.585 0 0 0-4.01 1.713A5.945 5.945 0 0 0 6.329 8.85c0 2.567-.535 4.444-1.203 5.788-.76 1.53-1.14 2.296-1.126 2.48.018.208.05.274.192.399.124.108.75.108 2.003.108h11.61c1.253 0 1.879 0 2.003-.108.143-.125.174-.19.192-.4.015-.183-.366-.948-1.126-2.48-.668-1.343-1.203-3.22-1.203-5.787Z"
      stroke={props.color || "#fff"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx={18}
      cy={6}
      r={4}
      // fill={props.color || "#FF4747"}
      // stroke="#50383A"
      strokeWidth={2.5}
    />
  </svg>
);

export default memo(Notification);
