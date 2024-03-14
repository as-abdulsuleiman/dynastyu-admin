/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
  Divider,
  Title,
  Text,
  TableRow,
  TableCell,
  TabGroup,
  TabPanel,
  TabPanels,
  Flex,
  Badge,
  Grid,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import {
  GetSkillVerificationRequestsQuery,
  QueryMode,
  SkillVerificationRequestWhereInput,
  SortOrder,
  useGetSkillVerificationRequestsQuery,
  useUpdateSkillVerificationMutation,
} from "@/services/graphql";
import { Icons } from "../Icons";
import UniversalTable from "@/components/universal-table";
import UserAvatar from "../user-avatar";
import Pagination from "../pagination";
import { SearchInput } from "../search-input";
import SelectCard from "@/components/select";
import { useDebouncedValue } from "@mantine/hooks";
import MenubarCard from "../menubar";
import SkillIcon from "../Icons/skill";
interface SkillVerificationRequestProps {}

const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Skill" },
  { name: "Email" },
  { name: "Verified" },
  { name: "Action" },
];
const filterItems = [
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
  // { name: "Approved", value: "Approved" },
  // { name: "Not Approved", value: "Not Approved" },
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

  const [updateSkillVerification] = useUpdateSkillVerificationMutation();

  const { data, loading, refetch, fetchMore } =
    useGetSkillVerificationRequestsQuery({
      variables: {
        take: 10,
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
      fetchPolicy: "cache-first",
      pollInterval: 200,
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
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() =>
              router.push(`/skill-types/verification-request/${item?.id}`)
            }
          >
            <UserAvatar
              className="h-[55px] w-[55px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.user?.avatar as string}
              fallback={`${item?.user?.firstname?.charAt(
                0
              )} ${item?.user?.surname?.charAt(0)}`}
            />
            <Text className="ml-2 cursor-pointer">
              {item?.user?.firstname} {item?.user?.firstname}
            </Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">@{item?.user?.username}</TableCell>
        <TableCell className="text-center">
          {item?.skill?.skillType?.name}
        </TableCell>
        <TableCell className="text-center">{item?.user?.email}</TableCell>
        <TableCell className="text-center">
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
              // icon={() => {
              //   return (
              //     <Icons.pentagon
              //       className="rotate-180 h-5 w-5 mr-1"
              //       color="teal"
              //     />
              //   );
              // }}
              datatype="moderateDecrease"
            >
              {item?.verified ? "DU Verified" : "Not Verified"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center cursor-pointer ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={<Icons.moreHorizontal className="cursor-pointer" />}
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
          <Title>Skill Verification Request</Title>
          <SkillIcon
            className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis"
            // color={"#fff"}
          />
        </div>
      </div>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
              <SearchInput
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search..."
              />
              {/* <TextInput
                className="h-[38px] bg-background dark:bg-dark-background"
                icon={() => {
                  return (
                    <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
                  );
                }}
                onValueChange={(e) => setValue(e)}
                placeholder="Search for athlete..."
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
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default SkillVerificationRequest;
