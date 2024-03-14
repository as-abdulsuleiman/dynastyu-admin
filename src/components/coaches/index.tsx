/** @format */

"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
  Title,
  Text,
  Divider,
  TabGroup,
  TabPanels,
  TabPanel,
  Grid,
  TableRow,
  TableCell,
  Flex,
  Badge,
} from "@tremor/react";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
import CoachesCount from "@/components/counts/coaches";
import SelectCard from "@/components/select";
import {
  CoachProfileWhereInput,
  GetCoachesQuery,
  QueryMode,
  SortOrder,
  useDeleteCoachMutation,
  useDeleteUserMutation,
  useGetCoachesLazyQuery,
  useGetCoachesQuery,
  useGetUsersLazyQuery,
  useRegisterCoachMutation,
  useUpdateCoachMutation,
} from "@/services/graphql";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { useToast } from "@/hooks/use-toast";
import { CoachValidator } from "@/lib/validators/coach";
import * as yup from "yup";
import UserAvatar from "@/components/user-avatar";
import { Icons } from "@/components/Icons";
import { useRootStore } from "@/mobx";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import MenubarCard from "../menubar";

enum FilterEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  APPROVED = "Approved",
  VERIFIED = "Verified",
  NOTVERIFIED = "Not Verified",
  NOTAPPROVED = "Not Approved",
}

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
  // { name: "Approved", value: "Approved" },
  // { name: "Not Approved", value: "Not Approved" },
];
const headerItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Coach Title" },
  { name: "Status" },
  { name: "Verified" },
  { name: "Action" },
];

type FormData = yup.InferType<typeof CoachValidator>;

interface CoachesProps {}

const Coaches: FC<CoachesProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    userStore: { setUsers },
  } = useRootStore();
  const {
    coacheStore: { setCoaches },
  } = useRootStore();
  const [status, setStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [isActivating, setIsactivating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [registerCoach] = useRegisterCoachMutation();
  const [deleteCoach] = useDeleteCoachMutation();
  const [updateCoach] = useUpdateCoachMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const [getCoaches] = useGetCoachesLazyQuery();

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
    returnPartialData: true,
    fetchPolicy: "cache-first",
    pollInterval: 30 * 1000,
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
    } else if (status === FilterEnum.NOTVERIFIED) {
      return {
        verified: {
          equals: false,
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

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      coachesData?.coachProfiles[coachesData?.coachProfiles?.length - 1];
    return lastPostInResults?.id;
  }, [coachesData?.coachProfiles]);

  // const handleCreateCoach = async (values: FormData) => {
  //   try {
  //     const response = await registerCoach({
  //       variables: {
  //         data: {
  //           firebaseUid: "",
  //           firstname: values.firstName,
  //           surname: values.lastName,
  //           email: values.email,
  //           username: values.username,
  //           avatar: values.avatar,
  //           accountType: {
  //             connect: {
  //               id: Number(values.accountType?.accountTypeId),
  //             },
  //           },
  //           role: {
  //             connect: { id: Number(values?.accountType?.roleId) },
  //           },
  //           coachProfile: {
  //             create: {
  //               title: values.title,
  //               canReceiveMessages: values.canReceiveMessages,
  //               school: { connect: { id: Number(values.schoolId) } },
  //             },
  //           },
  //         },
  //       },
  //     });
  //     if (response.data?.registerCoach) {
  //       await sendPasswordResetEmail(projectAuth, values?.email);
  //       // toast({
  //       //   title: "Coach successfully created.",
  //       //   description: `A password reset link has been sent to ${values.email} to complete the process.`,
  //       //   variant: "default",
  //       // });
  //       const response = await getCoaches({});
  //       await refetch();
  //       setCoaches(response.data?.coachProfiles as any);
  //       setIsOpen(!isOpen);
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Something went wrong.",
  //       description: `${
  //         error || "Could not successfully created a coach. Please try again."
  //       }`,
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleDeleteCoach = async (item: any) => {
    try {
      const response = await deleteCoach({
        variables: {
          where: {
            id: Number(item.id),
          },
        },
      });
      if (response.data?.deleteOneCoachProfile) {
        await deleteUser({
          variables: {
            where: {
              id: Number(item?.user?.id),
            },
          },
        });
        const caochesResponse = await getCoaches({});
        const usersResponse = await getUsers({});
        await refetch();
        setUsers(usersResponse.data?.users as any);
        setCoaches(caochesResponse.data?.coachProfiles as any);
        toast({
          title: "Coach successfully deleted.",
          description: `@${item?.user?.username} account has been deleted.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    }
  };

  const handleActivateCoach = async (item: any) => {
    setSelectedUser(item?.id);
    setIsactivating(true);
    try {
      const isCoachActive = item?.user?.isActive;
      await updateCoach({
        variables: {
          where: {
            id: Number(item?.id),
          },
          data: {
            user: {
              update: {
                isActive: { set: !isCoachActive },
              },
            },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
          isCoachActive ? "deactivated" : "activated"
        } `,
        variant: "successfull",
      });
      // if (resp.data?.updateOneCoachProfile) {
      // await refetch();
      // toast({
      //   title: "Coach successfully updated.",
      //   description: `${coach?.user?.username} has been ${
      //     coach?.user?.isActive ? "Deactivated" : "Activated"
      //   } `,
      //   variant: "default",
      // });
      // }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully update Coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsactivating(false);
      setSelectedUser(null);
    }
  };

  const handleVerifyCoach = async (item: any) => {
    setSelectedUser(item?.id);
    setIsVerifying(true);
    try {
      const isVerified = item?.verified;
      await updateCoach({
        variables: {
          where: {
            id: item?.id,
          },
          data: {
            verified: {
              set: !isVerified,
            },
          },
        },
      });
      toast({
        title: "Profile successfully updated.",
        description: `@${item?.user?.username} profile has been ${
          !isVerified ? "verified" : "unverified"
        } `,
        variant: "successfull",
      });
      // if (resp.data?.updateOneCoachProfile) {
      // await refetch();
      // toast({
      //   title: "Coach successfully updated.",
      //   description: `${coach?.user?.username} has been ${
      //     coach?.user?.isActive ? "Deactivated" : "Activated"
      //   } `,
      //   variant: "default",
      // });
      // }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not successfully created a coach. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
      setSelectedUser(null);
    }
  };

  const handleEditCoach = (item: any) => {
    router.push(`/coaches/edit?coach=${item?.id}`);
  };

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
    const coacheItems = [
      {
        name: "View Details",
        onClick: () => {
          router.push(`/coach/${Number(item?.id)}`, { scroll: true });
        },
      },
      {
        name: "Edit Profile",
        onClick: () => handleEditCoach(item),
      },
      {
        name: `${item.verified ? "Unverify" : "Verify"} Profile`,
        onClick: async () => await handleVerifyCoach(item),
      },
      {
        name: `${item?.user?.isActive ? "Deactivate" : "Activate"} Profile`,
        onClick: async () => await handleActivateCoach(item),
      },
      // {
      //   name: "Delete Coach",
      //   onClick: async () => await handleDeleteCoach(item),
      // },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex
            alignItems="center"
            justifyContent="start"
            onClick={() =>
              router.push(`/coach/${Number(item?.id)}`, { scroll: true })
            }
          >
            <UserAvatar
              className="h-[59px] w-[59px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.user?.avatar as string}
              fallback={`${item?.user?.username?.charAt(
                0
              )} ${item?.user?.firstname?.charAt(0)}`}
            />
            <Text className="ml-2 cursor-pointer">
              {item?.user?.firstname} {item?.user?.surname}
            </Text>
          </Flex>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.user?.username ? `@${item?.user?.username}` : ""}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.user?.email}</Text>
        </TableCell>
        <TableCell className="text-center">
          <Text>{item?.title}</Text>
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser && isActivating ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin " />
              {item?.user?.isActive ? "Deactivating..." : "Activating..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer"
              color={item?.user?.isActive ? "teal" : "rose"}
              // tooltip={item?.user?.isActive ? "Active" : "Deactivated"}
              icon={item?.user?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
              datatype="moderateDecrease"
            >
              {item?.user?.isActive ? "Active" : "Deactivated"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center">
          {item?.id === selectedUser && isVerifying ? (
            <div className="text-center flex flex-row justify-center items-center">
              <Icons.Loader2 className="mr-1 h-4 w-4 animate-spin " />
              {item?.verified ? "Unverifying..." : "Verifying..."}
            </div>
          ) : (
            <Badge
              size="xs"
              className="cursor-pointer px-[8px]"
              color={item?.verified ? "sky" : "rose"}
              // tooltip={item?.verified ? "Verified" : "Not Verified"}
              icon={() => {
                return item.verified ? (
                  <Icons.badgeCheck className="h-4 w-4 mr-1" color="sky" />
                ) : (
                  <Icons.badgeAlert className="h-4 w-4 mr-1" color="rose" />
                );
              }}
              datatype="moderateDecrease"
            >
              {item?.verified ? "Verified" : "Not Verified"}
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-center cursor-pointer">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <MenubarCard
              trigger={<Icons.moreHorizontal className="cursor-pointer" />}
              items={coacheItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <Title>Coaches</Title>
            <Icons.whistle className="h-4 w-4 ml-2 fill-tremor-content-emphasis dark:fill-dark-tremor-content-emphasis" />
          </div>
          <Text>Coaches Overview</Text>
        </div>
        <div className="ml-auto justify-end">
          <Button onClick={() => router.push("/coaches/new")}>
            Add New Coach
          </Button>
          {/* <CreateCoach
              onCreateCoach={(values) => handleCreateCoach(values)}
              isOpen={isOpen}
              onClose={() => setIsOpen(!isOpen)}
            /> */}
        </div>
      </div>
      <Divider></Divider>
      <TabGroup className="mt-6">
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={1} numItemsLg={2} className="mt-6 gap-6">
              <CoachesCount />
            </Grid>
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
                  placeholder="Search for coach..."
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
            <UniversalTable
              title="Coach List"
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
