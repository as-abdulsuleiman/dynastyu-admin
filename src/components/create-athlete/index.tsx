/** @format */

"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Title, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import { Icons } from "../Icons";
import AvatarUploader from "../avatar-uploader";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { AthleteValidator } from "@/lib/validators/athlete";
import {
  useGetAccountTypesQuery,
  useGetAthleteProfileQuery,
  useGetPositionsQuery,
  useUpdateAthleteMutation,
} from "@/services/graphql";
import ComboBoxCard from "../combobox-card";
import SchoolDropdown from "../school-dropdown";
import { formatDate, getYears } from "@/lib/utils";
import { SelectCountry } from "../select-country";
import SelectState from "../select-state";
import SelectCity from "../select-city";
import { useToast } from "@/hooks/use-toast";
import SuspenseLoader from "../suspense-loader";
import { Separator } from "../ui/separator";
import { useRootStore } from "@/mobx";
import ContentHeader from "../content-header";

type FormData = yup.InferType<typeof AthleteValidator>;

interface CreateAthleteProps {
  params: {
    action: string;
  };
  searchParams: {
    athlete: number;
  };
}

const CreateAthlete: FC<CreateAthleteProps> = ({ params, searchParams }) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    authStore: { user },
  } = useRootStore();
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [openHighSchool, setOpenHighSchool] = useState<boolean>(false);
  const [openYears, setOpenYears] = useState<boolean>(false);
  const [openPosition, setOpenPosition] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(0);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(0);
  const [updateAthleteProile] = useUpdateAthleteMutation();

  const editType = params.action === "edit" ?? false;
  const fetchAthlete = editType && searchParams?.athlete;
  const { data: postionsData } = useGetPositionsQuery();

  const {
    data: athleteData,
    loading,
    refetch,
  } = useGetAthleteProfileQuery({
    variables: {
      where: {
        id: searchParams?.athlete,
      },
    },
    skip: !fetchAthlete,
  });

  const { data: accountTypeData, loading: accaccountTypeLoading } =
    useGetAccountTypesQuery({
      variables: {
        where: {
          id: {
            equals: 1,
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
    formState: { errors, isSubmitting, isValid, isDirty, touchedFields },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(AthleteValidator),
    defaultValues: {
      avatar: "",
      position: "",
      firstName: "",
      email: "",
      lastName: "",
      accountType: {},
      username: "",
      school: {},
      state: "",
      city: "",
      country: "",
      graduationYear: "",
      hudlLink: "",
      dob: "",
    },
    values: {
      dob: athleteData?.athleteProfile?.user?.dob || "",
      gpa: athleteData?.athleteProfile?.gpa || "",
      graduationYear: athleteData?.athleteProfile?.graduationYear || "",
      avatar: athleteData?.athleteProfile?.user?.avatar || "",
      firstName: athleteData?.athleteProfile?.user?.firstname || "",
      email: athleteData?.athleteProfile?.user?.email || "",
      lastName: athleteData?.athleteProfile?.user?.surname || "",
      username: athleteData?.athleteProfile?.user?.username || "",
      position: athleteData?.athleteProfile?.position?.id || "",
      country: athleteData?.athleteProfile?.country?.abbreviation || "",
      state: athleteData?.athleteProfile?.user?.state || "",
      city: athleteData?.athleteProfile?.user?.city || "",
      hudlLink: athleteData?.athleteProfile?.hudlLink || "",
      school:
        {
          id: athleteData?.athleteProfile?.schoolId,
          name: athleteData?.athleteProfile?.school.name,
        } || {},
      accountType:
        {
          accountTypeId: athleteData?.athleteProfile?.user?.accountType?.id,
          roleId: athleteData?.athleteProfile?.user?.accountType?.roleId,
        } || {},
    },
  });

  const watchAllFields = watch();

  const {
    position,
    accountType,
    school,
    avatar,
    country,
    state,
    city,
    graduationYear,
    dob,
  } = getValues();

  const countryInput = register("country", { required: true });
  const graduationYearInput = register("graduationYear", {
    required: true,
  });

  const handleAvatarUploadSuccess = useCallback(
    (url: string | null) => {
      setValue("avatar", url as string, { shouldDirty: true });
    },
    [setValue]
  );

  const accountTypeOptions = useMemo(() => {
    return accountTypeData?.accountTypes?.map((a: any) => {
      return {
        id: a.id,
        label: a?.title,
        value: a?.title,
        uuid: a.uuid,
        role: a.role.title,
        roleId: a.role.id,
      };
    });
  }, [accountTypeData?.accountTypes]);

  const yearsOptions = useMemo(
    () =>
      getYears(5, "add")
        .map((year) => ({
          label: year.toString(),
          value: year.toString(),
          id: year.toString(),
        }))
        .reverse() || [],
    []
  );

  const positionOptions = useMemo(
    () =>
      postionsData?.positions?.map((position) => ({
        label: position?.name,
        value: position?.id,
        id: position?.id,
        shortName: position?.shortName,
      })) || [],
    [postionsData?.positions]
  );

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await AthleteValidator.validate(values);
      await updateAthleteProile({
        variables: {
          where: {
            id: searchParams?.athlete,
          },
          data: {
            hudlLink: { set: payload?.hudlLink },
            gpa: { set: payload?.gpa },
            graduationYear: { set: payload?.graduationYear },
            position: {
              connect: {
                id: payload?.position,
              },
            },
            school: {
              connect: {
                id: payload?.school?.id,
              },
            },
            country: {
              connect: {
                abbreviation: payload?.country?.toLowerCase(),
              },
            },
            user: {
              update: {
                dob: { set: payload?.dob },
                avatar: { set: payload?.avatar },
                email: { set: payload?.email?.toLowerCase() },
                firstname: { set: payload?.firstName },
                surname: { set: payload?.lastName },
                username: { set: payload?.username },
                city: { set: payload?.city },
                state: { set: payload?.state },
                accountType: {
                  connect: {
                    id: payload?.accountType?.accountTypeId,
                  },
                },
                role: {
                  connect: { id: payload?.accountType?.roleId },
                },
              },
            },
          },
        },
      });
      toast({
        title: "Profile successfully updated",
        description: `@${values?.username} profile has been successfully updated`,
        variant: "successfull",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error?.message}`,
        variant: "destructive",
      });
    }
  };

  // if (loading) {
  //   return <SuspenseLoader />;
  // }
  return (
    <main className="w-full h-full">
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <ContentHeader
            title={`${
              fetchAthlete ? `Edit Athlete Profile` : " Add New Athlete"
            }`}
            icon={
              <Icons.athlete className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
            }
            subHeader="Athletes Details"
          />
        </div>
      </div>
      <Separator className="my-6" />
      <form
        id="create_athlete"
        name="create_athlete"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 place-self-center">
            <AvatarUploader
              height={120}
              width={120}
              imgUrl={avatar}
              id="athlete_profile"
              onUploadSuccess={handleAvatarUploadSuccess}
              folder="profile_files"
              userId={athleteData?.athleteProfile?.userId}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="firstname"
              autoComplete="firstname"
              placeholder="First Name"
              label="First Name"
              className="bg-transparent"
              error={errors?.firstName?.message}
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="lastname"
              autoComplete="lastname"
              label="Last Name"
              className="bg-transparent"
              placeholder="Last Name"
              error={errors.lastName?.message}
              {...register("lastName", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="username"
              placeholder="Username"
              label="Username"
              type="text"
              autoComplete="null"
              className="bg-transparent"
              error={errors?.username?.message}
              {...register("username", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="email"
              label="Email"
              autoComplete="email"
              className="bg-transparent"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="password"
              placeholder="HudlLink"
              autoComplete="null"
              label="Hudl Link"
              type="url"
              className="bg-transparent"
              error={errors?.hudlLink?.message}
              {...register("hudlLink", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="gpa"
              label="GPA"
              autoComplete="gpa"
              placeholder="Your GPA"
              className="bg-transparent"
              error={errors?.gpa?.message}
              {...register("gpa", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <ComboBoxCard
              loading={accaccountTypeLoading}
              scrollAreaClass="h-[100px]"
              id="account_type"
              onBlur={() => setFocus("accountType", { shouldSelect: true })}
              valueKey="id"
              displayKey="label"
              IdKey="label"
              placeholder={"Select your account type"}
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
                setValue("accountType", {
                  accountTypeId: item?.id,
                  roleId: item?.roleId,
                });
              }}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <SchoolDropdown
              scrollAreaClass="h-72"
              hasSearch={true}
              id="schoolId"
              onClose={() => setOpenHighSchool(!openHighSchool)}
              isOpen={openHighSchool}
              selectedValue={{ value: school?.name }}
              onSelectValue={(school) => {
                setValue(
                  "school",
                  {
                    id: school?.id,
                    name: school?.label,
                  },
                  { shouldDirty: true }
                );
              }}
              placeholder={"Select high school"}
              label="High School"
              error={errors.school?.id?.message}
              whereClause={{
                schoolTypeId: {
                  equals: 1,
                },
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <ComboBoxCard
              valueKey="value"
              displayKey="label"
              IdKey="label"
              placeholder="Graduation Year"
              label="Graduation Year"
              id="graduationYear"
              isOpen={openYears}
              scrollAreaClass="h-62"
              hasSearch
              error={errors?.graduationYear?.message}
              onClose={() => setOpenYears(!openYears)}
              items={yearsOptions}
              selectedValue={{ value: graduationYear }}
              onSelectValue={(item) => {
                setValue("graduationYear", item?.label, { shouldDirty: true });
              }}
              onBlur={graduationYearInput.onBlur}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <ComboBoxCard
              valueKey="value"
              displayKey="label"
              IdKey="label"
              placeholder="Select Position"
              label="Position"
              id="position"
              isOpen={openPosition}
              scrollAreaClass="h-62"
              hasSearch
              error={errors?.position?.message}
              onClose={() => setOpenPosition(!openPosition)}
              items={positionOptions}
              selectedValue={{ value: position }}
              onSelectValue={(item) => {
                setValue("position", item?.value, { shouldDirty: true });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <SelectCountry
              searchPlaceholder="Search country..."
              placeholder="Select Country"
              onSelectCountryId={(item) => {
                setSelectedCountryId(item);
              }}
              selectedCountry={country?.toUpperCase()}
              id="country"
              label="Country"
              onBlur={countryInput.onBlur}
              ref={countryInput.ref}
              name={countryInput?.name}
              onSelectCountry={(country) =>
                setValue("country", country?.value, { shouldDirty: true })
              }
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
              <>Submit</>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateAthlete;
