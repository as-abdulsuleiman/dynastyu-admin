/** @format */

"use client";

import { FC, useCallback, useMemo, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Title, Text } from "@tremor/react";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  SortOrder,
  useGetSchoolQuery,
  useGetSchoolTypesQuery,
  useRegisterSchoolMutation,
  useUpdateSchoolMutation,
} from "@/services/graphql";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SchoolValidator } from "@/lib/validators/school";
import AvatarUploader from "@/components/avatar-uploader";
import { Input } from "@/components/ui/input";
import { ColorPickeCard } from "@/components/color-picker";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/number-input";
import ComboBoxCard from "@/components/combobox-card";
import { Textarea } from "@/components/ui/textarea";
import { classificationOptions, formatDate } from "@/lib/utils";
import { SelectCountry } from "@/components/select-country";
import SelectState from "@/components/select-state";
import SelectCity from "@/components/select-city";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { Separator } from "../ui/separator";
import { useRootStore } from "@/mobx";
import ContentHeader from "../content-header";

type FormData = yup.InferType<typeof SchoolValidator>;

interface CreateSchoolProps {
  params: {
    action: string;
  };
  searchParams: {
    school: number;
  };
}

type DivisionProps = {
  displayName: string;
  id: string;
  order: number;
  conferences: string[];
};

const CreateSchool: FC<CreateSchoolProps> = ({ params, searchParams }) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    authStore: { user },
  } = useRootStore();
  const { action } = params;
  const editType = action === "edit" ?? false;
  const fetchSchool = editType && searchParams?.school;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loadingDivision, setLoadingDivision] = useState<boolean>(false);
  const [openDivision, setOpenDivision] = useState<boolean>(false);
  const [openConference, setOpenConference] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(0);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(0);
  const [divisions, setDivisions] = useState<DivisionProps[]>();
  const [conferences, setConferences] = useState<string[]>();
  const [registerSchool] = useRegisterSchoolMutation();
  const [updateSchool] = useUpdateSchoolMutation();

  useEffect(() => {
    getDivisions();
    return () => {
      getDivisions();
    };
  }, []);

  const { data: schoolData } = useGetSchoolQuery({
    variables: {
      where: {
        id: searchParams?.school,
      },
    },
    skip: !fetchSchool,
  });

  const { data: schoolTypeData, loading } = useGetSchoolTypesQuery({
    variables: {
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const getDivisions = async () => {
    setLoadingDivision(true);
    try {
      let divisions: DivisionProps[] = [];
      const querySnapshot = await getDocs(collection(db, "divisions"));
      querySnapshot?.forEach((doc) => {
        if (doc?.exists()) {
          divisions.push({
            ...doc?.data(),
            id: doc?.id,
            displayName: doc?.data()?.displayName,
            order: doc?.data()?.order,
            conferences: doc?.data()?.conferences,
          });
        }
      });
      setDivisions(divisions);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setLoadingDivision(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SchoolValidator),
    defaultValues: {
      logo: "",
      name: "",
      email: "",
      conference: "",
      division: "",
      country: "",
      schoolType: {},
      description: "",
      yearlyTuition: null,
      state: "",
      city: "",
      address: "",
      primaryColor: "",
      secondaryColor: "",
      undergradStudents: null,
      yearFounded: "",
    },
    values: {
      logo: schoolData?.school?.logo || "",
      name: schoolData?.school?.name || "",
      email: schoolData?.school?.email || "",
      conference: schoolData?.school?.conference || "",
      division: schoolData?.school?.division || "",
      country: schoolData?.school?.country?.abbreviation || "",
      schoolType:
        {
          name: schoolData?.school?.schoolType?.name as string,
          id: schoolData?.school?.schoolType?.id,
        } || {},
      description: schoolData?.school?.description || "",
      yearlyTuition: schoolData?.school?.yearlyTuition || null,
      state: schoolData?.school?.state || "",
      city: schoolData?.school?.city || "",
      address: schoolData?.school?.address || "",
      primaryColor: schoolData?.school?.primaryColor || "",
      secondaryColor: schoolData?.school?.secondaryColor || "",
      undergradStudents: schoolData?.school?.undergradStudents || null,
      yearFounded: schoolData?.school?.yearFounded || "",
    },
  });

  const watchAllFields = watch();

  const updateSchoolFn = (payload: FormData) => {
    return updateSchool({
      variables: {
        where: { id: searchParams?.school },
        data: {
          name: { set: payload?.name },
          email: { set: payload?.email },
          description: { set: payload?.description },
          primaryColor: { set: payload?.primaryColor },
          secondaryColor: { set: payload?.secondaryColor },
          schoolType: {
            connect: {
              id: payload?.schoolType?.id,
            },
          },
          country: {
            connect: {
              abbreviation: payload?.country?.toLowerCase(),
            },
          },
          logo: { set: payload?.logo },
          yearFounded: { set: payload?.yearFounded },
          undergradStudents: { set: payload?.undergradStudents },
          yearlyTuition: { set: payload?.yearlyTuition },
          division: { set: payload?.division },
          conference: { set: payload?.conference },
          city: { set: payload?.city },
          state: { set: payload?.state },
          address: { set: payload?.address },
        },
      },
    });
  };

  const createSchool = (payload: FormData) => {
    return registerSchool({
      variables: {
        data: {
          name: payload?.name,
          email: payload?.email,
          logo: payload?.logo,
          yearFounded: payload?.yearFounded,
          undergradStudents: payload?.undergradStudents,
          description: payload?.description,
          primaryColor: payload?.primaryColor,
          secondaryColor: payload?.secondaryColor,
          schoolType: {
            connect: {
              id: payload?.schoolType?.id,
            },
          },
          country: {
            connect: {
              abbreviation: payload?.country?.toLowerCase(),
            },
          },
          yearlyTuition: payload?.yearlyTuition,
          division: payload?.division,
          conference: payload?.conference,
          city: payload?.city,
          state: payload?.state,
          address: payload?.address,
        },
      },
    });
  };

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await SchoolValidator.validate(values);
      let updateType = editType && searchParams?.school;
      let resp;
      if (updateType) {
        const res = await updateSchoolFn(payload);
        resp = res?.data?.updateOneSchool;
      } else {
        const res = await createSchool(payload);
        resp = res?.data?.createOneSchool;
      }
      const toastTitle = updateType ? "School updated" : "School created";
      const toastMsg = updateType
        ? "You have successfully updated a school"
        : "You have successfully created a school";
      toast({
        title: toastTitle,
        description: toastMsg,
        variant: "successfull",
      });
      router.push(
        resp?.schoolType?.name === "High School"
          ? `/schools/high-school`
          : `/schools/college`
      );
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };

  const schoolTypes = useMemo(
    () =>
      schoolTypeData?.schoolTypes?.map((type) => ({
        label: type?.name,
        value: type?.name,
        id: type?.id,
        uuid: type?.uuid,
      })) || [],
    [schoolTypeData?.schoolTypes]
  );

  const divisionData = useMemo(
    () =>
      divisions?.map((division) => ({
        label: division?.displayName,
        value: division?.displayName,
        id: division?.id,
        order: division?.order,
        conferences: division.conferences,
      })) || [],
    [divisions]
  );

  const conferenceData = useMemo(
    () =>
      conferences?.map((conference) => ({
        id: conference,
        value: conference,
        label: conference,
      })) || [],
    [conferences]
  );

  const handleAvatarUploadSuccess = useCallback(
    (url: string | null) => {
      setValue("logo", url as string);
    },
    [setValue]
  );

  const primaryColorInput = register("primaryColor", { required: true });
  const secondaryColorInput = register("secondaryColor", { required: true });
  // const yearFoundedInput = register("yearFounded", { required: true });
  const countryInput = register("country", { required: true });

  const {
    primaryColor,
    secondaryColor,
    yearFounded,
    schoolType,
    division,
    country,
    state,
    city,
    logo,
    conference,
  } = getValues();

  let errorMessage;
  if (errors?.schoolType?.id) {
    errorMessage = errors?.schoolType.id?.message;
  } else if (errors?.schoolType?.name) {
    errorMessage = errors?.schoolType.name?.message;
  } else {
    errorMessage = "";
  }

  useEffect(() => {
    if (division && editType) {
      const filteredConference = divisionData?.find(
        (val) => val?.value === division
      );
      if (filteredConference?.conferences) {
        setConferences(filteredConference?.conferences);
      }
    }
  }, [editType, division, divisionData]);

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
            title={`${
              fetchSchool ? "Edit School Profile" : "Create New School"
            }`}
            icon={
              <Icons.school className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
            }
            isIcon
            subHeader="School Details"
          />
        </div>
      </div>
      <Separator className="my-6" />
      <form
        id="create_school"
        name="create_school"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 place-self-center	">
            <AvatarUploader
              height={120}
              width={120}
              id="school_log"
              imgUrl={logo}
              onUploadSuccess={handleAvatarUploadSuccess}
              folder="school_profile_files"
              userId={fetchSchool ? schoolData?.school?.id : user?.id}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="name"
              placeholder="School Name"
              label="Name"
              type="text"
              className="bg-transparent"
              error={errors?.name?.message}
              {...register("name", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="email"
              type="email"
              label="Email"
              className="bg-transparent"
              placeholder="School Email"
              error={errors?.email?.message}
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="yearFounded"
              type="date"
              label="Year Founded"
              value={yearFounded && formatDate(yearFounded, "yyyy-MM-dd")}
              className="bg-transparent inputdate"
              placeholder="Enter Year Founded"
              error={errors?.yearFounded?.message}
              {...register("yearFounded", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <NumberInput
              error={errors?.yearlyTuition?.message}
              label="Yearly Tuition"
              id="yearlyTuition"
              handleRegister={{
                ...register("yearlyTuition", { required: true }),
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <ComboBoxCard
              loading={loading}
              error={errorMessage}
              scrollAreaClass="h-[100px]"
              id="schoolTypes"
              valueKey="id"
              placeholder="Select School Type"
              displayKey="label"
              IdKey="label"
              isOpen={isOpen}
              selectedValue={schoolType}
              onClose={() => setIsOpen(!isOpen)}
              onSelectValue={(item) => {
                setValue("schoolType", { id: item?.id, name: item?.label });
              }}
              label="School Type"
              items={schoolTypes as any}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="undergradStudents"
              type="number"
              label="Undergrad Students"
              className="bg-transparent"
              placeholder="Enter Undergrad Students"
              error={errors?.undergradStudents?.message}
              {...register("undergradStudents", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          {schoolType?.name === "High School" ? (
            <div className="col-span-12 sm:col-span-12">
              <ComboBoxCard
                loading={loadingDivision}
                error={errors?.division?.message}
                scrollAreaClass="h-[170px]"
                id="division"
                valueKey="value"
                displayKey="label"
                IdKey="label"
                isOpen={openDivision}
                placeholder="Select Classification"
                selectedValue={{ value: division }}
                onClose={() => setOpenDivision(!openDivision)}
                onSelectValue={(item) => {
                  setValue("division", item?.value);
                }}
                label={"Classification"}
                items={classificationOptions as any}
              />
            </div>
          ) : (
            <>
              <div className="col-span-12 sm:col-span-6">
                <ComboBoxCard
                  loading={loadingDivision}
                  error={errors?.division?.message}
                  scrollAreaClass="h-[100px]"
                  id="division"
                  valueKey="value"
                  displayKey="label"
                  IdKey="label"
                  isOpen={openDivision}
                  placeholder="Select Division"
                  selectedValue={{ value: division }}
                  onClose={() => setOpenDivision(!openDivision)}
                  onSelectValue={(item) => {
                    setConferences(item?.conferences);
                    setValue("division", item?.value);
                  }}
                  label={"Division"}
                  items={divisionData as any}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <ComboBoxCard
                  loading={loadingDivision}
                  disabled={!division}
                  error={errors?.conference?.message}
                  scrollAreaClass="h-[100px]"
                  id="conference"
                  valueKey="value"
                  displayKey="label"
                  IdKey="label"
                  placeholder="Select Conference"
                  isOpen={openConference}
                  selectedValue={{ value: conference }}
                  onClose={() => setOpenConference(!openConference)}
                  onSelectValue={(item) => {
                    setValue("conference", item?.value);
                  }}
                  label="Conference"
                  items={conferenceData as any}
                />
              </div>
            </>
          )}

          {/* <Input
              id="conference"
              type="text"
              label="Conference"
              className="bg-transparent"
              placeholder="Enter conference"
              error={errors?.conference?.message}
              {...register("conference", { required: true })}
            /> */}
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Label
              htmlFor="primaryColor"
              className="font-semibold text-left text-[14px] mb-11 d-flex"
            >
              Primary Color
            </Label>
            <ColorPickeCard
              header="Select Primary Color"
              // name={primaryColorInput.name}
              // touched={!!touchedFields?.primaryColor}
              // ref={primaryColorInput.ref}
              id="primaryColor"
              // onBlur={primaryColorInput.onBlur}
              error={errors.primaryColor?.message}
              title="Primary Color"
              onSetColor={(color) => setValue("primaryColor", color?.hex)}
              selectedColor={primaryColor}
              defaultColor="#dc2626"
              {...register("primaryColor", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Label
              htmlFor="secondaryColor"
              className="font-semibold text-left text-[14px] mb-11 d-flex"
            >
              Secondary Color
            </Label>
            <ColorPickeCard
              header="Select Secondary Color"
              // name={secondaryColorInput.name}
              // touched={!!touchedFields?.secondaryColor}
              // ref={secondaryColorInput.ref}
              id="secondaryColor"
              // onBlur={secondaryColorInput.onBlur}
              error={errors?.secondaryColor?.message}
              title="Secondary Color"
              onSetColor={(color) => setValue("secondaryColor", color?.hex)}
              selectedColor={secondaryColor}
              defaultColor="#48552a"
              {...register("secondaryColor", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <SelectCountry
              placeholder="Select Country"
              searchPlaceholder="Search country..."
              onSelectCountryId={(item) => {
                setSelectedCountryId(item);
              }}
              selectedCountry={country?.toUpperCase()}
              id="country"
              label="Country"
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
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="address"
              type="text"
              label="Address"
              className="bg-transparent"
              placeholder="Enter Address"
              error={errors?.address?.message}
              {...register("address", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-12">
            <Textarea
              id="description"
              label="Description"
              className="bg-transparent"
              placeholder="Enter description..."
              error={errors?.description?.message}
              {...register("description", { required: true })}
            />
          </div>
        </div>
        <Button
          variant="default"
          className="w-full mt-6"
          type="submit"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? (
            <div className="flex flex-row items-center justify-center">
              <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : (
            <>{fetchSchool ? "Save" : "Submit"}</>
          )}
        </Button>
      </form>
    </main>
  );
};

export default observer(CreateSchool);
