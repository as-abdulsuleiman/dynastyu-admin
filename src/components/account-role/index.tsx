/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import ContentHeader from "@/components/content-header";
import { Separator } from "@/components/ui/separator";
import TabCard from "@/components/tab-card";
import {
  SortOrder,
  useGetRolesQuery,
  GetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  QueryMode,
} from "@/services/graphql";
import UniversalTable from "../universal-table";
import { TableCell, TableRow } from "@/components/ui/table";
import MenubarCard from "@/components/menubar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, MoreHorizontalIcon, PlusIcon } from "@/components/Icons";
import Pagination from "@/components/pagination";
import { formatDate } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import ModalCard from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RoleValidator } from "@/lib/validators/role";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import ComboBoxCard from "../combobox-card";
import { useDebouncedValue } from "@mantine/hooks";

type FormData = yup.InferType<typeof RoleValidator>;

interface AccountRolesProps {}

const headerItems = [
  { name: "Title" },
  { name: "Number of users" },
  { name: "Account type" },
  { name: "Permissions" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

const AccountRole: FC<AccountRolesProps> = ({}) => {
  const { toast } = useToast();
  const [indexTab, setTabIndex] = useState<number>(0);
  const [deleteRoleTypePrompt, setDeleteRoleTypePrompt] = useState(false);
  const [deletingRoleType, setDeletingRoleType] = useState(false);
  const [activeRole, setActiveRole] = useState<any | null>(null);
  const [openRoleType, setOpenRoleType] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const {
    data: roleTypeData,
    loading,
    fetchMore,
    refetch,
  } = useGetRolesQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const { data: roleMigrationData, loading: loadingRoleMigrationData } =
    useGetRolesQuery({
      variables: {
        where: {
          OR: [{ title: { contains: debounced, mode: QueryMode.Insensitive } }],
        },
        take: 30,
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
    resolver: yupResolver(RoleValidator),
    defaultValues: {
      title: "",
    },
    values: {
      title: activeRole?.title || "",
    },
    resetOptions: {
      // keepDirtyValues: true, // user-interacted input will be retained
      // keepErrors: true, // input errors will be retained with value update
    },
  });

  const watchAllFields = watch();

  const handleOnIndexChange = (index: number) => {
    setActiveRole(null);
    setTabIndex(index);
  };

  const lastRoleTypeId = useMemo(() => {
    const lastPostInResults =
      roleTypeData?.roles[roleTypeData?.roles?.length - 1];
    return lastPostInResults?.id;
  }, [roleTypeData?.roles]);

  const roleOptions = useMemo(() => {
    return roleMigrationData?.roles?.map((role: any) => {
      return {
        id: role?.id,
        label: role?.title,
        value: role?.title,
        uuid: role?.uuid,
      };
    });
  }, [roleMigrationData?.roles]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastRoleTypeId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetRolesQuery,
        { fetchMoreResult }
      ): GetRolesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.roles?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.roles;
          fetchMoreResult.roles = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: roleTypeData?.roles?.length,
        cursor: {
          id: lastRoleTypeId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetRolesQuery,
        { fetchMoreResult }
      ): GetRolesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.roles?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.roles;
          const fetchMorePosts = fetchMoreResult?.roles;
          fetchMoreResult.roles = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const handleDeleteAccountType = (item: any) => {
    setActiveRole(item);
    setDeleteRoleTypePrompt(true);
  };

  const handleConfirmPrompt = async (item: any) => {
    setDeletingRoleType(true);
    try {
      await deleteRole({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      await refetch();
    } catch (error) {
    } finally {
      setIsDisabled(true);
      setActiveRole(null);
      setDeletingRoleType(false);
      setDeleteRoleTypePrompt(false);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await RoleValidator.validate(values);
      if (isNew) {
        await createRole({
          variables: {
            data: {
              title: payload?.title || "",
            },
          },
        });
        toast({
          title: "Role successfully created.",
          description: `${payload?.title} role has been successfully created`,
          variant: "successfull",
        });
      } else {
        await updateRole({
          variables: {
            where: {
              id: activeRole?.id,
            },
            data: {
              title: { set: payload?.title },
            },
          },
        });
        toast({
          title: "Role successfully updated.",
          description: `${payload?.title} role has been successfully updated`,
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
      setActiveRole(null);
    }
  };

  const renderSelectRoleType = () => {
    return (
      <ComboBoxCard
        loading={loadingRoleMigrationData}
        scrollAreaClass="h-[100px]"
        placeholder="Select Account Type"
        id="account_type_to_select"
        valueKey="id"
        displayKey="label"
        IdKey="label"
        label="Select Account Type to Migrate data to"
        isOpen={openRoleType}
        hasSearch
        shouldFilter={false}
        searchValue={searchValue}
        handleSearch={(search) => setSearchValue(search)}
        onClose={() => {
          setOpenRoleType(!openRoleType);
        }}
        items={roleOptions as any}
        selectedValue={{ ...selectedRole }}
        onSelectValue={(item) => {
          setIsDisabled(false);
          setSelectedRole(item);
        }}
      />
    );
  };

  const renderRoleTypes = () => {
    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const roleTypeItems = [
        {
          name: "Edit Role",
          onClick: () => {
            setActiveRole(item);
            setIsNew(false);
            setIsOpen(true);
          },
        },
        {
          name: "Delete Role",
          onClick: () => handleDeleteAccountType(item),
        },
      ];
      return (
        <TableRow key={item?.id} className="text-base">
          <TableCell>
            <div className="flex flex-row items-center justify-start text-base">
              {item?.title}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.users}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.accountTypes}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.permissions}
            </div>
          </TableCell>
          <TableCell className="text-center cursor-pointer text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              {item?.updatedAt
                ? formatDate(new Date(item?.createdAt), "MMMM dd yyyy")
                : ""}
            </div>
          </TableCell>
          <TableCell className="text-center cursor-pointer text-sm">
            <div className="text-right w-100 flex flex-row items-center justify-center">
              {item?.updatedAt
                ? formatDate(new Date(item?.updatedAt), "MMMM dd yyyy")
                : ""}
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
                items={roleTypeItems}
              />
            </div>
          </TableCell>
        </TableRow>
      );
    };
    return (
      <div className="flex flex-col mt-8 justify-center">
        <UniversalTable
          title="Role List"
          headerItems={headerItems}
          items={roleTypeData?.roles as any[]}
          loading={loading}
          renderItems={renderItems}
        />
        {loading || !roleTypeData?.roles?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={deletingRoleType}
          loading={deletingRoleType}
          content={`This will permanently delete ${activeRole?.title} role from our servers.`}
          showPrompt={deleteRoleTypePrompt}
          handleHidePrompt={() => {
            setSelectedRole({});
            setIsDisabled(true);
            setActiveRole(null);
            setDeleteRoleTypePrompt(false);
          }}
          // customElement={
          //   activeRole?._count?.users > 0 ? renderSelectRoleType() : null
          // }
          handleConfirmPrompt={() => handleConfirmPrompt(activeRole)}
        />
      </div>
    );
  };

  const renderCreateRoleType = () => {
    return (
      <form
        id="create_role_type"
        name="create_role_type"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              id="role_title"
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
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader title="Account Types" subHeader="In Progress" />
      </div>
      <Separator className="my-6" />
      <Button
        className="flex flex-row ml-auto"
        onClick={() => {
          setIsNew(true);
          setIsOpen(true);
        }}
      >
        Add Role
        <PlusIcon className="ml-3 h-[18px] w-[18px]" />
      </Button>
      <TabCard
        tabIndex={indexTab}
        onIndexChange={handleOnIndexChange}
        className="font-TTHovesDemiBold"
        tabClassName="mt-0"
        tabs={[{ name: "Roles" }]}
        tabContent={[{ content: renderRoleTypes() }]}
      />
      <ModalCard
        isModal={true}
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          setIsNew(false);
          setIsOpen(!isOpen);
          setActiveRole(null);
        }}
      >
        {renderCreateRoleType()}
      </ModalCard>
    </main>
  );
};

export default AccountRole;
