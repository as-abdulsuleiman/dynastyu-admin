/** @format */

"use client";

import {
  useGetRoleQuery,
  useGetPermissionsQuery,
  QueryMode,
  SortOrder,
  useGetRolesQuery,
  GetPermissionsQuery,
  useGetUsersQuery,
  GetUsersQuery,
  useUpdateRoleMutation,
} from "@/services/graphql";
import React, { FC, useState, useMemo } from "react";
import ContentHeader from "../content-header";
import { Separator } from "../ui/separator";
import TabCard from "../tab-card";
import { formatDate } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import UniversalTable from "../universal-table";
import { TableCell, TableRow } from "../ui/table";
import MenubarCard from "../menubar";
import { Loader2Icon, MoreHorizontalIcon, PlusIcon } from "../Icons";
import { Button } from "../ui/button";
import Pagination from "../pagination";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchInput } from "../search-input";
import { useRouter } from "next/navigation";
import PromptAlert from "../prompt-alert";
import { useToast } from "@/hooks/use-toast";

interface RoleDetailProps {
  params: {
    id: number;
  };
}
const PermissionsHeaderItems = [
  { name: "Title" },
  //   { name: "Role" },
  { name: "Query" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const UserHeaderItems = [
  { name: "Firstname" },
  { name: "Surname" },
  { name: "Username" },
  { name: "Account Type" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const RoleDetail: FC<RoleDetailProps> = ({ params }) => {
  const [permissionValue, setPermissionValue] = useState<string>("");
  const [userValue, setUserValue] = useState<string>("");
  const [debounced] = useDebouncedValue(permissionValue, 300);
  const [debouncedUsers] = useDebouncedValue(userValue, 300);
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [removeUserPrompt, setRemoveUserPrompt] = useState(false);
  const [removingUser, setRemovingUser] = useState(false);
  const [activePermission, setActivePermission] = useState<any | null>(null);
  const [removePermissionPrompt, setRemovePermissionPrompt] = useState(false);
  const [removingPermission, setRemovingPermission] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [updateRole] = useUpdateRoleMutation();
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
            users: {
              some: {
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
            },
          },
        },
      },
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const { data: rolesData } = useGetRolesQuery({
    variables: {
      where: {
        id: { equals: params?.id },
      },
    },
  });
  console.log("permissionData", permissionData);
  console.log("rolesData", rolesData);

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
  const handleRemovePermission = (item: any) => {
    setActivePermission(item);
    setRemovePermissionPrompt(true);
  };

  const handleComfirmRemovePermission = async (item: any) => {
    setRemovingPermission(true);
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
      setRemovingPermission(false);
      setRemovePermissionPrompt(false);
    }
  };

  const handleRemoveUser = (item: any) => {
    setActiveUser(item);
    setRemoveUserPrompt(true);
  };

  const handleComfirmRemoveUser = async (item: any) => {
    setRemovingPermission(true);
    try {
      await updateRole({
        variables: {
          where: {
            id: params?.id,
          },
          data: {
            users: {
              disconnect: [
                {
                  id: activeUser?.id,
                },
              ],
            },
          },
        },
      });
      await refetchUsers();
      toast({
        title: "User successfully removed.",
        description: `${item?.username} has been successfully removed`,
        variant: "successfull",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      setActiveUser(null);
      setRemovingUser(false);
      setRemoveUserPrompt(false);
    }
  };

  const renderPermissionList = () => {
    return (
      <div>
        <SearchInput
          className="my-8"
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
          disableConfirmBtn={removingPermission}
          loading={removingPermission}
          content={`This will permanently remove ${activePermission?.title} permission.`}
          showPrompt={removePermissionPrompt}
          handleHidePrompt={() => {
            //   setSelectedPermission({});
            // setIsDisabled(true);
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

  const renderUserList = () => {
    return (
      <div>
        <SearchInput
          className="my-8"
          onChange={(e) => setUserValue(e.target.value)}
          placeholder="Type to search..."
        />
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
          disableConfirmBtn={removingUser}
          loading={removingUser}
          content={`This will permanently remove ${activeUser?.username}.`}
          showPrompt={removeUserPrompt}
          handleHidePrompt={() => {
            //   setSelectedPermission({});
            // setIsDisabled(true);
            setActivePermission(null);
            setRemovePermissionPrompt(false);
          }}
          handleConfirmPrompt={() => handleComfirmRemoveUser(activeUser)}
        />
      </div>
    );
  };

  const renderUsers = ({ item, id }: { item: any; id: any }) => {
    const UserItems = [
      {
        name: "View User",
        onClick: () => {
          router.push(`/athlete/${item?.id}`, {
            scroll: true,
          });
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
          <div className="text-right w-100 flex flex-row items-center justify-start">
            {item?.firstname}
          </div>
        </TableCell>
        <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.surname}
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
      // {
      //   name: "View Permission",
      //   onClick: () => {
      //     router.push(`/permission/${item?.id}`, {
      //       scroll: true,
      //     });
      //   },
      // },

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
        {/* <TableCell className="text-center ">
          <div className="text-right w-100 flex flex-row items-center justify-center">
            {item?.role?.title}
          </div>
        </TableCell> */}
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
      <ContentHeader
        title="Role"
        subHeader={`${data?.role?.title || "Role details"} `}
      />
      <Separator className="my-6" />

      <TabCard
        tabs={[{ name: "Permissions" }, { name: "Users" }]}
        tabContent={[
          { content: renderPermissionList() },
          { content: renderUserList() },
          // { content: renderFlaggedPostRequest() },
        ]}
      />
    </>
  );
};

export default RoleDetail;
