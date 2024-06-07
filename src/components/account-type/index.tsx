/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import ContentHeader from "@/components/content-header";
import { Separator } from "@/components/ui/separator";
import TabCard from "@/components/tab-card";
import {
  GetAccountTypesQuery,
  QueryMode,
  SortOrder,
  useCreateAccountTypeMutation,
  useDeleteAccountTypeMutation,
  useGetAccountTypeLazyQuery,
  useGetAccountTypesQuery,
  useGetRolesQuery,
  useUpdateAccountTypeMutation,
} from "@/services/graphql";
import UniversalTable from "@/components/universal-table";
import { TableCell, TableRow } from "@/components/ui/table";
import MenubarCard from "@/components/menubar";
import { Button } from "@/components/ui/button";
import { Loader2Icon, MoreHorizontalIcon, PlusIcon } from "@/components/Icons";
import Pagination from "@/components/pagination";
import { formatDate } from "@/lib/utils";
import PromptAlert from "@/components/prompt-alert";
import ModalCard from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { AccountTypeValidator } from "@/lib/validators/account-type";
import { Input } from "@/components/ui/input";
import ComboBoxCard from "../combobox-card";
import { useDebouncedValue } from "@mantine/hooks";
import { useRootStore } from "@/mobx";
import { getPermission } from "@/lib/helpers";
import Accesscontrol from "../accesscontrol";
import { observer } from "mobx-react-lite";

type FormData = yup.InferType<typeof AccountTypeValidator>;

interface AccountTypesProps {}

const AccountType: FC<AccountTypesProps> = ({}) => {
  const { toast } = useToast();
  const {
    authStore: { user },
  } = useRootStore();
  const [indexTab, setTabIndex] = useState<number>(0);
  const [deleteAccountTypePrompt, setDeleteAccountTypePrompt] = useState(false);
  const [deletingAccountType, setDeletingAccountType] = useState(false);
  const [activeAccountType, setActiveAccountType] = useState<any | null>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openRole, setOpenRole] = useState<boolean>(false);
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<any>({});
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [createAccountType] = useCreateAccountTypeMutation();
  const [updateAccountType] = useUpdateAccountTypeMutation();
  const [deleteAccountType] = useDeleteAccountTypeMutation();
  const [getSchoolAccountType] = useGetAccountTypeLazyQuery();

  const permissionName = getPermission(
    user?.role?.permissions,
    "admin.accesslevel.update"
  );

  const headerItems = [
    { name: "Title" },
    { name: "Role" },
    { name: "Number of users" },
    { name: "Created At" },
    { name: "Updated At" },
  ];

  if (permissionName !== ("" || null || undefined)) {
    headerItems?.push({ name: "Actions" });
  }

  const {
    data: accountTypeData,
    loading,
    fetchMore,
    refetch,
  } = useGetAccountTypesQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const {
    data: accountTypeMigrationData,
    loading: loadingAccountTypeMigrationData,
  } = useGetAccountTypesQuery({
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

  const { data: roleData, loading: loadingRole } = useGetRolesQuery({
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
    getValues,
    setValue,
    setFocus,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(AccountTypeValidator),
    defaultValues: {
      title: "",
      role: {},
    },
    values: {
      title: activeAccountType?.title || "",
      role:
        {
          title: activeAccountType?.role?.title,
          id: activeAccountType?.role?.id,
        } || {},
    },
    resetOptions: {
      // keepDirtyValues: true, // user-interacted input will be retained
      // keepErrors: true, // input errors will be retained with value update
    },
  });

  const watchAllFields = watch();

  const handleOnIndexChange = (index: number) => {
    setActiveAccountType(null);
    setTabIndex(index);
  };

  const lastAccountTypeId = useMemo(() => {
    const lastPostInResults =
      accountTypeData?.accountTypes[accountTypeData?.accountTypes?.length - 1];
    return lastPostInResults?.id;
  }, [accountTypeData?.accountTypes]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastAccountTypeId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetAccountTypesQuery,
        { fetchMoreResult }
      ): GetAccountTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.accountTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.accountTypes;
          fetchMoreResult.accountTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: accountTypeData?.accountTypes?.length,
        cursor: {
          id: lastAccountTypeId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetAccountTypesQuery,
        { fetchMoreResult }
      ): GetAccountTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.accountTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.accountTypes;
          const fetchMorePosts = fetchMoreResult?.accountTypes;
          fetchMoreResult.accountTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const handleDeleteAccountType = (item: any) => {
    setActiveAccountType(item);
    setDeleteAccountTypePrompt(true);
  };

  const handleConfirmPrompt = async (item: any) => {
    setDeletingAccountType(true);
    try {
      if (item?._count?.users > 0) {
        const userData = await getSchoolAccountType({
          variables: {
            where: {
              id: item?.id,
            },
          },
        });
        const userIds = userData?.data?.accountType?.users?.map(
          (user: any) => ({ id: user?.id })
        );
        await updateAccountType({
          variables: {
            where: {
              id: selectedAccount?.id,
            },
            data: {
              users: {
                connect: userIds,
              },
            },
          },
        });
      }
      await deleteAccountType({
        variables: {
          where: {
            id: item?.id,
          },
        },
      });
      await refetch();
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    } finally {
      setIsDisabled(true);
      setSelectedAccount({});
      setActiveAccountType(null);
      setDeletingAccountType(false);
      setDeleteAccountTypePrompt(false);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await AccountTypeValidator?.validate(values);
      if (isNew) {
        await createAccountType({
          variables: {
            data: {
              title: payload?.title || "",
              role: {
                connect: { id: payload?.role?.id },
              },
            },
          },
        });
        toast({
          title: "Account type successfully created.",
          description: `${payload?.title} account type has been successfully created`,
          variant: "successfull",
        });
      } else {
        await updateAccountType({
          variables: {
            where: {
              id: activeAccountType?.id,
            },
            data: {
              title: { set: payload?.title },
              role: {
                connect: { id: payload?.role?.id },
              },
            },
          },
        });
        toast({
          title: "Account type successfully updated.",
          description: `${payload?.title} account type has been successfully updated`,
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
      setActiveAccountType(null);
    }
  };

  const accountTypeOptions = useMemo(() => {
    return accountTypeMigrationData?.accountTypes?.map((role: any) => {
      return {
        id: role?.id,
        label: role?.title,
        value: role?.title,
        uuid: role?.uuid,
      };
    });
  }, [accountTypeMigrationData?.accountTypes]);

  const roleOptions = useMemo(() => {
    return roleData?.roles?.map((role: any) => {
      return {
        id: role?.id,
        label: role?.title,
        value: role?.title,
        uuid: role?.uuid,
      };
    });
  }, [roleData?.roles]);

  const { role } = getValues();

  const renderSelectAccountType = () => {
    return (
      <ComboBoxCard
        loading={loadingAccountTypeMigrationData}
        scrollAreaClass="h-[100px]"
        placeholder="Select Account Type"
        id="account_type_to_select"
        valueKey="id"
        displayKey="label"
        IdKey="label"
        hasSearch
        shouldFilter={false}
        label="Select Account Type to Migrate data to"
        isOpen={openAccountType}
        searchValue={searchValue}
        handleSearch={(search) => setSearchValue(search)}
        onClose={() => {
          setOpenAccountType(!openAccountType);
        }}
        items={accountTypeOptions as any}
        selectedValue={{ ...selectedAccount }}
        onSelectValue={(item) => {
          setIsDisabled(false);
          setSelectedAccount(item);
        }}
      />
    );
  };

  const renderAccountTypes = () => {
    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const accountTypeItems = [
        {
          name: "Edit Account Type",
          onClick: () => {
            setActiveAccountType(item);
            setIsNew(false);
            setIsOpen(true);
          },
        },
        {
          name: "Delete Account Type",
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
              {item?.role?.title}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.users}
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
          <Accesscontrol name={permissionName}>
            <TableCell className="text-center cursor-pointer text-sm">
              <div className="text-right w-100 flex flex-row items-center justify-center">
                <MenubarCard
                  trigger={
                    <Button size="icon" variant="outline">
                      <MoreHorizontalIcon className="cursor-pointer" />
                    </Button>
                  }
                  items={accountTypeItems}
                />
              </div>
            </TableCell>
          </Accesscontrol>
        </TableRow>
      );
    };
    return (
      <div className="flex flex-col mt-8 justify-center">
        <UniversalTable
          title="Account Type List"
          headerItems={headerItems}
          items={accountTypeData?.accountTypes as any[]}
          loading={loading}
          renderItems={renderItems}
        />
        {loading || !accountTypeData?.accountTypes?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={
            deletingAccountType ||
            (isDisabled && activeAccountType?._count?.users > 0)
          }
          loading={deletingAccountType}
          content={`This will permanently delete ${activeAccountType?.title} account type from our servers.`}
          showPrompt={deleteAccountTypePrompt}
          handleHidePrompt={() => {
            setSelectedAccount({});
            setActiveAccountType(null);
            setDeleteAccountTypePrompt(false);
            setIsDisabled(true);
          }}
          customElement={
            activeAccountType?._count?.users > 0
              ? renderSelectAccountType()
              : null
          }
          handleConfirmPrompt={() => handleConfirmPrompt(activeAccountType)}
        />
      </div>
    );
  };

  const renderCreateAccountType = () => {
    return (
      <form
        id="create_account_type"
        name="create_account_type"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              id="role_title"
              placeholder="Enter Account Type Title"
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
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-12">
            <ComboBoxCard
              loading={loadingRole}
              scrollAreaClass="h-[100px]"
              placeholder="Select Role"
              id="role_type"
              valueKey="id"
              displayKey="label"
              IdKey="label"
              label="Roles"
              isOpen={openRole}
              error={errors?.role?.id?.message as string}
              onClose={() => setOpenRole(!openRole)}
              items={roleOptions as any}
              selectedValue={{ ...role }}
              onSelectValue={(item) => {
                setValue(
                  "role",
                  {
                    title: item?.value,
                    id: item?.id,
                  },
                  { shouldDirty: true }
                );
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 mt-5">
            <Button
              variant="default"
              // disabled={isSubmitting || !isValid}
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
      <Accesscontrol name={permissionName}>
        <Button
          className="flex flex-row ml-auto"
          onClick={() => {
            setIsNew(true);
            setIsOpen(true);
          }}
        >
          Add Account Type
          <PlusIcon className="ml-3 h-[18px] w-[18px]" />
        </Button>
      </Accesscontrol>

      <TabCard
        tabIndex={indexTab}
        onIndexChange={handleOnIndexChange}
        className="font-TTHovesDemiBold"
        tabClassName="mt-0"
        tabs={[{ name: "Account Types" }]}
        tabContent={[{ content: renderAccountTypes() }]}
      />
      <ModalCard
        isModal={true}
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          setActiveAccountType(null);
          setIsNew(false);
          setIsOpen(!isOpen);
        }}
      >
        {renderCreateAccountType()}
      </ModalCard>
    </main>
  );
};

export default observer(AccountType);
