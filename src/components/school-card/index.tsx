/** @format */

"use client";

import { FC } from "react";
import { Callout, Card, Text, Divider } from "@tremor/react";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";
import { GetSchoolQuery } from "@/services/graphql";

interface SchoolCardProps {
  loading?: boolean;
  school: any;
}

const SchoolCard: FC<SchoolCardProps> = ({ loading, school }) => {
  return (
    <Card className="bg-background dark:bg-dark-background">
      <div className="flex flex-col justify-center items-center">
        <UserAvatar
          className="h-[70px] w-[70px] shadow"
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
        {school?.conference}
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
    </Card>
  );
};

export default SchoolCard;
