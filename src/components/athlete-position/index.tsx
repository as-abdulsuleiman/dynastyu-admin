/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import ContentHeader from "@/components/content-header";
import { Separator } from "@/components/ui/separator";
import TabCard from "@/components/tab-card";
import {
  GetPositionsQuery,
  QueryMode,
  SortOrder,
  useCreateAthletePositionMutation,
  useDeleteAthletePositionMutation,
  useGetFindFirstPositionLazyQuery,
  useGetPositionCategoriesQuery,
  useGetPositionsQuery,
  useUpdateAthletePositionMutation,
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
import { Input } from "@/components/ui/input";
import ComboBoxCard from "../combobox-card";
import { useDebouncedValue } from "@mantine/hooks";
import { useRootStore } from "@/mobx";
import { getPermission } from "@/lib/helpers";
import Accesscontrol from "../accesscontrol";
import { observer } from "mobx-react-lite";
import { AthletePositionValidator } from "@/lib/validators/athlete-position";
import { useRouter } from "next/navigation";

type FormData = yup.InferType<typeof AthletePositionValidator>;

interface AthletePositionProps {}

const AthletePosition: FC<AthletePositionProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    authStore: { user },
  } = useRootStore();
  const [indexTab, setTabIndex] = useState<number>(0);
  const [deleteAccountTypePrompt, setDeleteAccountTypePrompt] = useState(false);
  const [deletingAccountType, setDeletingAccountType] = useState(false);
  const [activePosition, setActivePosition] = useState<any | null>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<any>({});
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [createAthletePosition] = useCreateAthletePositionMutation();
  const [updateAthletePosition] = useUpdateAthletePositionMutation();
  const [deleteAthletePosition] = useDeleteAthletePositionMutation();
  const [getPositions] = useGetFindFirstPositionLazyQuery();

  const permissionName = getPermission(
    user?.role?.permissions,
    "admin.accesslevel.update"
  );

  const headerItems = [
    { name: "Name" },
    { name: "ShortName" },
    { name: "Number of users" },
    { name: "Category" },
    { name: "Created At" },
    { name: "Updated At" },
  ];

  if (permissionName !== ("" || null || undefined)) {
    headerItems?.push({ name: "Actions" });
  }

  const {
    data: positionsData,
    loading,
    fetchMore,
    refetch,
  } = useGetPositionsQuery({
    variables: {
      orderBy: { createdAt: SortOrder.Desc },
      take: 10,
    },
  });

  const { data: positionMigrationData, loading: loadingPositionMigrationData } =
    useGetPositionsQuery({
      variables: {
        where: {
          OR: [{ name: { contains: debounced, mode: QueryMode.Insensitive } }],
        },
        take: 30,
        orderBy: {
          createdAt: SortOrder.Desc,
        },
      },
    });

  const { data: categoryData, loading: loadingCategory } =
    useGetPositionCategoriesQuery({
      variables: {
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
    resolver: yupResolver(AthletePositionValidator),
    defaultValues: {
      name: "",
      shortName: "",
      category: {},
    },
    values: {
      name: activePosition?.name || "",
      shortName: activePosition?.shortName || "",
      category:
        {
          name: activePosition?.category?.name,
          id: activePosition?.category?.id,
        } || {},
    },
    resetOptions: {
      // keepDirtyValues: true, // user-interacted input will be retained
      // keepErrors: true, // input errors will be retained with value update
    },
  });

  const watchAllFields = watch();

  const handleOnIndexChange = (index: number) => {
    setActivePosition(null);
    setTabIndex(index);
  };

  const lastPositionId = useMemo(() => {
    const lastPositionResults =
      positionsData?.positions[positionsData?.positions?.length - 1];
    return lastPositionResults?.id;
  }, [positionsData?.positions]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastPositionId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetPositionsQuery,
        { fetchMoreResult }
      ): GetPositionsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.positions?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.positions;
          fetchMoreResult.positions = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: positionsData?.positions?.length,
        cursor: {
          id: lastPositionId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetPositionsQuery,
        { fetchMoreResult }
      ): GetPositionsQuery => {
        if (!fetchMoreResult || fetchMoreResult?.positions?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.positions;
          const fetchMorePosts = fetchMoreResult?.positions;
          fetchMoreResult.positions = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const handleDeleteAccountType = (item: any) => {
    setActivePosition(item);
    setDeleteAccountTypePrompt(true);
  };

  const handleConfirmPrompt = async (item: any) => {
    setDeletingAccountType(true);
    try {
      if (item?._count?.athleteProfiles > 0) {
        const positionData = await getPositions({
          variables: {
            where: {
              id: {
                equals: item?.id,
              },
            },
          },
        });
        const athleteProfileId =
          positionData?.data?.positions
            ?.flatMap((profile: any) => profile?.athleteProfiles)
            ?.map((athlete) => ({ id: athlete?.id })) || [];
        await updateAthletePosition({
          variables: {
            where: {
              id: selectedAccount?.id,
            },
            data: {
              athleteProfiles: {
                connect: athleteProfileId,
              },
            },
          },
        });
      }
      await deleteAthletePosition({
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
      setActivePosition(null);
      setDeletingAccountType(false);
      setDeleteAccountTypePrompt(false);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await AthletePositionValidator?.validate(values);
      if (isNew) {
        await createAthletePosition({
          variables: {
            data: {
              name: payload?.name || "",
              shortName: payload.shortName || "",
              category: {
                connect: { id: payload?.category?.id },
              },
            },
          },
        });
        toast({
          title: "Position successfully created.",
          description: `${payload?.name} position  has been successfully created`,
          variant: "successfull",
        });
      } else {
        await updateAthletePosition({
          variables: {
            where: {
              id: activePosition?.id,
            },
            data: {
              name: { set: payload?.name },
              shortName: { set: payload?.shortName },
              category: {
                connect: { id: payload?.category?.id },
              },
            },
          },
        });
        toast({
          title: "Position  successfully updated.",
          description: `${payload?.name} position has been successfully updated`,
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
      setActivePosition(null);
    }
  };

  const positionOptions = useMemo(() => {
    return positionMigrationData?.positions?.map((role: any) => {
      return {
        id: role?.id,
        label: role?.name,
        value: role?.name,
        uuid: role?.uuid,
      };
    });
  }, [positionMigrationData?.positions]);

  const categoryOptions = useMemo(() => {
    return categoryData?.positionCategories?.map((category: any) => {
      return {
        id: category?.id,
        label: category?.name,
        value: category?.name,
        uuid: category?.uuid,
      };
    });
  }, [categoryData?.positionCategories]);

  const { category } = getValues();

  const renderSelectAccountType = () => {
    return (
      <ComboBoxCard
        loading={loadingPositionMigrationData}
        scrollAreaClass="h-[100px]"
        placeholder="Select Position"
        id="position_type_to_select"
        valueKey="id"
        displayKey="label"
        IdKey="label"
        hasSearch
        shouldFilter={false}
        label="Select Position to Migrate data to"
        isOpen={openAccountType}
        searchValue={searchValue}
        handleSearch={(search) => setSearchValue(search)}
        onClose={() => {
          setOpenAccountType(!openAccountType);
        }}
        items={positionOptions as any}
        selectedValue={{ ...selectedAccount }}
        onSelectValue={(item) => {
          setIsDisabled(false);
          setSelectedAccount(item);
        }}
      />
    );
  };

  const renderAthletePositions = () => {
    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const positionItems = [
        {
          name: "View Details",
          onClick: () => {
            router.push(`/athlete-position/${item?.id}`, {
              scroll: true,
            });
          },
        },
        {
          name: "Edit  Position",
          onClick: () => {
            setActivePosition(item);
            setIsNew(false);
            setIsOpen(true);
            setValue("category", {
              name: item?.name,
              id: item?.id,
            });
          },
        },
        {
          name: "Delete Position",
          onClick: () => handleDeleteAccountType(item),
        },
      ];
      return (
        <TableRow key={item?.id} className="text-base">
          <TableCell>
            <div className="flex flex-row items-center justify-start text-base">
              {item?.name}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?.shortName}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?._count?.athleteProfiles}
            </div>
          </TableCell>
          <TableCell className="text-center text-sm">
            <div className="flex flex-row items-center justify-center">
              {item?.category?.name}
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
                  items={positionItems}
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
          items={positionsData?.positions as any[]}
          loading={loading}
          renderItems={renderItems}
        />
        {loading || !positionsData?.positions?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={
            deletingAccountType ||
            (isDisabled && activePosition?._count?.athleteProfiles > 0)
          }
          loading={deletingAccountType}
          content={`This will permanently delete ${activePosition?.name} position from our servers.`}
          showPrompt={deleteAccountTypePrompt}
          handleHidePrompt={() => {
            setSelectedAccount({});
            setActivePosition(null);
            setDeleteAccountTypePrompt(false);
            setIsDisabled(true);
          }}
          customElement={
            activePosition?._count?.athleteProfiles > 0
              ? renderSelectAccountType()
              : null
          }
          handleConfirmPrompt={() => handleConfirmPrompt(activePosition)}
        />
      </div>
    );
  };

  const renderCreateAthletePosition = () => {
    return (
      <form
        id="create_account_type"
        name="create_account_type"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-2xl font-TTHovesBold mb-2">Create Position</div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              id="position_name"
              placeholder="Enter Position Name"
              label="Position Name"
              type="text"
              className="bg-transparent"
              error={errors?.name?.message as string}
              {...register("name", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12">
            <Input
              id="position_short_name"
              placeholder="Enter ShortName"
              label="ShortName"
              type="text"
              className="bg-transparent"
              error={errors?.shortName?.message as string}
              {...register("shortName", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-12">
            <ComboBoxCard
              loading={loadingCategory}
              scrollAreaClass="h-[100px]"
              placeholder="Select Category"
              id="category_type"
              valueKey="id"
              displayKey="label"
              IdKey="label"
              label="Category"
              isOpen={openCategory}
              error={errors?.category?.id?.message as string}
              onClose={() => setOpenCategory(!openCategory)}
              items={categoryOptions as any}
              selectedValue={{ ...category }}
              onSelectValue={(item) => {
                setValue(
                  "category",
                  {
                    name: item?.value,
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
        <ContentHeader title="Athlete Positions" subHeader="" />
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
          Add New Position
          <PlusIcon className="ml-3 h-[18px] w-[18px]" />
        </Button>
      </Accesscontrol>
      <TabCard
        tabIndex={indexTab}
        onIndexChange={handleOnIndexChange}
        className="font-TTHovesDemiBold"
        tabClassName="mt-0"
        tabs={[{ name: "Athlete Positions" }]}
        tabContent={[{ content: renderAthletePositions() }]}
      />
      <ModalCard
        isModal={true}
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          setActivePosition(null);
          setIsNew(false);
          setIsOpen(!isOpen);
        }}
      >
        {renderCreateAthletePosition()}
      </ModalCard>
    </main>
  );
};

export default observer(AthletePosition);
