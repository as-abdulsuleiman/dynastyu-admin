/** @format */

"use client";

import { FC } from "react";
import { Callout, Card, Text, Divider } from "@tremor/react";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";
import {
  LocationMarkerIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";
import { Skeleton } from "../ui/skeleton";
import { StickyNote } from "lucide-react";

interface SchoolCardProps {
  loading?: boolean;
  avatar: string | null;
  schoolName: string | null;
  address: string | null;
  title: string | null;
  description: string | null;
  division: string | null;
}

const SchoolCard: FC<SchoolCardProps> = ({
  avatar,
  schoolName,
  title,
  address,
  description,
  division,
  loading,
}) => {
  return (
    <Card className="">
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
        icon={AcademicCapIcon}
        color="teal"
      >
        {schoolName}
      </Callout>
      <Callout
        className="mt-4"
        title="Address"
        icon={LocationMarkerIcon}
        color="teal"
      >
        {address}
      </Callout>
      <Callout
        className="mt-4"
        title="Division"
        icon={CheckCircleIcon}
        color="teal"
      >
        {division}
      </Callout>
      <Callout
        className="mt-4"
        title="Description"
        icon={() => {
          return <StickyNote className="h-[20px] w-[20px]" color="teal" />;
        }}
        color="teal"
      >
        {description}
      </Callout>
    </Card>
  );
};

export default SchoolCard;
