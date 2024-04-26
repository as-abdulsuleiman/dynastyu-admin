/** @format */

"use client";

import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { GetUserQuery, useGetPostFlagQuery } from "@/services/graphql";
import MediaCard from "../media-card";
import TabCard from "../tab-card";
import UserAvatar from "../user-avatar";
import { FlagOffIcon, UserIcon } from "../Icons";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { generateProfilePath } from "@/lib/helpers";
import ContentHeader from "../content-header";
import CardContainer from "../card-container";
import { formatDate } from "@/lib/utils";

interface FlaggedPostDetailProps {
  params: {
    id: number;
  };
}

const FlaggedPostDetail: FC<FlaggedPostDetailProps> = ({ params }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { data, loading } = useGetPostFlagQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const renderPostedBy = (post: any) => {
    const userPath = generateProfilePath(post?.user as GetUserQuery["user"]);
    return (
      <div className="flex flex-col justify-center mt-8">
        <div className="flex flex-row items-center">
          <UserAvatar
            onClick={() => router.push(userPath)}
            className="h-[90px] w-[90px] shadow cursor-pointer"
            height={90}
            width={90}
            fallbackType="icon"
            fallbackClassName={"h-[120px] w-[120px]"}
            avatar={post?.user?.avatar as string}
            fallback={`${post?.user?.firstname?.charAt(
              0
            )} ${post?.user?.surname?.charAt(0)}`}
            icon={<UserIcon className="h-8 w-8" />}
          />
          <div className="ml-3">
            <div>
              {post?.user?.firstname} {""}
              {post?.user?.surname}
            </div>
            @{post?.user?.username}
          </div>
        </div>
      </div>
    );
  };
  const renderFlaggedBy = (user: any) => {
    const userPath = generateProfilePath(user as GetUserQuery["user"]);
    return (
      <div className="flex flex-col justify-center mt-8">
        <div className="flex flex-row items-center">
          <UserAvatar
            onClick={() => router.push(userPath)}
            className="h-[90px] w-[90px] shadow cursor-pointer"
            height={90}
            width={90}
            fallbackType="icon"
            fallbackClassName={"h-[120px] w-[120px]"}
            avatar={user?.avatar as string}
            fallback={`${user?.firstname?.charAt(0)} ${user?.surname?.charAt(
              0
            )}`}
            icon={<UserIcon className="h-8 w-8" />}
          />
          <div className="ml-3">
            <div>
              {" "}
              {user?.firstname} {""}
              {user?.surname}
            </div>
            <div>@{user?.username}</div>
          </div>
        </div>
      </div>
    );
  };

  const subHeaderItems = [
    {
      title: "Created at:",
      content:
        `${
          data?.postFlag?.createdAt
            ? formatDate(new Date(data?.postFlag?.createdAt))
            : ""
        }` || "N/A",
    },
    {
      title: "Updated at:",
      content:
        `${
          data?.postFlag?.updatedAt
            ? formatDate(new Date(data?.postFlag?.updatedAt))
            : ""
        }` || "N/A",
    },
    {
      title: "Posted at:",
      content:
        `${
          data?.postFlag?.post?.createdAt
            ? formatDate(new Date(data?.postFlag?.post?.createdAt))
            : ""
        }` || "N/A",
    },
  ];

  const isImageType =
    data?.postFlag?.post?.videos && data?.postFlag?.post?.videos?.length;
  return (
    <main className="w-full h-full relative">
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <ContentHeader
            title="Flagged Post"
            // icon={
            //   <FlagOffIcon className="h-4 w-4 ml-2 stroke-gray-700 dark:stroke-white" />
            // }
            // subHeader="Flagged Post Details"
            subItems={subHeaderItems}
          />
        </div>
      </div>
      <Separator className="my-6" />

      <TabCard
        tabs={[{ name: "Posted By" }, { name: "Flagged By" }]}
        tabContent={[
          { content: renderPostedBy(data?.postFlag?.post) },
          { content: renderFlaggedBy(data?.postFlag?.user) },
        ]}
      />
      <Button
        variant="default"
        className="my-6 ml-auto flex flex-row"
        disabled
        onClick={() => {}}
      >
        Disable Post
      </Button>
      <CardContainer className="p-4 md:p-6">
        <MediaCard
          loading={loading}
          caption={data?.postFlag?.post?.caption}
          items={
            (!isImageType
              ? data?.postFlag?.post?.images
              : data?.postFlag?.post?.videos) || []
          }
          type={!isImageType ? "image" : "video"}
        />
      </CardContainer>
    </main>
  );
};

export default observer(FlaggedPostDetail);
