/** @format */

"use client";

import { FC } from "react";
import { Callout, Card, Text, Divider } from "@tremor/react";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";
import { GetSchoolQuery } from "@/services/graphql";
import Image from "next/image";

interface SchoolCardProps {
  loading?: boolean;
  school: any;
}

const SchoolCard: FC<SchoolCardProps> = ({ loading, school }) => {
  return (
    <Card className="bg-background dark:bg-dark-background">
      <div className="flex flex-col justify-center items-center">
        <UserAvatar
          className="h-[120px] w-[120px] shadow"
          height={120}
          width={120}
          fallbackType="icon"
          avatar={school?.logo as string}
          fallback={`${school?.name?.charAt(0)} `}
          icon={<Icons.school className="h-8 w-8" />}
        />
        {loading ? (
          <Skeleton className="w-[120px] h-[25px] mt-2" />
        ) : (
          <Text className="text-xl mt-2">{school?.schoolType?.name}</Text>
        )}
      </div>
      <Divider></Divider>
      <Callout
        className="mt-4"
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
        className="mt-4"
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
        className="mt-4"
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
        className="mt-4"
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
        className="mt-4"
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
        className="mt-4"
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
        className="mt-4"
        title="Country"
        icon={() => {
          return (
            <Icons.mapPin className="h-[20px] w-[20px] mr-2" color="teal" />
          );
        }}
        color="teal"
      >
        <span className="flex flex-row items-center">
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
        className="mt-4"
        title="State"
        icon={() => {
          return <Icons.pin className="h-[20px] w-[20px] mr-2" color="teal" />;
        }}
        color="teal"
      >
        {school?.state}
      </Callout>
      <Callout
        className="mt-4"
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
