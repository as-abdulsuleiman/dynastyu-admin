/** @format */

"use client";

import {
  Title,
  Text,
  Divider,
  TabGroup,
  TabPanels,
  TabPanel,
  Grid,
  TextInput,
  TableRow,
  TableCell,
  Flex,
  Badge,
} from "@tremor/react";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { FC, useEffect, useMemo, useState } from "react";
import CreateCoach from "@/components/create-coach";
import CoachesCount from "@/components/counts/coaches";
import SelectCard from "@/components/select";
import {
  CoachProfileWhereInput,
  GetCoachesQuery,
  QueryMode,
  SortOrder,
  useGetCoachesQuery,
} from "@/services/graphql";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";

interface CoachesProps {}

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTAPPROVED = "Not Approved",
}

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Approved", value: "Approved" },
  { name: "Not Approved", value: "Not Approved" },
];
const headerItems = [
  { name: "Name" },
  { name: "Email" },
  { name: "Title" },
  { name: "Status" },
];

const Coaches: FC<CoachesProps> = ({}) => {
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);

  const router = useRouter();

  const {
    loading,
    data: coachesData,
    refetch,
    fetchMore,
  } = useGetCoachesQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const whereClause: CoachProfileWhereInput = useMemo(() => {
    if (status === FilterEnum.INACTIVE) {
      return {
        user: {
          is: {
            isActive: {
              equals: false,
            },
          },
        },
      };
    } else if (status === FilterEnum.ACTIVE) {
      return {
        user: {
          is: {
            isActive: {
              equals: true,
            },
          },
        },
      };
    } else if (status === FilterEnum.VERIFIED) {
      return {
        verified: {
          equals: true,
        },
      };
    } else {
      return {};
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

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      coachesData?.coachProfiles[coachesData?.coachProfiles?.length - 1];
    return lastPostInResults?.id;
  }, [coachesData?.coachProfiles]);

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

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: coachesData?.coachProfiles?.length,
        cursor: {
          id: lastUserId,
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

  const renderItems = ({ item, id }: { item: any; id: any }) => {
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() => router.push(`/user/${item?.id}`)}
          >
            <Avatar>
              <AvatarImage
                src={item?.user?.avatar || ""}
                alt={`${item?.user?.username || item?.user?.firstname}`}
              />
              <AvatarFallback>
                {item?.user?.firstname?.charAt(0)}
                {item?.user?.surname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Text className="ml-2">
              {item?.user?.firstname} {item?.user?.surname}
            </Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.user?.email}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.title}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Badge
            size="xs"
            className="cursor-pointer"
            color={item?.user?.isActive ? "emerald" : "rose"}
            // tooltip="decrease"
            icon={StatusOnlineIcon}
            datatype="moderateDecrease"
          >
            {item?.user?.isActive ? "Active" : "Inactive"}
          </Badge>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col">
          <Title>Coaches</Title>
          <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
        </div>
        <div className="ml-auto justify-end">
          <CreateCoach
            onRefetch={refetch}
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <CoachesCount />
            </Grid>
            <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
              <TextInput
                className="h-[38px]"
                icon={SearchIcon}
                onValueChange={(e) => setValue(e)}
                placeholder="Search for coach..."
              />
              <SelectCard
                className="ring-0"
                items={filterItems}
                selectedItem={status}
                onValueChange={(e) => {
                  setStatus(e);
                }}
              />
            </Grid>
            <UniversalTable
              title="Users List"
              headerItems={headerItems}
              items={coachesData?.coachProfiles as any[]}
              loading={loading}
              renderItems={renderItems}
            />
            {loading || !coachesData?.coachProfiles?.length ? null : (
              <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default Coaches;
