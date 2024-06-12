/** @format */

"use client";

import {
  useGetRoleQuery,
  useGetPermissionsQuery,
  QueryMode,
  SortOrder,
  GetPermissionsQuery,
  useGetUsersQuery,
  GetUsersQuery,
  useUpdateRoleMutation,
  GetUserQuery,
} from "@/services/graphql";
import React, { FC, useState, useMemo } from "react";
import ContentHeader from "../content-header";
import { Separator } from "../ui/separator";
import TabCard from "../tab-card";
import { cn, formatDate } from "@/lib/utils";
import UniversalTable from "../universal-table";
import { TableCell, TableRow } from "../ui/table";
import MenubarCard from "../menubar";
import { CheckIcon, Loader2Icon, MoreHorizontalIcon, PlusIcon } from "../Icons";
import { Button } from "../ui/button";
import Pagination from "../pagination";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchInput } from "../search-input";
import { useRouter } from "next/navigation";
import PromptAlert from "../prompt-alert";
import { useToast } from "@/hooks/use-toast";
import { generateProfilePath } from "@/lib/helpers";
import ComboboxCard from "../combobox-card";
import { CommandItem } from "@/components/ui/command";
import UserAvatar from "../user-avatar";
import { PromptStatusEnum } from "@/lib/enums/updating-profile.enum";

interface RoleDetailProps {
  params: {
    id: number;
  };
}
const PermissionsHeaderItems = [
  { name: "Title" },
  { name: "Query" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const UserHeaderItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Account Type" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const RoleDetail: FC<RoleDetailProps> = ({ params }) => {
  const [permissionValue, setPermissionValue] = useState<string>("");
  const [userValue, setUserValue] = useState<string>("");
  const [userSearchValue, setUserSearchValue] = useState<string>("");
  const [debounced] = useDebouncedValue(permissionValue, 300);
  const [debouncedUsers] = useDebouncedValue(userValue, 300);
  const [debouncedSearchUsers] = useDebouncedValue(userSearchValue, 300);
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [removeUserPrompt, setRemoveUserPrompt] = useState(false);
  const [activePermission, setActivePermission] = useState<any | null>(null);
  const [removePermissionPrompt, setRemovePermissionPrompt] = useState(false);
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | number>({});
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [promptStatus, setPromptStatus] = useState<PromptStatusEnum | null>();
  const router = useRouter();
  const { toast } = useToast();
  const [updateRole, { loading: updatingRole }] = useUpdateRoleMutation();
  const { data, loading } = useGetRoleQuery({
    variables: {
      where: {
        id: params?.id,
      },
    },
  });

  const {
    data: permissionData,
    loading: loadingPermissions,
    refetch: refetchPermissions,
    fetchMore,
  } = useGetPermissionsQuery({
    variables: {
      where: {
        roles: {
          some: {
            id: {
              equals: params?.id,
            },
          },
        },
        OR: [
          {
            title: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
            query: {
              contains: debounced,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const {
    data: usersData,
    loading: loadingUsers,
    refetch: refetchUsers,
    fetchMore: fetchMoreUsers,
  } = useGetUsersQuery({
    variables: {
      where: {
        role: {
          is: {
            id: {
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
        createdAt: SortOrder.Desc,
      },
    },
  });

  const { data: addUsersdata, loading: loadingAddUserData } = useGetUsersQuery({
    variables: {
      where: {
        accountType: {
          is: {
            title: { equals: "Coach" },
          },
        },
        role: {
          isNot: {
            id: {
              equals: params?.id,
            },
          },
        },
        OR: [
          {
            firstname: {
              contains: debouncedSearchUsers,
              mode: QueryMode.Insensitive,
            },
            surname: {
              contains: debouncedSearchUsers,
              mode: QueryMode.Insensitive,
            },
            username: {
              contains: debouncedSearchUsers,
              mode: QueryMode.Insensitive,
            },
          },
        ],
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

  const lastPermissionsId = useMemo(() => {
    const lastPostInResults =
      permissionData?.permissions[permissionData?.permissions?.length - 1];
    return lastPostInResults?.id;
  }, [permissionData?.permissions]);

  const fetchNextPermissions = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastPermissionsId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetPermissionsQuery,
        { fetchMoreResult }
      ): GetPermissionsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.permissions?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.permissions;
          fetchMoreResult.permissions = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPreviousPermissions = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: permissionData?.permissions?.length,
        cursor: {
          id: lastPermissionsId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetPermissionsQuery,
        { fetchMoreResult }
      ): GetPermissionsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.permissions?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.permissions;
          const fetchMorePosts = fetchMoreResult?.permissions;
          fetchMoreResult.permissions = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const lastUserId = useMemo(() => {
    const lastPostInResults = usersData?.users[usersData?.users?.length - 1];
    return lastPostInResults?.id;
  }, [usersData?.users]);

  const fetchNextUsers = () => {
    fetchMoreUsers({
      variables: {
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
    fetchMoreUsers({
      variables: {
        take: -10,
        skip: usersData?.users?.length,
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

  const handleUpdateUser = async (selectedUser: any) => {
    try {
      if (isAddingUser === true) {
        await updateRole({
          variables: {
            where: {
              id: params?.id,
            },
            data: {
              users: {
                connect: [{ id: selectedUser?.id }],
              },
            },
          },
        });
        toast({
          title: "User successfully Added.",
          description: `User has been successfully added to ${data?.role?.title} `,
          variant: "successfull",
        });
      } else {
        await updateRole({
          variables: {
            where: {
              id: params?.id,
            },
            data: {
              users: {
                disconnect: [{ id: activeUser?.id }],
              },
            },
          },
        });
        toast({
          title: "User successfully removed.",
          description: `User has been successfully removed from ${data?.role?.title} `,
          variant: "successfull",
        });
      }
      await refetchUsers();
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

  const handleRemoveUser = (item: any) => {
    setActiveUser(item);
    setRemoveUserPrompt(true);
  };

  const handleRemovePermission = (item: any) => {
    setActivePermission(item);
    setRemovePermissionPrompt(true);
  };

  const handleComfirmRemovePermission = async (item: any) => {
    try {
      await updateRole({
        variables: {
          where: {
            id: params?.id,
          },
          data: {
            permissions: {
              disconnect: [
                {
                  id: activePermission?.id,
                },
              ],
            },
          },
        },
      });
      await refetchPermissions();
      toast({
        title: "Permissions successfully removed.",
        description: `${item?.title} permission has been successfully removed`,
        variant: "successfull",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      setActivePermission(null);
      setRemovePermissionPrompt(false);
    }
  };

  const renderPermissionList = () => {
    return (
      <div>
        <SearchInput
          className="my-8 w-full md:w-1/2"
          onChange={(e) => setPermissionValue(e.target.value)}
          placeholder="Type to search..."
        />
        <UniversalTable
          title="Permissions List"
          headerItems={PermissionsHeaderItems}
          items={permissionData?.permissions as any[]}
          loading={loadingPermissions}
          renderItems={renderPermissions}
        />
        {loadingPermissions || !permissionData?.permissions?.length ? null : (
          <Pagination
            onNext={fetchNextPermissions}
            onPrevious={fetchPreviousPermissions}
          />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={updatingRole}
          loading={updatingRole}
          content={`This will permanently remove ${activePermission?.title} permission.`}
          showPrompt={removePermissionPrompt}
          handleHidePrompt={() => {
            setActivePermission(null);
            setRemovePermissionPrompt(false);
          }}
          handleConfirmPrompt={() =>
            handleComfirmRemovePermission(activePermission)
          }
        />
      </div>
    );
  };

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
              label="Add User"
              id="user"
              placeholder={"Select User"}
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
                Add User
              </Button>
            </div>
          </div>
        </div>
        <UniversalTable
          title="Users List"
          headerItems={UserHeaderItems}
          items={usersData?.users as any[]}
          loading={loadingUsers}
          renderItems={renderUsers}
        />
        {loadingUsers || !usersData?.users?.length ? null : (
          <Pagination onNext={fetchNextUsers} onPrevious={fetchPreviousUsers} />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={updatingRole}
          loading={updatingRole}
          content={`This will permanently remove ${activeUser?.username}.`}
          showPrompt={removeUserPrompt}
          handleHidePrompt={() => {
            setActivePermission(null);
            setRemovePermissionPrompt(false);
          }}
          handleConfirmPrompt={() => handleUpdateUser(activeUser)}
        />
        <PromptAlert
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
        />
      </div>
    );
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

      {
        name: "Remove User",
        onClick: () => handleRemoveUser(item),
      },
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
            {item?.accountType?.title}
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

  const renderPermissions = ({ item, id }: { item: any; id: any }) => {
    const permissionItems = [
      {
        name: "Remove Permission",
        onClick: () => handleRemovePermission(item),
      },
    ];

    return (
      <TableRow key={item?.id}>
        <TableCell>
          <div className="text-right w-100 flex flex-row items-center justify-start">
            {item?.title}
          </div>
        </TableCell>
        <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.query}
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
              items={permissionItems}
            />
          </div>
        </TableCell>
      </TableRow>
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
      <ContentHeader
        title="Role "
        subHeader={`${data?.role?.title || "Role Overview"} `}
      />
      <Separator className="my-6" />

      <TabCard
        tabs={[{ name: "Permissions" }, { name: "Users" }]}
        tabContent={[
          { content: renderPermissionList() },
          { content: renderUserList() },
        ]}
      />
    </>
  );
};

export default RoleDetail;
