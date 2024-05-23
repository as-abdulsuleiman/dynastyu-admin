/** @format */

import { FC } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { cn } from "@/lib/utils";

interface TabCardProps {
  tabs: Tabs[];
  tabIndex?: number;
  className?: string;
  tabClassName?: string;
  tabContent: TabContent[];
  variant?: "solid" | "line";
  onIndexChange?: (index: number) => void;
}

type TabContent = {
  content: React.ReactNode | JSX.Element;
};

type Tabs = {
  name: string;
};

const TabCard: FC<TabCardProps> = ({
  tabs,
  tabIndex,
  className,
  tabContent,
  tabClassName,
  variant = "line",
  onIndexChange,
}) => {
  return (
    <TabGroup defaultIndex={0} index={tabIndex} onIndexChange={onIndexChange}>
      <TabList
        className={cn("mt-8", tabClassName)}
        color="teal"
        defaultValue={0}
        variant={variant}
      >
        {tabs?.map((tab: Tabs, index: number) => {
          return (
            <Tab
              className={cn(
                "ui-selected:text-accent-foreground dark:ui-selected:text-accent-foreground font-TTHovesDemiBold text-[17px]",
                className
              )}
              value={index}
              key={index}
            >
              {tab?.name}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {tabContent?.map((val, id) => {
          return <TabPanel key={id}>{val?.content}</TabPanel>;
        })}
      </TabPanels>
    </TabGroup>
  );
};

export default TabCard;
