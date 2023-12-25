/** @format */

"use client";

import { FC } from "react";
import {
  Divider,
  Grid,
  TabGroup,
  TabPanel,
  TabPanels,
  Title,
  Text,
} from "@tremor/react";
import { observer } from "mobx-react-lite";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <Title>Settings</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <div>Settings</div>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default observer(Page);
