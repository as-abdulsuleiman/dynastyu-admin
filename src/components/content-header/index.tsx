import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface SubItem {
  title: string;
  content: string;
}

interface ContentHeaderProps {
  title: string;
  subHeader?: string;
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
      {subHeader ? (
        <h1 className={`text-sm font-TTHovesRegular`}>{subHeader || ""}</h1>
      ) : null}
      {subItems?.length ? (
        <div className="flex flex-col">
          {subItems?.map((item, index) => (
            <div key={index} className="text-sm font-TTHovesRegular">
              <div className="text-sm font-TTHovesRegular">
                <strong>{item?.title}</strong>
                <span className="ml-2">{item?.content}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ContentHeader;
