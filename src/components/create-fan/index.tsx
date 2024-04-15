/** @format */

"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Title, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import { Icons } from "../Icons";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AvatarUploader from "../avatar-uploader";
import { FanValidator } from "@/lib/validators/fan";
import { useForm } from "react-hook-form";
import {
  useGetAccountTypesQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/services/graphql";
import ComboBoxCard from "../combobox-card";
import SelectState from "../select-state";
import SelectCity from "../select-city";
import { SelectCountry } from "../select-country";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useRootStore } from "@/mobx";
import ContentHeader from "../content-header";

type FormData = yup.InferType<typeof FanValidator>;

interface CreateFanProps {
  params: {
    action: string;
  };
  searchParams: {
    fan: number;
  };
}

const CreateFan: FC<CreateFanProps> = ({ params, searchParams }) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    authStore: { user },
  } = useRootStore();
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(0);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(0);
  const [updateUser] = useUpdateUserMutation();
  const { action } = params;
  const editType = action === "edit" ?? false;
  const fetchFan = editType && searchParams?.fan;

  const { data: fanData, loading: loading } = useGetUserQuery({
    variables: {
      where: {
        id: searchParams?.fan,
      },
    },
    skip: !fetchFan,
  });

  const { data: accountTypes, loading: accaccountTypeLoading } =
    useGetAccountTypesQuery({
      variables: {
        where: {
          id: {
            equals: 2,
          },
        },
      },
    });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    setFocus,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(FanValidator),
    defaultValues: {
      avatar: "",
      firstName: "",
      email: "",
      lastName: "",
      accountType: {},
      username: "",
      state: "",
      city: "",
      country: "",
      dob: "",
    },
    values: {
      avatar: fanData?.user?.avatar || "",
      firstName: fanData?.user?.firstname || "",
      email: fanData?.user?.email || "",
      lastName: fanData?.user?.surname || "",
      username: fanData?.user?.username || "",
      dob: fanData?.user?.dob || "",
      state: fanData?.user?.state || "",
      city: fanData?.user?.city || "",
      country: fanData?.user?.country?.abbreviation || "",

      accountType:
        {
          accountTypeId: fanData?.user?.accountType?.id,
          roleId: fanData?.user?.accountType?.role?.id,
        } || {},
    },
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  });

  const handleAvatarUploadSuccess = useCallback(
    (url: string | null) => {
      setValue("avatar", url as string);
    },
    [setValue]
  );

  const onSubmit = async (values: FormData) => {
    try {
      await updateUser({
        variables: {
          where: {
            id: searchParams?.fan,
          },
          data: {
            avatar: { set: values?.avatar },
            firstname: { set: values?.firstName },
            surname: { set: values?.lastName },
            username: { set: values?.username },
            country: {
              connect: {
                abbreviation: values?.country?.toLowerCase(),
              },
            },
            dob: { set: values?.dob },
            state: { set: values?.state },
            city: { set: values?.city },
            accountType: {
              connect: {
                id: values?.accountType?.accountTypeId,
              },
            },
            role: {
              connect: { id: values?.accountType?.roleId },
            },
          },
        },
      });
      await toast({
        title: "Profile successfully updated",
        description: `@${values?.username} profile has been successfully updated`,
        variant: "successfull",
      });
      router.push(`/fan/${searchParams?.fan}`);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };

  const countryInput = register("country", { required: true });
  const { accountType, avatar, country, state, city, dob } = getValues();
  const watchAllFields = watch();

  const accountTypeOptions = useMemo(() => {
    return accountTypes?.accountTypes?.map((a: any) => {
      return {
        id: a.id,
        label: a?.title,
        value: a?.title,
        uuid: a.uuid,
        role: a.role.title,
        roleId: a.role.id,
      };
    });
  }, [accountTypes?.accountTypes]);

  return (
    <main className="w-full h-full">
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <ContentHeader
            title={`${fetchFan ? `Edit Fan Profile` : `Add New Fan`}`}
            icon={
              <Icons.circleUserRound className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
            }
            isIcon
            subHeader="Fan Details"
          />
        </div>
      </div>
      <Separator className="my-6" />
      <form id="create_fan" name="create_fan" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 place-self-center">
            <AvatarUploader
              height={120}
              width={120}
              imgUrl={avatar}
              id="fans_profile"
              onUploadSuccess={handleAvatarUploadSuccess}
              folder="profile_files"
              userId={fetchFan ? fanData?.user?.id : user?.id}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="firstname"
              autoCapitalize="on"
              placeholder="Your First Name"
              label="First Name"
              className="bg-transparent"
              error={errors?.firstName?.message}
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="lastname"
              label="Last Name"
              autoCapitalize="on"
              className="bg-transparent"
              placeholder="Your Last Name"
              error={errors.lastName?.message}
              {...register("lastName", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="username"
              placeholder="Your Username"
              label="Username"
              type="text"
              className="bg-transparent"
              error={errors?.username?.message}
              {...register("username", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="email"
              label="Email"
              className="bg-transparent"
              placeholder="Your Email"
              error={errors.email?.message}
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="dob"
              type="date"
              label="Date of Birth"
              value={dob && formatDate(dob, "yyyy-MM-dd")}
              className="bg-transparent inputdate"
              placeholder="Enter Year Founded"
              error={errors?.dob?.message}
              {...register("dob", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <div className="col-span-12 sm:col-span-6">
              <ComboBoxCard
                loading={accaccountTypeLoading}
                scrollAreaClass="h-[100px]"
                placeholder={"Select your account type"}
                id="account_type"
                onBlur={() => setFocus("accountType", { shouldSelect: true })}
                valueKey="id"
                displayKey="label"
                IdKey="label"
                label="Account Type"
                isOpen={openAccountType}
                error={
                  errors?.accountType?.accountTypeId?.message ||
                  errors?.accountType?.roleId?.message
                }
                onClose={() => setOpenAccountType(!openAccountType)}
                items={accountTypeOptions as any}
                selectedValue={{ id: accountType?.accountTypeId }}
                onSelectValue={(item) => {
                  setValue(
                    "accountType",
                    {
                      accountTypeId: item?.id,
                      roleId: item?.roleId,
                    },
                    { shouldDirty: true }
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <SelectCountry
              searchPlaceholder="Search country..."
              onSelectCountryId={(item) => {
                setSelectedCountryId(item);
              }}
              selectedCountry={country?.toUpperCase()}
              id="country"
              label="Country"
              placeholder="Select Country"
              onBlur={countryInput.onBlur}
              ref={countryInput.ref}
              name={countryInput.name}
              onSelectCountry={(country) =>
                setValue("country", country?.value, { shouldDirty: true })
              }
              // {...register("country", { required: true })}
              error={errors?.country?.message}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <SelectState
              id="state"
              label="State"
              name="state"
              placeholder="Select State"
              searchPlaceholder="Search state..."
              selectedState={state as string}
              error={errors?.state?.message}
              countryId={selectedCountryId || 0}
              onSelectState={(state) =>
                setValue("state", state?.label, { shouldDirty: true })
              }
              selectStateId={(item) => setSelectedStateId(item)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <SelectCity
              id="city"
              label="City"
              placeholder="Select City"
              searchPlaceholder="Search city..."
              name="city"
              selectedCity={city as string}
              countryId={selectedCountryId || 0}
              stateId={selectedStateId || 0}
              error={errors?.city?.message}
              onSelectCity={(city) =>
                setValue("city", city?.label, { shouldDirty: true })
              }
            />
          </div>
        </div>
        <div className="w-full">
          <Button
            variant="default"
            disabled={isSubmitting || !isDirty}
            className="w-full mt-6"
            type="submit"
          >
            {isSubmitting ? (
              <div className="flex flex-row items-center justify-center">
                <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : (
              <>{fetchFan ? "Save" : "Submit"}</>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};
export default observer(CreateFan);
