/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ContentHeader from "../content-header";
import { Separator } from "../ui/separator";
import TabCard from "../tab-card";
import {
  GetUserQuery,
  GetUsersQuery,
  QueryMode,
  SortOrder,
  useGetPositionQuery,
  useGetUsersQuery,
  useUpdateAthletePositionMutation,
} from "@/services/graphql";
import { SearchInput } from "../search-input";
import ComboboxCard from "../combobox-card";
import { useDebouncedValue } from "@mantine/hooks";
import { PromptStatusEnum } from "@/lib/enums/updating-profile.enum";
import UserAvatar from "../user-avatar";
import { CommandItem } from "../ui/command";
import { CheckIcon, MoreHorizontalIcon } from "../Icons";
import { cn, formatDate } from "@/lib/utils";
import UniversalTable from "../universal-table";
import Pagination from "../pagination";
import { generateProfilePath } from "@/lib/helpers";
import { TableCell, TableRow } from "../ui/table";
import MenubarCard from "../menubar";
import PromptAlert from "../prompt-alert";
import { useToast } from "@/hooks/use-toast";

interface PositionDetailProps {
  params: {
    id: number;
  };
}

const UserHeaderItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Position" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const PositionDetail: FC<PositionDetailProps> = ({ params }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [permissionValue, setPermissionValue] = useState<string>("");
  const [userValue, setUserValue] = useState<string>("");
  const [userSearchValue, setUserSearchValue] = useState<string>("");
  const [debounced] = useDebouncedValue(permissionValue, 300);
  const [debouncedUsers] = useDebouncedValue(userValue, 300);
  const [debouncedSearchUsers] = useDebouncedValue(userSearchValue, 300);
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | number>({});
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [promptStatus, setPromptStatus] = useState<PromptStatusEnum | null>();
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [removeUserPrompt, setRemoveUserPrompt] = useState(false);
  const [activePermission, setActivePermission] = useState<any | null>(null);
  const [removePermissionPrompt, setRemovePermissionPrompt] = useState(false);

  const [updatePostion, { loading: updatingPosition }] =
    useUpdateAthletePositionMutation();

  const {
    data: positionData,
    loading,
    refetch,
    fetchMore,
  } = useGetPositionQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
  });

  const {
    data: athleteData,
    loading: loadingUsers,
    fetchMore: fetchMoreAthleteData,
    refetch: refetchAthleteData,
  } = useGetUsersQuery({
    variables: {
      where: {
        athleteProfile: {
          is: {
            positionId: {
              equals: params?.id,
            },
          },
        },
        OR: [
          {
            username: {
              contains: debouncedUsers,
              mode: QueryMode.Insensitive,
            },
            firstname: {
              contains: debouncedUsers,
              mode: QueryMode.Insensitive,
            },
            surname: {
              contains: debouncedUsers,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder?.Desc,
      },
    },
  });

  const { data: addUsersdata, loading: loadingAddUserData } = useGetUsersQuery({
    variables: {
      where: {
        athleteProfile: {
          is: {
            positionId: {
              notIn: [params?.id],
            },
          },
        },
        OR: [
          {
            username: {
              contains: debouncedSearchUsers,
              mode: QueryMode.Insensitive,
            },
            firstname: {
              contains: debouncedSearchUsers,
              mode: QueryMode.Insensitive,
            },
            surname: {
              contains: debouncedSearchUsers,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder?.Desc,
      },
    },
  });

  const usersDataOptions = useMemo(() => {
    return addUsersdata?.users?.map((a) => {
      return {
        id: a?.id,
        label: `${a?.firstname} ${a?.surname}`,
        value: a?.username,
        avatar: a?.avatar,
      };
    });
  }, [addUsersdata?.users]);

  const subHeaderItems = [
    {
      title: "Position:",

      content:
        `${positionData?.position?.name} ${positionData?.position?.shortName}` ||
        "N/A",
    },
    {
      title: "Category Name:",

      content: positionData?.position?.category?.name || "N/A",
    },

    {
      title: "Created At:",
      content:
        `${
          positionData?.position?.category?.createdAt
            ? formatDate(
                new Date(positionData?.position?.category?.createdAt),
                "MMMM dd yyyy"
              )
            : ""
        }` || "N/A",
    },
    {
      title: "UpdatedAt:",
      content:
        `${
          positionData?.position?.category?.createdAt
            ? formatDate(
                new Date(positionData?.position?.category?.createdAt),
                "MMMM dd yyyy"
              )
            : ""
        }` || "N/A",
    },
  ];

  const userCustomItems = ({ item, id }: { item: any; id: number }) => {
    return (
      <CommandItem
        className="capitalize "
        key={item?.id || id}
        value={selectedUser}
        onSelect={() => {
          setSelectedUser({ value: item?.value, id: item?.id });
          setOpenUser(false);
        }}
      >
        <>
          <div className="flex items-center">
            <UserAvatar
              fallbackClassName="h-[55px] w-[55px]"
              className="h-[55px] w-[55px] shadow mr-4 "
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.label?.charAt(0)} `}
            />

            <div>
              <div className="text-sm mb-0.5">{item?.label}</div>
              <div className="text-xs">{`@ ${item?.value}`}</div>
            </div>
          </div>
        </>
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            selectedUser?.value === item?.value ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    );
  };

  const handleUpdateUser = async (selectedUser: any) => {
    try {
      if (isAddingUser === true) {
        await updatePostion({
          variables: {
            where: {
              id: params?.id,
            },
            data: {},
          },
        });
        toast({
          title: "User successfully Added.",
          // description: `User has been successfully added to ${data?.role?.title} `,
          variant: "successfull",
        });
      } else {
        await updatePostion({
          variables: {
            where: {
              id: params?.id,
            },
            data: {},
          },
        });
        toast({
          title: "User successfully removed.",
          // description: `User has been successfully removed from ${data?.role?.title} `,
          variant: "successfull",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: `${
          error || "Could not add Permission. Please try again."
        }`,
        variant: "destructive",
      });
    } finally {
      setIsAddingUser(false);
      setPromptStatus(null);
      setSelectedUser({});
      setUserSearchValue("");
      setActiveUser(null);
      setRemoveUserPrompt(false);
    }
  };

  const renderUsers = ({ item, id }: { item: any; id: any }) => {
    const userPath = generateProfilePath(item as GetUserQuery["user"]);
    const UserItems = [
      {
        name: "View User",
        onClick: () => {
          router.push(userPath);
        },
      },

      // {
      //   name: "Remove User",
      //   onClick: () => handleRemoveUser(item),
      // },
    ];

    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div
            className="flex flex-row items-center justify-start"
            onClick={() =>
              router.push(`/athlete/${item?.id}`, {
                scroll: true,
              })
            }
          >
            <UserAvatar
              className="h-[79px] w-[79px] shadow cursor-pointer"
              fallbackType="name"
              avatar={item?.avatar as string}
              fallback={`${item?.username?.charAt(0)} ${item?.firstname?.charAt(
                0
              )}`}
            />
            <div className="ml-4 cursor-pointer text-base">
              {item?.firstname} {item?.surname}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.username}
          </div>
        </TableCell>
        <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {`${item?.athleteProfile?.position?.name}  ${item?.athleteProfile?.position?.shortName}`}
          </div>
        </TableCell>
        <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.createdAt), "MMMM dd yyyy")}
          </div>
        </TableCell>
        <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {formatDate(new Date(item?.updatedAt), "MMMM dd yyyy")}
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
              items={UserItems}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const lastUserId = useMemo(() => {
    const lastPostInResults =
      athleteData?.users[athleteData?.users?.length - 1];
    return lastPostInResults?.id;
  }, [athleteData?.users]);

  const fetchNextUsers = () => {
    fetchMoreAthleteData({
      variables: {
        where: {
          athleteProfile: {
            is: {
              positionId: {
                equals: params?.id,
              },
            },
          },
        },
        take: 10,
        skip: 1,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetUsersQuery,
        { fetchMoreResult }
      ): GetUsersQuery => {
        if (!fetchMoreResult || fetchMoreResult?.users?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.users;
          fetchMoreResult.users = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPreviousUsers = () => {
    fetchMoreAthleteData({
      variables: {
        where: {
          athleteProfile: {
            is: {
              positionId: {
                equals: params?.id,
              },
            },
          },
        },
        take: -10,
        skip: athleteData?.users?.length,
        cursor: {
          id: lastUserId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetUsersQuery,
        { fetchMoreResult }
      ): GetUsersQuery => {
        if (!fetchMoreResult || fetchMoreResult?.users?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.users;
          const fetchMorePosts = fetchMoreResult?.users;
          fetchMoreResult.users = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const renderUserList = () => {
    return (
      <div className="w-full">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full mt-4 mb-3 sm:mb-8">
          <SearchInput
            className=" mb-8 sm:mb-0 w-full "
            onChange={(e) => setUserValue(e.target.value)}
            placeholder="Type to search..."
          />
          <div className="mb-8 sm:mb-0 mt-3 sm:mt-6 w-full  flex flex-col ml-0 sm:ml-8">
            <ComboboxCard
              valueKey="value"
              displayKey="label"
              IdKey="value"
              label="Add Athlete"
              id="user"
              placeholder={"Select Athlete"}
              isOpen={openUser}
              scrollAreaClass="h-72"
              hasSearch
              shouldFilter={false}
              searchValue={userSearchValue}
              handleSearch={(search) => setUserSearchValue(search)}
              loading={loadingAddUserData}
              onClose={() => setOpenUser(!openUser)}
              items={usersDataOptions as any}
              selectedValue={selectedUser}
              customRenderItems={userCustomItems}
            />

            <div className="w-full flex mt-6 ">
              <Button
                className="ml-auto"
                variant="default"
                onClick={() => {
                  setPromptStatus(PromptStatusEnum.ADDING);
                  setIsAddingUser(true);
                }}
                disabled={Object?.keys(selectedUser)?.length === 0}
              >
                Add Athlete
              </Button>
            </div>
          </div>
        </div>
        <UniversalTable
          title="Users List"
          headerItems={UserHeaderItems}
          items={athleteData?.users as any[]}
          loading={loadingUsers}
          renderItems={renderUsers}
        />
        {loadingUsers || !athleteData?.users?.length ? null : (
          <Pagination onNext={fetchNextUsers} onPrevious={fetchPreviousUsers} />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={updatingPosition}
          loading={updatingPosition}
          content={`This will permanently remove ${activeUser?.username}.`}
          showPrompt={removeUserPrompt}
          handleHidePrompt={() => {
            setActivePermission(null);
            setRemovePermissionPrompt(false);
          }}
          handleConfirmPrompt={() => handleUpdateUser(activeUser)}
        />
        {/* <PromptAlert
            disableConfirmBtn={updatingRole}
            loading={updatingRole}
            content={`This action will add @${selectedUser?.value} to ${data?.role?.title}.`}
            showPrompt={promptStatus === PromptStatusEnum.ADDING}
            handleHidePrompt={() => {
              setPromptStatus(null);
              setSelectedUser({});
              setIsAddingUser(false);
            }}
            handleConfirmPrompt={() => handleUpdateUser(selectedUser)}
          /> */}
      </div>
    );
  };

  return (
    <>
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <ContentHeader title="Position Detail" subItems={subHeaderItems} />
      <Separator className="my-6" />

      <TabCard
        tabs={[{ name: "Athletes" }]}
        tabContent={[{ content: renderUserList() }]}
      />
    </>
  );
};

export default PositionDetail;
