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
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";
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
  useDeleteCoachMutation,
  useGetCoachesQuery,
  useRegisterCoachMutation,
  useUpdateCoachMutation,
} from "@/services/graphql";
import Pagination from "@/components/pagination";
import UniversalTable from "@/components/universal-table";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { sendPasswordResetEmail } from "firebase/auth";
import { projectAuth } from "@/services/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { CoachValidator } from "@/lib/validators/coach";
import * as yup from "yup";
import { MoreHorizontal } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import UserAvatar from "@/components/user-avatar";
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
  { name: "Action" },
];

type FormData = yup.InferType<typeof CoachValidator>;

const Coaches: FC<CoachesProps> = ({}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 300);
  const [registerCoach] = useRegisterCoachMutation();
  const [deteteCoach] = useDeleteCoachMutation();
  const [updateCoach] = useUpdateCoachMutation();

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

  const handleCreateCoach = async (values: FormData) => {
    try {
      const response = await registerCoach({
        variables: {
          data: {
            firebaseUid: "",
            firstname: values.firstName,
            surname: values.lastName,
            email: values.email,
            username: values.username,
            avatar: values.avatar,
            accountType: {
              connect: {
                id: Number(values.accountType?.accountTypeId),
              },
            },
            role: {
              connect: { id: Number(values?.accountType?.roleId) },
            },
            coachProfile: {
              create: {
                title: values.title,
                canReceiveMessages: values.canReceiveMessages,
                school: { connect: { id: Number(values.schoolId) } },
              },
            },
          },
        },
      });
      if (response.data?.registerCoach) {
        await sendPasswordResetEmail(projectAuth, values?.email);
        toast({
          title: "Coach successfully created.",
          description: `A password reset link has been sent to ${values.email} to complete the process.`,
          variant: "default",
        });
        refetch();
        setIsOpen(!isOpen);
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

  const handleDeleteCoach = async (coachId: number, coach: any) => {
    try {
      const response = await deteteCoach({
        variables: {
          where: {
            id: Number(coachId),
          },
        },
      });
      if (response.data?.deleteOneCoachProfile) {
        await refetch();
        toast({
          title: "Coach successfully deleted.",
          description: `${coach?.user?.username} account has been deleted.`,
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

  const handleActiveCoach = async (coachId: number, coach: any) => {
    try {
      const isCoachActive = coach?.user?.isActive;
      const resp = await updateCoach({
        variables: {
          where: {
            id: Number(coachId),
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
      if (resp.data?.updateOneCoachProfile) {
        toast({
          title: "Coach successfully updated.",
          description: `${coach?.user?.username} has been ${
            coach?.user?.isActive ? "Deactivated" : "Activated"
          } `,
          variant: "default",
        });
        refetch();
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
        onclick: (coachId: number) => {
          router.push(`/coach/${Number(coachId)}`);
        },
      },
      {
        name: `${item?.user?.isActive ? "Deactivate" : "Activate"} Coach`,
        onclick: async (coachId: number) => {
          await handleActiveCoach(coachId, item);
        },
      },
      {
        name: "Delete Coach",
        onclick: async (coachId: number) => {
          await handleDeleteCoach(coachId, item);
        },
      },
      {
        name: "Approve Coach",
        onclick: () => {},
      },
    ];
    return (
      <TableRow key={item?.id}>
        <TableCell>
          <Flex alignItems="center" justifyContent="start">
            <UserAvatar
              fallbackType="name"
              avatar={item?.user?.avatar as string}
              fallback={`${item?.user?.username?.charAt(
                0
              )} ${item?.user?.firstname?.charAt(0)}`}
            />
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
            tooltip="decrease"
            icon={item?.user?.isActive ? StatusOnlineIcon : StatusOfflineIcon}
            datatype="moderateDecrease"
          >
            {item?.user?.isActive ? "Active" : "Deactivated"}
          </Badge>
        </TableCell>
        <TableCell className="text-center cursor-pointer">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            <Menubar className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent focus-within:bg-transparent focus-visible:bg-transparent active:bg-transparent">
                  <MoreHorizontal />
                </MenubarTrigger>
                <MenubarContent
                  side="bottom"
                  align="start"
                  sideOffset={-3}
                  alignOffset={-100}
                  className="rounded-tremor-default cursor-pointer bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card"
                >
                  {coacheItems?.map((val, id) => {
                    return (
                      <MenubarItem
                        onClick={() => {
                          val?.onclick(item?.id);
                        }}
                        key={id}
                        className="cursor-pointer tremor-SelectItem-root flex justify-start items-center text-tremor-default  ui-selected:text-tremor-content-strong ui-selected:bg-tremor-background-muted text-tremor-content-emphasis dark:ui-active:bg-dark-tremor-background-muted dark:ui-active:text-dark-tremor-content-strong dark:ui-selected:text-dark-tremor-content-strong dark:ui-selected:bg-dark-tremor-background-muted dark:text-dark-tremor-content-emphasis px-2.5 py-2.5"
                      >
                        {val?.name}
                      </MenubarItem>
                    );
                  })}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex flex-col">
          <Title>Coaches</Title>
          <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
        </div>
        <div className="ml-auto justify-end">
          <CreateCoach
            onCreateCoach={(values) => handleCreateCoach(values)}
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
          />
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
              title="Coaches List"
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
