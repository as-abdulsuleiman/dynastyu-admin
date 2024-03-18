/** @format */

import { FC } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

interface TabCardProps {
  variant?: "solid" | "line";
  tabs: Tabs[];
  tabContent: TabContent[];
}

type TabContent = {
  content: React.ReactNode | JSX.Element;
};

type Tabs = {
  name: string;
};

const TabCard: FC<TabCardProps> = ({ variant = "line", tabs, tabContent }) => {
  return (
    <TabGroup defaultIndex={0}>
      <TabList className="mt-8" color="teal" defaultValue={0} variant={variant}>
        {tabs?.map((tab: Tabs, index: number) => {
          return (
            <Tab
              className=" ui-selected:text-accent-foreground dark:ui-selected:text-accent-foreground"
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
