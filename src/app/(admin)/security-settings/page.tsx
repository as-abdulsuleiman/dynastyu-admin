/** @format */

import { FC } from "react";
import ContentHeader from "@/components/content-header";
import { Separator } from "@/components/ui/separator";
import TabCard from "@/components/tab-card";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const renderSecuritySetting = () => {
    return <div></div>;
  };
  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader title="Security Settings" subHeader="In Progress" />
      </div>
      <Separator className="my-6" />

      <TabCard
        // tabIndex={indexTab}
        // onIndexChange={handleOnIndexChange}
        className="font-TTHovesDemiBold"
        tabClassName="mt-0"
        tabs={[{ name: "Security Settings" }]}
        tabContent={[{ content: renderSecuritySetting() }]}
      />
    </main>
  );
};

export default Page;
