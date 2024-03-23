/** @format */

"use client";

import { FC } from "react";
import { Grid, Title, Text } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { Separator } from "@/components/ui/separator";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <Title>Settings</Title>
      <Text>In Progress.</Text>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <div>Settings</div>
      </Grid>
    </main>
  );
};

export default observer(Page);
