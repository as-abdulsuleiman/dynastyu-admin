/** @format */

import { FC } from "react";
import { Callout } from "@tremor/react";
import { cn } from "@/lib/utils";
import Flag from "../flag";
import { CalloutCardProps } from "@/interface/calloutOptions";

const CalloutCard: FC<CalloutCardProps> = ({
  type = "string",
  icon,
  color,
  title,
  flagUrl,
  content,
  className,
}) => {
  const renderContent = () => {
    if (type === "flag") {
      return (
        <span className="flex flex-row items-center font-TTHovesRegular">
          <>{content}</>
          {flagUrl ? (
            <Flag flag={flagUrl as string} alt={content as string} />
          ) : null}
        </span>
      );
    } else if (type === "link") {
      return (
        <input
          onClick={() => {
            window.open(content as string, "_blank");
          }}
          className="border-none right-0 font-TTHovesRegular rounded-none bg-transparent w-full focus-visible:outline-none cursor-pointer focus-visible:ring-0"
          readOnly
          type="url"
          defaultValue={content as string}
        />
      );
    } else {
      return <span className="font-TTHovesRegular"> {content}</span>;
    }
  };

  return (
    <Callout
      className={cn("mt-4 font-TTHovesRegular", className)}
      title={title}
      icon={icon}
      color={color || "teal"}
    >
      {renderContent()}
    </Callout>
  );
};

export default CalloutCard;
