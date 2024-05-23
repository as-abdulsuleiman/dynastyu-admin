/** @format */

"use client";

import { FC, useMemo, useState } from "react";
import ContentHeader from "@/components/content-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import TabCard from "@/components/tab-card";
import { useToast } from "@/hooks/use-toast";
import Pagination from "@/components/pagination";
import PromptAlert from "@/components/prompt-alert";
import UniversalTable from "@/components/universal-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import MenubarCard from "@/components/menubar";
import { Loader2Icon, MoreHorizontalIcon, PlusIcon } from "@/components/Icons";
import { useDebouncedValue } from "@mantine/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SchoolTypeValidator } from "@/lib/validators/school-type";
import ModalCard from "@/components/modal";
import {
  GetSchoolTypesQuery,
  QueryMode,
  SortOrder,
  useCreateSchoolTypeMutation,
  useDeleteSchoolTypeMutation,
  useGetSchoolTypeLazyQuery,
  useGetSchoolTypesQuery,
  useUpdateSchoolTypeMutation,
} from "@/services/graphql";
import { Input } from "../ui/input";
import ComboBoxCard from "../combobox-card";

type FormData = yup.InferType<typeof SchoolTypeValidator>;

const headerItems = [
  { name: "Name" },
  { name: "Number of schools" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Actions" },
];

interface SchoolTypeProps {}

const SchoolType: FC<SchoolTypeProps> = ({}) => {
  const { toast } = useToast();
  const [indexTab, setTabIndex] = useState<number>(0);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [selectedSchoolType, setSelectedSchoolType] = useState<any>({});
  const [activeSchoolType, setActiveSchoolType] = useState<any | null>(null);
  const [deleteSchoolTypePrompt, setDeleteSchoolTypePrompt] = useState(false);
  const [deletingSchoolType, setDeletingSchoolType] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [openSchoolType, setSchoolType] = useState<boolean>(false);
  const [debounced] = useDebouncedValue(searchValue, 300);
  const [createSchoolType] = useCreateSchoolTypeMutation();
  const [updateSchoolType] = useUpdateSchoolTypeMutation();
  const [deleteSchoolType] = useDeleteSchoolTypeMutation();
  const [getSchoolType] = useGetSchoolTypeLazyQuery();

  const {
    data: schoolTypeData,
    loading,
    refetch,
    fetchMore,
  } = useGetSchoolTypesQuery({
    variables: {
      take: 10,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const {
    data: schoolTypeMigrationData,
    loading: loadingSchoolTypeTypeMigrationData,
  } = useGetSchoolTypesQuery({
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SchoolTypeValidator),
    defaultValues: {
      name: "",
    },
    values: {
      name: activeSchoolType?.name || "",
    },
    resetOptions: {
      // keepDirtyValues: true, // user-interacted input will be retained
      // keepErrors: true, // input errors will be retained with value update
    },
  });

  const watchAllFields = watch();

  const lastSchoolTypeId = useMemo(() => {
    const lastPostInResults =
      schoolTypeData?.schoolTypes[schoolTypeData?.schoolTypes?.length - 1];
    return lastPostInResults?.id;
  }, [schoolTypeData?.schoolTypes]);

  const schoolTypeOptions = useMemo(() => {
    return schoolTypeMigrationData?.schoolTypes?.map((school: any) => {
      return {
        id: school?.id,
        label: school?.name,
        value: school?.name,
        uuid: school?.uuid,
      };
    });
  }, [schoolTypeMigrationData?.schoolTypes]);

  const fetchNext = () => {
    fetchMore({
      variables: {
        take: 10,
        skip: 1,
        cursor: {
          id: lastSchoolTypeId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSchoolTypesQuery,
        { fetchMoreResult }
      ): GetSchoolTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.schoolTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult;
          const fetchMorePosts = fetchMoreResult?.schoolTypes;
          fetchMoreResult.schoolTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const fetchPrevious = () => {
    fetchMore({
      variables: {
        take: -10,
        skip: schoolTypeData?.schoolTypes?.length,
        cursor: {
          id: lastSchoolTypeId,
        },
        orderBy: {
          createdAt: SortOrder?.Desc,
        },
      },
      updateQuery: (
        previousResult: GetSchoolTypesQuery,
        { fetchMoreResult }
      ): GetSchoolTypesQuery => {
        if (!fetchMoreResult || fetchMoreResult?.schoolTypes?.length === 0) {
          return previousResult;
        } else {
          const previousPosts = previousResult?.schoolTypes;
          const fetchMorePosts = fetchMoreResult?.schoolTypes;
          fetchMoreResult.schoolTypes = [...fetchMorePosts];
          return { ...fetchMoreResult };
        }
      },
    });
  };

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await SchoolTypeValidator.validate(values);
      if (isNew) {
        await createSchoolType({
          variables: {
            data: {
              name: payload?.name || "",
            },
          },
        });
        toast({
          title: "School type successfully created.",
          description: `${payload?.name} has been successfully created`,
          variant: "successfull",
        });
      } else {
        await updateSchoolType({
          variables: {
            where: {
              id: activeSchoolType?.id,
            },
            data: {
              name: { set: payload?.name },
            },
          },
        });
        toast({
          title: "School type successfully updated.",
          description: `${payload?.name} has been successfully updated`,
          variant: "successfull",
        });
      }
      await refetch();
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
      setActiveSchoolType(null);
    }
  };

  const handleOnIndexChange = (index: number) => {
    setActiveSchoolType(null);
    setTabIndex(index);
  };

  const handleDeleteAccountType = (item: any) => {
    setActiveSchoolType(item);
    setDeleteSchoolTypePrompt(true);
  };

  const handleConfirmPrompt = async (item: any) => {
    setDeletingSchoolType(true);
    try {
      if (item?._count?.schools > 0) {
        const schoolData = await getSchoolType({
          variables: {
            where: {
              id: item?.id,
            },
          },
        });
        const schoolIds = schoolData?.data?.schoolType?.schools?.map(
          (school: any) => ({
            id: school?.id,
          })
        );
        await updateSchoolType({
          variables: {
            where: {
              id: selectedSchoolType?.id,
            },
            data: {
              schools: {
                connect: schoolIds,
              },
            },
          },
        });
      }
      await deleteSchoolType({
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
      setSelectedSchoolType({});
      setActiveSchoolType(null);
      setDeletingSchoolType(false);
      setDeleteSchoolTypePrompt(false);
    }
  };

  const renderSelectSchoolType = () => {
    return (
      <ComboBoxCard
        loading={loadingSchoolTypeTypeMigrationData}
        scrollAreaClass="h-[100px]"
        placeholder="Select School Type"
        id="school_type_to_select"
        valueKey="id"
        displayKey="label"
        IdKey="label"
        hasSearch
        shouldFilter={false}
        label="Select School Type to Migrate data to"
        isOpen={openSchoolType}
        searchValue={searchValue}
        handleSearch={(search) => setSearchValue(search)}
        onClose={() => {
          setSchoolType(!openSchoolType);
        }}
        items={schoolTypeOptions as any}
        selectedValue={{ ...selectedSchoolType }}
        onSelectValue={(item) => {
          setIsDisabled(false);
          setSelectedSchoolType(item);
        }}
      />
    );
  };

  const renderCreateSchoolType = () => {
    return (
      <form
        id="create_school_type"
        name="create_coach"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              id="school_type"
              placeholder="Enter School Type"
              label="Name"
              type="text"
              className="bg-transparent"
              error={errors?.name?.message as string}
              {...register("name", {
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

  const renderSchoolTypes = () => {
    const renderItems = ({ item, id }: { item: any; id: any }) => {
      const schoolTypeItems = [
        {
          name: "Edit School Type",
          onClick: () => {
            setActiveSchoolType(item);
            setIsNew(false);
            setIsOpen(true);
          },
        },
        {
          name: "Delete School Type",
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
              {item?._count?.schools}
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
                items={schoolTypeItems}
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
          items={schoolTypeData?.schoolTypes as any[]}
          loading={loading}
          renderItems={renderItems}
        />
        {loading || !schoolTypeData?.schoolTypes?.length ? null : (
          <Pagination onNext={fetchNext} onPrevious={fetchPrevious} />
        )}
        <PromptAlert
          title={`Are you absolutely sure?`}
          disableConfirmBtn={
            deletingSchoolType ||
            (isDisabled && activeSchoolType?._count?.schools > 0)
          }
          loading={deletingSchoolType}
          content={`This will permanently delete ${activeSchoolType?.name} school type from our servers.`}
          showPrompt={deleteSchoolTypePrompt}
          handleHidePrompt={() => {
            setSelectedSchoolType({});
            setIsDisabled(true);
            setActiveSchoolType(null);
            setDeleteSchoolTypePrompt(false);
            setIsDisabled(true);
          }}
          customElement={
            activeSchoolType?._count?.schools > 0
              ? renderSelectSchoolType()
              : null
          }
          handleConfirmPrompt={() => handleConfirmPrompt(activeSchoolType)}
        />
      </div>
    );
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-row items-center">
        <ContentHeader title="School Types" subHeader="In Progress" />
      </div>
      <Separator className="my-6" />
      <Button
        className="flex flex-row ml-auto"
        onClick={() => {
          setIsNew(true);
          setIsOpen(true);
        }}
      >
        Add School Type
        <PlusIcon className="ml-3 h-[18px] w-[18px]" />
      </Button>
      <TabCard
        tabIndex={indexTab}
        onIndexChange={handleOnIndexChange}
        className="font-TTHovesDemiBold"
        tabClassName="mt-0"
        tabs={[{ name: "School Types" }]}
        tabContent={[{ content: renderSchoolTypes() }]}
      />
      <ModalCard
        isModal={true}
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          setActiveSchoolType(null);
          setIsNew(false);
          setIsOpen(!isOpen);
        }}
      >
        {renderCreateSchoolType()}
      </ModalCard>
    </main>
  );
};

export default SchoolType;
