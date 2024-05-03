/** @format */

"use client";

import { NotificationIcon } from "@/components/Icons";
import ContentHeader from "@/components/content-header";
import { FC, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  GetCoachesQuery,
  SortOrder,
  useGetCoachesQuery,
  useGetPostFlagsQuery,
  useGetSkillVerificationRequestsQuery,
  GetSkillVerificationRequestsQuery,
  GetPostFlagsQuery,
  useUpdateCoachMutation,
} from "@/services/graphql";
import { cn } from "@/lib/utils";
import { useRootStore } from "@/mobx";
import UserAvatar from "@/components/user-avatar";
import TabCard from "@/components/tab-card";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import { toast } from "@/hooks/use-toast";
import PromptAlert from "@/components/prompt-alert";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [selectedCoach, setSelectedCoach] = useState<any | null>(null);
  const [updateCoach, { loading: updatingCoach }] = useUpdateCoachMutation();
  const [openVerifyPrompt, setOpenVerifyPrompt] = useState(false);

  const { data, loading, refetch, fetchMore } =
    useGetSkillVerificationRequestsQuery({
      variables: {
        where: {
          verified: {
            equals: false,
          },
        },
        take: 10,
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      pollInterval: 10 * 1000,
      // onCompleted: (data) => {
      //   setSkillVerificationRequest(data?.skillVerificationRequests as any);
      //   setLoading(loading);
      // },
    });

  const {
    loading: LoadingCoachesData,
    data: coachesData,
    refetch: refetchCoachesData,
    fetchMore: fetchMoreCoachesData,
  } = useGetCoachesQuery({
    variables: {
      where: {
        verified: { equals: false },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    returnPartialData: true,
    fetchPolicy: "cache-first",
    // pollInterval: 30 * 1000,
  });

  const {
    data: flaggedPostData,
    loading: loadingFlaggedPost,
    refetch: refetchFlaggedPost,
    fetchMore: fetchMoreFlaggedPost,
  } = useGetPostFlagsQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
    pollInterval: 10 * 1000,
    // onCompleted: (data) => {
    //   setFlaggedPost(data?.postFlags as any);
    // },
  });

  const lastCoachId = useMemo(() => {
    const lastPostInResults =
      coachesData?.coachProfiles[coachesData?.coachProfiles?.length - 1];
    return lastPostInResults?.id;
  }, [coachesData?.coachProfiles]);

  const lastSkillId = useMemo(() => {
    const lastPostInResults =
      data?.skillVerificationRequests[
        data?.skillVerificationRequests?.length - 1
      ];
    return lastPostInResults?.id;
  }, [data?.skillVerificationRequests]);

  const lastFlaggedId = useMemo(() => {
    const lastPostInResults =
      flaggedPostData?.postFlags[flaggedPostData?.postFlags?.length - 1];
    return lastPostInResults?.id;
  }, [flaggedPostData?.postFlags]);

  const fetchNextCoaches = () => {
    fetchMoreCoachesData({
      variables: {
        // verified: { equals: false },

        take: 10,
        skip: 1,
        cursor: {
          id: lastCoachId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetCoachesQuery,
        { fetchMoreResult }
      ): GetCoachesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.coachProfiles?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.coachProfiles;
          const fetchMorePosts = fetchMoreResult?.coachProfiles;
          fetchMoreResult.coachProfiles = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPreviousCoaches = () => {
    fetchMoreCoachesData({
      variables: {
        // verified: { equals: false },
        take: -10,
        skip: coachesData?.coachProfiles?.length,
        cursor: {
          id: lastCoachId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetCoachesQuery,
        { fetchMoreResult }
      ): GetCoachesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.coachProfiles?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.coachProfiles;
          const fetchMorePosts = fetchMoreResult?.coachProfiles;
          fetchMoreResult.coachProfiles = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchNextSkills = () => {
    fetchMore({
      variables: {
        // verified: { equals: false },

        take: 10,
        skip: 1,
        cursor: {
          id: lastSkillId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSkillVerificationRequestsQuery,
        { fetchMoreResult }
      ): GetSkillVerificationRequestsQuery => {
        if (
          !fetchMoreResult ||
          fetchMoreResult?.skillVerificationRequests?.length === 0
        ) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.skillVerificationRequests;
          const fetchMorePosts = fetchMoreResult?.skillVerificationRequests;
          fetchMoreResult.skillVerificationRequests = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPreviousSkills = () => {
    fetchMore({
      variables: {
        // verified: { equals: false },
        take: -10,
        skip: data?.skillVerificationRequests?.length,
        cursor: {
          id: lastSkillId,
        },
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSkillVerificationRequestsQuery,
        { fetchMoreResult }
      ): GetSkillVerificationRequestsQuery => {
        if (
          !fetchMoreResult ||
          fetchMoreResult?.skillVerificationRequests?.length === 0
        ) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.skillVerificationRequests;
          const fetchMorePosts = fetchMoreResult?.skillVerificationRequests;
          fetchMoreResult.skillVerificationRequests = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchNextFlaggedPost = () => {
    fetchMoreFlaggedPost({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastFlaggedId,
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

  const fetchPreviousFlaggedPost = () => {
    fetchMoreFlaggedPost({
      variables: {
        take: -10,
        skip: flaggedPostData?.postFlags?.length,
        cursor: {
          id: lastFlaggedId,
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

  const renderFlaggedPostRequest = () => {
    return (
      <div className="flex flex-col mt-8">
        {flaggedPostData?.postFlags?.map((value, id) => {
          return (
            <>
              <div key={id} className="flex mb-4">
                <UserAvatar
                  className="h-[79px] w-[79px] shadow cursor-pointer"
                  fallbackType="name"
                  avatar={value?.user?.avatar as string}
                  fallback={`${value?.user?.firstname?.charAt(
                    0
                  )} ${value?.user?.surname?.charAt(0)}`}
                />
                <div className="flex item-center flex-col justify-center  ml-8">
                  <div key={value?.id} className="cursor-pointer mt-2">
                    <span>@{value?.user?.username}</span> has flagged a post
                  </div>
                  <div className="mt-0 text-[12px] py-0">
                    {formatDistanceToNow(new Date(value?.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <Link
                  href={`/flagged-post/${value?.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "destructive",
                      size: "sm",
                    }),
                    "mt-2 ml-auto mr-0 w"
                  )}
                >
                  Review
                </Link>
              </div>
              <Separator className="mb-6" />
            </>
          );
        })}
        {loadingFlaggedPost || !flaggedPostData?.postFlags?.length ? null : (
          <Pagination
            onNext={fetchNextFlaggedPost}
            onPrevious={fetchPreviousFlaggedPost}
          />
        )}
      </div>
    );
  };

  const renderSkillVerificationRequest = () => {
    return (
      <div className="flex flex-col mt-8">
        {data?.skillVerificationRequests?.map((value, id) => {
          return (
            <>
              <div key={id} className="flex mb-4">
                <UserAvatar
                  className="h-[79px] w-[79px] shadow cursor-pointer"
                  fallbackType="name"
                  avatar={value?.user?.avatar as string}
                  fallback={`${value?.user?.firstname?.charAt(
                    0
                  )} ${value?.user?.surname?.charAt(0)}`}
                />

                <div className="flex item-center flex-col justify-center  ml-8">
                  <div key={value?.id} className="cursor-pointer">
                    <span>@{value?.user?.username}</span> {""}
                    <span className="ml-1">
                      is requesting for{" "}
                      <strong>{value?.skill?.skillType?.name}</strong> {""}
                      verification
                    </span>
                  </div>
                  <div className="mt-0 text-[12px] py-0">
                    {formatDistanceToNow(new Date(value?.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <Link
                  href={`/skill-types/verification-request/${value?.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "destructive",
                      size: "sm",
                    }),
                    "mt-2 ml-auto mr-0 w"
                  )}
                >
                  Review
                </Link>
              </div>
              <Separator className="mb-6" />
            </>
          );
        })}
        {loading || !data?.skillVerificationRequests?.length ? null : (
          <Pagination
            onNext={fetchNextSkills}
            onPrevious={fetchPreviousSkills}
          />
        )}
      </div>
    );
  };

  const handleVerifyCoach = async (item: any) => {
    setSelectedCoach(item?.id);

    try {
      await updateCoach({
        variables: {
          where: {
            id: item?.id,
          },
          data: {
            verified: {
              set: true,
            },
          },
        },
      });
      await refetchCoachesData();
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been verified
        `,
        variant: "successfull",
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setOpenVerifyPrompt(false);
      setSelectedCoach(null);
    }
  };

  const renderCoachVerificationRequest = () => {
    return (
      <div className="flex flex-col mt-8 justify-center">
        {coachesData?.coachProfiles?.map((value, id) => {
          return (
            <>
              <div key={id} className="flex mb-4 justify-center">
                <UserAvatar
                  className="h-[79px] w-[79px] shadow cursor-pointer"
                  fallbackType="name"
                  avatar={value?.user?.avatar as string}
                  fallback={`${value?.user?.firstname?.charAt(
                    0
                  )} ${value?.user?.surname?.charAt(0)}`}
                />

                <div className="flex item-center flex-col justify-center ml-8">
                  <div key={value?.id} className="cursor-pointer">
                    <span>@{value?.user?.username}</span> {""}
                    <span className="ml-1">
                      is requesting for Coach verification
                    </span>
                  </div>
                  <div className="mt-0 text-[12px] py-0">
                    {formatDistanceToNow(new Date(value?.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="mt-2 ml-auto mr-0">
                  {" "}
                  {/* <Link
                    href={`/coach/${value?.user?.id}`}
                    className={cn(
                      buttonVariants({
                        variant: "destructive",
                        size: "sm",
                      }),
                      "mr-3"
                    )}
                  >
                    Review
                  </Link> */}
                  <Link
                    onClick={() => {
                      setSelectedCoach(value as any);
                      setOpenVerifyPrompt(true);
                    }}
                    href={``}
                    className={cn(
                      buttonVariants({
                        variant: "destructive",
                        size: "sm",
                      })
                    )}
                  >
                    Verify
                  </Link>
                </div>
              </div>
              <Separator className="mb-6" />
            </>
          );
        })}
        {LoadingCoachesData || !coachesData?.coachProfiles?.length ? null : (
          <Pagination
            onNext={fetchNextCoaches}
            onPrevious={fetchPreviousCoaches}
          />
        )}
      </div>
    );
  };
  return (
    <div>
      <ContentHeader
        title="Notification"
        subHeader="Notification Overview"
        icon={
          <NotificationIcon
            className="h-[19px] ml-2  w-[19px] cursor-pointer"
            color={"#fff"}
          />
        }
      />

      <Separator className="my-6" />
      <TabCard
        className="text-lg font-TTHovesDemiBold"
        tabs={[
          { name: "Flagged Post" },
          { name: "Skill Verfication" },
          { name: "Coach Verification" },
        ]}
        tabContent={[
          { content: renderFlaggedPostRequest() },
          { content: renderSkillVerificationRequest() },
          { content: renderCoachVerificationRequest() },
        ]}
      />
      <PromptAlert
        loading={updatingCoach}
        content={`This action will verify @${selectedCoach?.user?.username} as a coach. `}
        showPrompt={openVerifyPrompt}
        handleHidePrompt={() => {
          setOpenVerifyPrompt(false);
          setSelectedCoach(null);
        }}
        handleConfirmPrompt={() => handleVerifyCoach(selectedCoach)}
      />
    </div>
  );
};

export default Page;
