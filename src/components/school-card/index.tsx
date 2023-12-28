/** @format */

"use client";

import { FC } from "react";
import { Callout, Card, Text, Divider } from "@tremor/react";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";

interface SchoolCardProps {
  loading?: boolean;
  avatar: string;
  schoolName: string;
  address: string;
  title: string;
  description: string;
  division: string;
  conference?: string;
  yearFounded?: string;
}

const SchoolCard: FC<SchoolCardProps> = ({
  avatar,
  schoolName,
  title,
  address,
  description,
  division,
  loading,
  conference,
  yearFounded,
}) => {
  return (
    <Card>
      <div className="flex flex-col justify-center items-center">
        <UserAvatar
          className="h-[75px] w-[75px]"
          fallbackType="icon"
          avatar={avatar as string}
          fallback={`${schoolName?.charAt(0)} `}
          icon={<Icons.school className="h-8 w-8" />}
        />
        {loading ? (
          <Skeleton className="w-[120px] h-[25px] mt-2" />
        ) : (
          <Text className="text-xl mt-2">{title}</Text>
        )}
      </div>
      <Divider></Divider>
      <Callout
        className="mt-4"
        title={title || ("High School" as string)}
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
        {schoolName}
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
        {address}
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
        {division}
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
        {conference}
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
        {description}
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
        {yearFounded}
      </Callout>
    </Card>
  );
};

export default SchoolCard;
