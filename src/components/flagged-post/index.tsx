/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
  Divider,
  Title,
  Text,
  Grid,
  TableRow,
  TableCell,
  Flex,
  TextInput,
} from "@tremor/react";
import { SearchInput } from "../search-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import UniversalTable from "../universal-table";
import SelectCard from "@/components/select";
import FlaggedPostCount from "@/components/counts/flagged-posts";
import { observer } from "mobx-react-lite";
import {
  GetPostFlagsQuery,
  QueryMode,
  SortOrder,
  useGetPostFlagsQuery,
} from "@/services/graphql";
import Pagination from "../pagination";
import UserAvatar from "../user-avatar";
import { useDebouncedValue } from "@mantine/hooks";
import FlagOffIcon from "@/components/Icons/flag-off";
import MoreHorizontal from "@/components/Icons/more-horizontal";
import MenubarCard from "../menubar";
import { Icons } from "../Icons";
import { formatDate } from "@/lib/utils";

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
  // { name: "Approved", value: "Approved" },
  // { name: "Not Approved", value: "Not Approved" },
];

const headerItems = [
  { name: "Post" },
  { name: "Posted By" },
  { name: "Flagged By" },
  { name: "Reason" },
  { name: "Date" },
  { name: "Actions" },
];

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTVERIFIED = "Not Verified",
  NOTAPPROVED = "Not Approved",
  FEATURED = "Featured",
}

interface FlagPostProps {}

const FlaggedPosts: FC<FlagPostProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [status, setStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isActivating, setIsActivating] = useState<boolean>(false);
  const [isFeaturing, setIsFeaturing] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [debounced] = useDebouncedValue(value, 300);

  const {
    data: flaggedPostData,
    loading,
    refetch,
    fetchMore,
  } = useGetPostFlagsQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  useEffect(() => {
    refetch({
      where: {
        OR: [
          {
            user: {
              is: {
                username: {
                  contains: debounced,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
          {
            reason: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
          },
          {
            post: {
              is: {
                user: {
                  is: {
                    username: {
                      contains: debounced,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });
  }, [status, debounced, refetch]);

  const lastpostFlagId = useMemo(() => {
    const lastPostInResults =
      flaggedPostData?.postFlags[flaggedPostData?.postFlags?.length - 1];
    return lastPostInResults?.id;
  }, [flaggedPostData?.postFlags]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastpostFlagId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetPostFlagsQuery,
        { fetchMoreResult }
      ): GetPostFlagsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.postFlags?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.postFlags;
          const fetchMorePosts = fetchMoreResult?.postFlags;
          fetchMoreResult.postFlags = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: flaggedPostData?.postFlags?.length,
        cursor: {
          id: lastpostFlagId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetPostFlagsQuery,
        { fetchMoreResult }
      ): GetPostFlagsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.postFlags?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.postFlags;
          const fetchMorePosts = fetchMoreResult?.postFlags;
          fetchMoreResult.postFlags = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const flaggedPostItems = [
      {
        name: "View Post",
        onClick: () => {
          router.push(`/flagged-post/${item?.id}`, { scroll: true });
        },
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() => {
              router.push(`/flagged-post/${item?.id}`, { scroll: true });
            }}
          >
            <div className="relative">
              <UserAvatar
                className="h-[79px] w-[79px] shadow cursor-pointer relative"
                fallbackType="name"
                avatar={item?.post?.images[0] as string}
                fallback={`${item?.user?.username?.charAt(
                  0
                )} ${item?.user?.firstname?.charAt(0)}`}
              />
              <div className="absolute right-[-2px] bottom-1.5 z-10 bg-[#FF4747] h-6 w-6 rounded-full flex flex-row items-center justify-center">
                <FlagOffIcon className="h-4 w-4" color="#fff" />
              </div>
            </div>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <div>
            {item?.post?.user?.username ? `@${item?.post?.user?.username}` : ""}
          </div>
        </TableCell>
        <TableCell className="text-center">
          <div>{item?.user?.username ? `@${item?.user?.username}` : ""}</div>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2">{item?.reason}</div>{" "}
          </div>
        </TableCell>
        <TableCell className="text-center">
          <div>
            {item.createdAt ? formatDate(item?.createdAt, "dd MMM yyyy") : ""}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={<MoreHorizontal className="cursor-pointer" />}
              items={flaggedPostItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <Title>Flagged Posts</Title>
        <div className="h-4 w-4 bg-[rgb(103, 114, 132)]">
          <FlagOffIcon className="h-4 w-4 ml-2 stroke-gray-700 dark:stroke-white" />
        </div>
      </div>
      <Text>Flagged Post Overview</Text>
      <Divider></Divider>
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <FlaggedPostCount />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <TextInput
          className="h-[38px]"
          icon={() => {
            return <Icons.search className="h-10 w-5 ml-2.5" />;
          }}
          onValueChange={(e) => setValue(e)}
          placeholder="Type to search..."
        />
        {/* <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        /> */}
        <SelectCard
          disabled
          className="ring-0 bg-background dark:bg-dark-background"
          items={filterItems}
          selectedItem={status}
          onValueChange={(e) => {
            setStatus(e);
          }}
        />
      </Grid>
      <UniversalTable
        title="Flagged Post List"
        headerItems={headerItems}
        items={flaggedPostData?.postFlags as any[]}
        loading={loading}
        renderItems={renderItems}
      />
      {loading || !flaggedPostData?.postFlags?.length ? null : (
        <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
      )}
    </main>
  );
};

export default observer(FlaggedPosts);
