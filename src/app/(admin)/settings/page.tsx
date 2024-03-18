/** @format */

"use client";

import { FC } from "react";
import { Divider, Grid, Title, Text } from "@tremor/react";
import { observer } from "mobx-react-lite";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <Title>Settings</Title>
      <Text>In Progress.</Text>
      <Divider></Divider>
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <div>Settings</div>
      </Grid>
    </main>
  );
};

export default observer(Page);
