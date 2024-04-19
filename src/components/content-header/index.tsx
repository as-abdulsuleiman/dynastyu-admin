import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface SubItem {
  [key: string]: ReactNode | string;
}

interface ContentHeaderProps {
  title: string;
  subHeader?: string | ReactNode;
  className?: string;
  icon?: ReactNode;
  subItems?: SubItem[];
}

const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  subHeader,
  className,
  icon,
  subItems,
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-row items-center">
        <h3 className={`text-lg font-TTHovesDemiBold`}>{title}</h3>
        {icon ? <div className="">{icon}</div> : null}
      </div>
      {subItems ? (
        <div>
          {subItems?.map((item, index) => (
            <div key={index} className="text-sm font-TTHovesRegular">
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="flex">
                  <strong>{key}:</strong>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h1 className={`text-sm font-TTHovesRegular`}>{subHeader || ""}</h1>
      )}
    </div>
  );
};

export default ContentHeader;
