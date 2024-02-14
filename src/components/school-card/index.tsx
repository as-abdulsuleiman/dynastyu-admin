/** @format */

"use client";

import { FC } from "react";
import { Callout, Card, Text, Divider } from "@tremor/react";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
interface SchoolCardProps {
  loading?: boolean;
  school: any;
}

const SchoolCard: FC<SchoolCardProps> = ({ loading, school }) => {
  const dropdownItems = [
    {
      name: `Edit School`,
      onclick: () => {},
      // router.push(`/fans/edit?fan=${Number(params?.fan)}`, {
      //   scroll: true,
      // }),
    },
    // {
    //   name: `${fanData?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
    //   onclick: async () => await handleActivateProfile(fanData?.user),
    // },
    // {
    //   name: "Delete Profile",
    //   onclick: async () => await handleDeleteProfile(fanData?.user),
    // },
  ];
  return (
    <Card className="bg-background dark:bg-dark-background">
      <div className="flex flex-col justify-center items-center relative">
        <UserAvatar
          className="h-[120px] w-[120px] shadow"
          height={120}
          width={120}
          fallbackType="icon"
          avatar={school?.logo as string}
          fallbackClassName={"h-[120px] w-[120px]"}
          fallback={`${school?.name?.charAt(0)} `}
          icon={<Icons.school className="h-8 w-8" />}
        />
        {loading ? (
          <Skeleton className="w-[120px] h-[25px] mt-2" />
        ) : (
          <Text className="text-xl mt-2">{school?.schoolType?.name}</Text>
        )}

        <div className="ml-auto absolute flex flex-row items-center right-0 top-0">
          <Menubar className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent px-0">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer px-0 data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent focus-within:bg-transparent focus-visible:bg-transparent active:bg-transparent">
                <Icons.moreHorizontal className="cursor-pointer" />
              </MenubarTrigger>
              <MenubarContent
                side="bottom"
                align="start"
                sideOffset={-2}
                alignOffset={-150}
                className="rounded-tremor-default cursor-pointer bg-background dark:bg-dark-background"
              >
                {dropdownItems?.map((val, id) => {
                  return (
                    <MenubarItem
                      onClick={val?.onclick}
                      key={id}
                      className="cursor-pointer tremor-SelectItem-root flex justify-start items-center text-tremor-default  ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis px-2.5 py-2.5"
                    >
                      {val?.name}
                    </MenubarItem>
                  );
                })}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <Divider></Divider>
      <Callout
        className="mt-4 min-h-[75px]"
        title={school?.schoolType?.name || ("High School" as string)}
        icon={() => {
          return (
            <Icons.graduationCap
              className="h-[20px] w-[20px] mr-2"
              color="teal"
            />
          );
        }}
        color="teal"
      >
        {school?.name}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="Address"
        icon={() => {
          return (
            <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        {school?.address}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="Division"
        icon={() => {
          return (
            <Icons.folderDot className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        {school?.division}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="Conference"
        icon={() => {
          return (
            <Icons.activitySquare
              className="h-[20px] w-[20px] mr-2"
              color="teal"
            />
          );
        }}
        color="teal"
      >
        {school?.conference}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="Description"
        icon={() => {
          return (
            <Icons.scrollText className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        {school?.description}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="Yearly Tuition"
        icon={() => {
          return (
            <Icons.scrollText className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        {school?.yearlyTuition ? `$ ${school?.yearlyTuition}` : ""}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="Year Founded"
        icon={() => {
          return (
            <Icons.scrollText className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        {school?.yearFounded}
      </Callout>

      <Callout
        className="mt-4 min-h-[75px]"
        title="Country"
        icon={() => {
          return (
            <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        <span className="flex flex-row items-center h-full">
          <>{school?.country?.name}</>
          {school?.country?.flag ? (
            <Image
              alt="country_flag"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              quality={100}
              priority
              width={30}
              height={30}
              src={school?.country?.flag}
              className="h-[30px] w-[30px] rounded-full ml-auto object-cover"
            />
          ) : null}
        </span>
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="State"
        icon={() => {
          return <Icons.pin className="h-[20px] w-[20px] mr-2" color="teal" />;
        }}
        color="teal"
      >
        {school?.state}
      </Callout>
      <Callout
        className="mt-4 min-h-[75px]"
        title="City"
        icon={() => {
          return (
            <Icons.locateFixed
              className="h-[20px] w-[20px] mr-2"
              color="teal"
            />
          );
        }}
        color="teal"
      >
        {school?.city}
      </Callout>
    </Card>
  );
};

export default SchoolCard;
