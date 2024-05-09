/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Title, Badge, Grid } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {
  GetSkillVerificationRequestsQuery,
  QueryMode,
  SortOrder,
  useGetSkillVerificationRequestsQuery,
} from "@/services/graphql";
import { SkillIcon, MoreHorizontalIcon, BadgeAlertIcon } from "../Icons";
import UniversalTable from "@/components/universal-table";
import UserAvatar from "../user-avatar";
import Pagination from "../pagination";
import { useDebouncedValue } from "@mantine/hooks";
import MenubarCard from "../menubar";
import { observer } from "mobx-react-lite";
import SkillVerificationRequestCountStatCard from "@/components/stat-cards/skill-verification-request-count";
import { formatDate } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { SearchInput } from "../search-input";
import { Button } from "../ui/button";
import BadgeCard from "../badge-card";
import ContentHeader from "../content-header";

interface SkillVerificationRequestProps {}

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Skill" },
  { name: "Email" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Verified" },
  { name: "Actions" },
];

const SkillVerificationRequest: FC<SkillVerificationRequestProps> = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);

  const { data, loading, refetch, fetchMore } =
    useGetSkillVerificationRequestsQuery({
      variables: {
        where: {
          verified: {
            equals: false,
          },
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
              user: {
                is: {
                  firstname: {
                    contains: debounced,
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
            {
              user: {
                is: {
                  surname: {
                    contains: debounced,
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
            {
              user: {
                is: {
                  email: {
                    contains: debounced,
                    mode: QueryMode.Insensitive,
                  },
                },
              },
            },
          ],
        },
        take: 10,
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      fetchPolicy: "cache-first",
      pollInterval: 30 * 1000,
    });

  const handleViewDetail = async (item: any) => {
    router.push(`/skill-types/verification-request/${item?.id}`);
  };

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      data?.skillVerificationRequests[
        data?.skillVerificationRequests?.length - 1
      ];
    return lastPostInResults?.id;
  }, [data?.skillVerificationRequests]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastUserId,
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

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: data?.skillVerificationRequests?.length,
        cursor: {
          id: lastUserId,
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

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    const verificationItems = [
      {
        name: `View Details`,
        onClick: () => handleViewDetail(item),
      },
    ];
    return (
      <TableRow className="w-full" key={item?.id}>
        <TableCell>
          <div
            className="flex flex-row items-center justify-start"
            onClick={() =>
              router.push(`/skill-types/verification-request/${item?.id}`)
            }
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.user?.avatar as string}
              fallback={`${item?.user?.firstname?.charAt(
                0
              )} ${item?.user?.surname?.charAt(0)}`}
            />
            <div className="ml-4 cursor-pointer text-base">
              {item?.user?.firstname} {item?.user?.surname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          @{item?.user?.username?.toLowerCase()}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.skill?.skillType?.name}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.user?.email}
        </TableCell>

        <TableCell className="text-center text-sm">
          <div>
            {item.createdAt ? formatDate(item?.createdAt, "dd MMM yyyy") : ""}
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>
            {item.updatedAt ? formatDate(item?.updatedAt, "dd MMM yyyy") : ""}
          </div>
        </TableCell>
        <TableCell className="text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <BadgeCard
              size="xs"
              className="cursor-pointer"
              color={item?.verified ? "sky" : "rose"}
              // tooltip="decrease"
              icon={() => {
                return <BadgeAlertIcon className="h-4 w-4 mr-1" color="rose" />;
              }}
              datatype="moderateDecrease"
            >
              {item?.verified ? "DU Verified" : "Not Verified"}
            </BadgeCard>
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontalIcon className="cursor-pointer" />
                </Button>
              }
              items={verificationItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full relative">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <ContentHeader
            title="Skill Verification Request"
            // icon={
            //   <SkillIcon className="h-[22px] w-[22px] ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
            // }
            subHeader="Skill Verification Overview"
          />
        </div>
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <SkillVerificationRequestCountStatCard />
      </Grid>
      <div className="flex mt-6 gap-6 w-full justify-end">
        <div className="w-full md:w-1/2 order-2">
          <SearchInput
            className="h-[40px]"
            onChange={(e) => setValue(e?.target?.value)}
            placeholder="Type to search..."
          />
        </div>
      </div>
      <div>
        <UniversalTable
          title="Verification Request List"
          headerItems={headerItems}
          items={data?.skillVerificationRequests as any[]}
          loading={loading}
          renderItems={renderItems}
        />
        {loading || !data?.skillVerificationRequests?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
      </div>
    </main>
  );
};

export default observer(SkillVerificationRequest);
