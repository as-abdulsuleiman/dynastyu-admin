/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Title, Flex, Badge, Grid, TextInput } from "@tremor/react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {
  GetSkillVerificationRequestsQuery,
  QueryMode,
  SkillVerificationRequestWhereInput,
  SortOrder,
  useGetSkillVerificationRequestsQuery,
} from "@/services/graphql";
import { Icons } from "../Icons";
import UniversalTable from "@/components/universal-table";
import UserAvatar from "../user-avatar";
import Pagination from "../pagination";
import SelectCard from "@/components/select";
import { useDebouncedValue } from "@mantine/hooks";
import MenubarCard from "../menubar";
import SkillIcon from "../Icons/skill";
import { observer } from "mobx-react-lite";
import SkillVerificationRequestCountStatCard from "@/components/stat-cards/skill-verification-request-count";
import { formatDate } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { SearchInput } from "../search-input";
import { Button } from "../ui/button";
import MoreHorizontal from "../Icons/more-horizontal";
import ContentHeader from "../content-header";

interface SkillVerificationRequestProps {}

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Skill" },
  { name: "Email" },
  { name: "Verified" },
  { name: "Created At" },
  { name: "Actions" },
];

const filterItems = [
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
];

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTVERIFIED = "Not Verified",
  NOTAPPROVED = "Not Approved",
}

const SkillVerificationRequest: FC<SkillVerificationRequestProps> = ({}) => {
  const router = useRouter();
  const [isActivating, setIsactivating] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("Not Verified");
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);

  const { data, loading, refetch, fetchMore } =
    useGetSkillVerificationRequestsQuery({
      variables: {
        take: 10,
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      fetchPolicy: "cache-first",
      pollInterval: 30 * 1000,
    });

  const whereClause: SkillVerificationRequestWhereInput = useMemo(() => {
    if (status === FilterEnum.VERIFIED) {
      return {
        verified: {
          equals: true,
        },
      };
    } else if (status === FilterEnum.NOTVERIFIED) {
      return {
        verified: {
          equals: false,
        },
      };
    } else {
      return {
        verified: {
          equals: false,
        },
      };
    }
  }, [status]);

  useEffect(() => {
    refetch({
      where: {
        ...whereClause,
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
    });
  }, [status, whereClause, debounced, refetch]);

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
      <TableRow
        className="w-full"
        key={item?.id}
        onClick={() =>
          setIsOpen((prev) => (prev !== item?.id ? item?.id : null))
        }
      >
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
              {item?.user?.firstname} {item?.user?.firstname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center text-sm">
          @{item?.user?.username}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.skill?.skillType?.name}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.user?.email}
        </TableCell>
        <TableCell className="text-center text-sm">
          {item?.id === selectedUser && isActivating ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin" />
              {item?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer"
              color={item?.verified ? "sky" : "rose"}
              // tooltip="decrease"
              icon={() => {
                return (
                  <Icons.badgeAlert className="h-4 w-4 mr-1" color="rose" />
                );
              }}
              datatype="moderateDecrease"
            >
              {item?.verified ? "DU Verified" : "Not Verified"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center text-sm">
          <div>
            {item.createdAt ? formatDate(item?.createdAt, "dd MMM yyyy") : ""}
          </div>
        </TableCell>
        <TableCell className="text-center cursor-pointer text-sm">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={
                <Button size="icon" variant="outline">
                  <MoreHorizontal className="cursor-pointer" />
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
            icon={
              <SkillIcon className="h-[22px] w-[22px] ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
            }
            subHeader="Skill Verification Overview"
          />
        </div>
      </div>
      <Separator className="my-6" />
      <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
        <SkillVerificationRequestCountStatCard />
      </Grid>
      <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to search..."
        />
        {/* <TextInput
          className="h-[38px]"
          icon={() => {
            return <Icons.search className="h-10 w-5 ml-2.5" />;
          }}
          onValueChange={(e) => setValue(e)}
          placeholder="Type to search..."
        /> */}
        <SelectCard
          className="ring-0 bg-background dark:bg-dark-background"
          items={filterItems}
          selectedItem={status}
          onValueChange={(e) => {
            setStatus(e);
          }}
        />
      </Grid>
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
