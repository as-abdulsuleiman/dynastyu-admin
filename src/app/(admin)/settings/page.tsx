/** @format */

"use client";

import { FC } from "react";
import { Grid } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { Separator } from "@/components/ui/separator";
import ContentHeader from "@/components/content-header";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader title="Settings" subHeader="In Progress" />
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <div>Settings</div>
      </Grid>
    </main>
  );
};

export default observer(Page);
