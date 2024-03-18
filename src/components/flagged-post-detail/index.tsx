/** @format */

"use client";

import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useGetPostFlagQuery } from "@/services/graphql";
import { Title, Text, Divider, Card } from "@tremor/react";
import MediaCard from "../media-card";
import FlagOffIcon from "@/components/Icons/flag-off";
import TabCard from "../tab-card";
import UserAvatar from "../user-avatar";
import { Icons } from "../Icons";

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
    return (
      <div className="flex flex-col justify-center mt-8">
        <div className="flex flex-row items-center">
          <UserAvatar
            className="h-[90px] w-[90px] shadow cursor-pointer"
            height={90}
            width={90}
            fallbackType="icon"
            fallbackClassName={"h-[120px] w-[120px]"}
            avatar={post?.user.avatar as string}
            fallback={`${post?.user?.firstname?.charAt(
              0
            )} ${post?.user?.surname?.charAt(0)}`}
            icon={<Icons.user className="h-8 w-8" />}
          />
          <div className="ml-3">
            <div>
              {" "}
              {post?.user?.firstname} {""}
              {post?.user?.surname}
            </div>
            @{post?.user?.username}
            <div></div>
          </div>
        </div>
      </div>
    );
  };
  const renderFlaggedBy = (user: any) => {
    return (
      <div className="flex flex-col justify-center mt-8">
        <div className="flex flex-row items-center">
          <UserAvatar
            className="h-[90px] w-[90px] shadow cursor-pointer"
            height={90}
            width={90}
            fallbackType="icon"
            fallbackClassName={"h-[120px] w-[120px]"}
            avatar={user.avatar as string}
            fallback={`${user?.firstname?.charAt(0)} ${user?.surname?.charAt(
              0
            )}`}
            icon={<Icons.user className="h-8 w-8" />}
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

  const isImageType =
    data?.postFlag?.post?.videos && data?.postFlag?.post?.videos?.length;
  return (
    <main className="w-full h-full relative">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        Go Back
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <Title>Flagged Post</Title>
          <FlagOffIcon className="h-4 w-4 ml-2 stroke-gray-700 dark:stroke-white" />
        </div>
        <Text>Flagged Post Details</Text>
      </div>
      <Divider></Divider>
      <Button
        variant="default"
        className="my-6 ml-auto flex flex-row"
        disabled
        onClick={() => {}}
      >
        Disable Post
      </Button>
      <Card className="">
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
      </Card>
      <TabCard
        tabs={[{ name: "Posted By" }, { name: "Flagged By" }]}
        tabContent={[
          { content: renderPostedBy(data?.postFlag?.post) },
          { content: renderFlaggedBy(data?.postFlag?.user) },
        ]}
      />
    </main>
  );
};

export default observer(FlaggedPostDetail);
