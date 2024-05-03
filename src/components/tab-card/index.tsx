/** @format */

import { FC } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { cn } from "@/lib/utils";

interface TabCardProps {
  tabs: Tabs[];
  variant?: "solid" | "line";
  tabContent: TabContent[];
  className?: string;
}

type TabContent = {
  content: React.ReactNode | JSX.Element;
};

type Tabs = {
  name: string;
};

const TabCard: FC<TabCardProps> = ({
  variant = "line",
  tabs,
  tabContent,
  className,
}) => {
  return (
    <TabGroup defaultIndex={0}>
      <TabList className="mt-8" color="teal" defaultValue={0} variant={variant}>
        {tabs?.map((tab: Tabs, index: number) => {
          return (
            <Tab
              className={cn(
                "ui-selected:text-accent-foreground dark:ui-selected:text-accent-foreground font-TTHovesDemiBold",
                className
              )}
              value={index}
              key={index}
            >
              {tab.name}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {tabContent?.map((val, id) => {
          return <TabPanel key={id}>{val.content}</TabPanel>;
        })}
      </TabPanels>
    </TabGroup>
  );
};

export default TabCard;
