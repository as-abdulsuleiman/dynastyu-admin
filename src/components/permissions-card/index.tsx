/** @format */

"use client";

import ContentHeader from "@/components/content-header";
import React, { FC, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Loader2Icon, MoreHorizontalIcon, PlusIcon } from "../Icons";
import { TableCell, TableRow } from "../ui/table";
import UniversalTable from "../universal-table";
import {
  SortOrder,
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionsQuery,
  useUpdatePermissionMutation,
  useUpdateRoleMutation,
} from "@/services/graphql";
import { formatDate } from "@/lib/utils";
import MenubarCard from "../menubar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import { PermissionValidator } from "@/lib/validators/permission";
import ModalCard from "../modal";
import { useToast } from "@/hooks/use-toast";
import PromptAlert from "../prompt-alert";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { getPermission } from "@/lib/helpers";
import { useRootStore } from "@/mobx";
import Accesscontrol from "../accesscontrol";

type FormData = yup.InferType<typeof PermissionValidator>;

export const PermissionsCard: FC = () => {
  const router = useRouter();
  const {
    authStore: { user },
  } = useRootStore();
  const [activePermission, setActivePermission] = useState<any | null>(null);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  //   const [selectedPermission, setSelectedPermission] = useState<any>({});
  const [deletePermissionPrompt, setDeletePermissionPrompt] = useState(false);
  const [deletingPermission, setDeletingPermission] = useState(false);
  const [createPermission] = useCreatePermissionMutation();
  const [updatePermission] = useUpdatePermissionMutation();
  const [deletePermission] = useDeletePermissionMutation();

  const permissionName = getPermission(
    user?.role?.permissions,
    "admin.accesslevel.update"
  );

  const permissionsHeaderItems = [
    { name: "Title" },
    { name: "Query" },
    { name: "Created At" },
    { name: "Updated At" },
  ];

  if (permissionName !== ("" || null || undefined)) {
    permissionsHeaderItems?.push({ name: "Actions" });
  }

  const { toast } = useToast();
  const {
    data: permissionData,
    loading,
    refetch,
  } = useGetPermissionsQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(PermissionValidator),
    defaultValues: {
      title: "",
      query: "",
    },
    values: {
      title: activePermission?.title || "",
      query: activePermission?.query || "",
    },
    resetOptions: {
      // keepDirtyValues: true, // user-interacted input will be retained
      // keepErrors: true, // input errors will be retained with value update
    },
  });

  const handleDeletePermission = (item: any) => {
    setActivePermission(item);
    setDeletePermissionPrompt(true);
  };

  const handleConfirmPrompt = async (item: any) => {
    setDeletingPermission(true);
    const roleId = item?.roles?.map((role: any) => {
      return {
        id: role?.id,
      };
    });
    try {
      // await updatePermission({
      //   variables: {
      //     where: {
      //       id: item?.id,
      //     },
      //     data: {
      //       roles: {
      //         disconnect: [{}],
      //       },
      //     },
      //   },
      // });
      const res = await deletePermission({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      if (res?.data) {
        await refetch();
        toast({
          title: "Permissions successfully deleted.",
          description: `${item?.title} permission has been successfully deleted`,
          variant: "successfull",
        });
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      setIsDisabled(true);
      setActivePermission(null);
      setDeletingPermission(false);
      setDeletePermissionPrompt(false);
    }
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
        name: "Edit Permission",
        onClick: () => {
          setActivePermission(item);
          setIsNew(false);
          setIsOpen(true);
        },
      },
      {
        name: "Delete Permission",
        onClick: () => handleDeletePermission(item),
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
        <Accesscontrol name={permissionName}>
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
        </Accesscontrol>
      </TableRow>
    );
  };
  const onSubmit = async (values: FormData) => {
    try {
      const payload = await PermissionValidator.validate(values);
      if (isNew) {
        await createPermission({
          variables: {
            data: {
              title: payload?.title || "",
              query: payload?.query || "",
            },
          },
        });
        toast({
          title: "Permissions successfully created.",
          description: `${payload?.title} permission has been successfully created`,
          variant: "successfull",
        });
      } else {
        await updatePermission({
          variables: {
            where: {
              id: activePermission?.id,
            },
            data: {
              title: { set: payload?.title },
              query: { set: payload?.query },
            },
          },
        });
        toast({
          title: "Permission successfully updated.",
          description: `${payload?.title} permission has been successfully updated`,
          variant: "successfull",
        });
      }
      refetch();
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      reset();
      setIsNew(false);
      setIsOpen(false);
      setActivePermission(null);
    }
  };

  const renderCreatePermission = () => {
    return (
      <form
        id="create_permission"
        name="create_permission"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <Input
              id="permission_title"
              placeholder="Enter Role Title"
              label="Title"
              type="text"
              className="bg-transparent"
              error={errors?.title?.message as string}
              {...register("title", {
                required: true,
              })}
            />
          </div>
          <div className="col-span-6">
            <Input
              id="permission_query"
              placeholder="Enter Query"
              label="Query"
              type="text"
              className="bg-transparent"
              error={errors?.query?.message as string}
              {...register("query", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 mt-5">
            <Button
              variant="default"
              disabled={isSubmitting || !isValid}
              className="flex flex-row ml-auto"
              type="submit"
            >
              {isSubmitting ? (
                <div className="flex flex-row items-center justify-center">
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <div className="w-full h-full">
      <ContentHeader title="Permissions" subHeader="Permisssions Overview" />
      <Separator className="my-6" />
      <Accesscontrol name={permissionName}>
        <Button
          className="flex flex-row ml-auto"
          onClick={() => {
            setIsNew(true);
            setIsOpen(true);
          }}
        >
          Add Permission
          <PlusIcon className="ml-3 h-[18px] w-[18px]" />
        </Button>
      </Accesscontrol>
      <UniversalTable
        title="Permissions List"
        headerItems={permissionsHeaderItems}
        items={permissionData?.permissions as any[]}
        loading={loading}
        renderItems={renderPermissions}
      />
      <ModalCard
        isModal={true}
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          setIsNew(false);
          setIsOpen(!isOpen);
          setActivePermission(null);
        }}
      >
        {renderCreatePermission()}
      </ModalCard>
      <PromptAlert
        title={`Are you absolutely sure?`}
        disableConfirmBtn={deletingPermission}
        loading={deletingPermission}
        content={`This will permanently delete ${activePermission?.title} permission from our servers.`}
        showPrompt={deletePermissionPrompt}
        handleHidePrompt={() => {
          //   setSelectedPermission({});
          setIsDisabled(true);
          setActivePermission(null);
          setDeletePermissionPrompt(false);
        }}
        handleConfirmPrompt={() => handleConfirmPrompt(activePermission)}
      />
    </div>
  );
};
