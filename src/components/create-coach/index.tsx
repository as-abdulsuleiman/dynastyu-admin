/** @format */

"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import AvatarUploader from "@/components/avatar-uploader";
import { CoachValidator } from "@/lib/validators/coach";
import {
  useGetAccountTypesQuery,
  useGetCoachQuery,
  useRegisterCoachMutation,
  useUpdateCoachMutation,
} from "@/services/graphql";
import ComboBoxCard from "../combobox-card";
import SchoolDropdown from "../school-dropdown";
import { coachTitleOptions } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "../Icons";
import { projectAuth } from "@/services/firebase/config";
import { useRootStore } from "@/mobx";
import { sendPasswordResetEmail } from "firebase/auth";
import { Title, Text, Divider } from "@tremor/react";
import { SelectCountry } from "../select-country";
import SelectCity from "../select-city";
import SelectState from "../select-state";
import { useRouter } from "next/navigation";
type FormData = yup.InferType<typeof CoachValidator>;

interface CreateCoachProps {
  params: {
    action: string;
  };
  searchParams: {
    coach: number;
  };
}

const CreateCoach: FC<CreateCoachProps> = ({ params, searchParams }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [openAccountType, setOpenAccountType] = useState<boolean>(false);
  const [openSchool, setOpenSchool] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(0);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(0);
  const [registerCoach] = useRegisterCoachMutation();
  const [updateCoach] = useUpdateCoachMutation();
  const { action } = params;
  const editType = action === "edit" ?? false;
  const fetchCoach = editType && searchParams?.coach;

  const { data: coachData } = useGetCoachQuery({
    variables: {
      where: {
        id: searchParams?.coach,
      },
    },
    skip: !fetchCoach,
  });

  const { data: accountTypes, loading: accaccountTypeLoading } =
    useGetAccountTypesQuery({
      variables: {
        where: {
          id: {
            equals: 3,
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
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(CoachValidator),
    defaultValues: {
      avatar: "",
      title: "",
      firstName: "",
      email: "",
      lastName: "",
      canReceiveMessages: false,
      accountType: {},
      username: "",
      school: {},
      state: "",
      city: "",
      country: "",
    },
    values: {
      avatar: coachData?.coachProfile?.user?.avatar || "",
      firstName: coachData?.coachProfile?.user?.firstname || "",
      email: coachData?.coachProfile?.user?.email || "",
      lastName: coachData?.coachProfile?.user?.surname || "",
      username: coachData?.coachProfile?.user?.username || "",
      title: coachData?.coachProfile?.title || "",
      canReceiveMessages: coachData?.coachProfile?.canReceiveMessages || false,
      country: coachData?.coachProfile?.country?.abbreviation || "",
      state: coachData?.coachProfile?.state || "",
      city: coachData?.coachProfile?.city || "",
      school:
        {
          id: coachData?.coachProfile?.schoolId,
          name: coachData?.coachProfile?.school.name,
        } || {},
      accountType:
        {
          accountTypeId: coachData?.coachProfile?.user?.accountType?.id,
          roleId: coachData?.coachProfile?.user?.accountType?.role?.id,
        } || {},
    },
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });

  const watchAllFields = watch();
  const {
    canReceiveMessages,
    title,
    accountType,
    school,
    avatar,
    country,
    state,
    city,
  } = getValues();

  const countryInput = register("country", { required: true });

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

  const handleAvatarUploadSuccess = useCallback(
    (url: string | null) => {
      setValue("avatar", url as string);
    },
    [setValue]
  );

  const updateCoachFn = (values: FormData) => {
    return updateCoach({
      variables: {
        where: {
          id: searchParams?.coach,
        },
        data: {
          title: { set: values?.title },
          canReceiveMessages: { set: values?.canReceiveMessages },
          city: { set: values?.city },
          state: { set: values?.state },
          user: {
            update: {
              firstname: { set: values?.firstName },
              surname: { set: values?.lastName },
              email: { set: values?.email },
              username: { set: values?.username },
              avatar: { set: values?.avatar },
              accountType: {
                connect: {
                  id: Number(values?.accountType?.accountTypeId),
                },
              },
              role: {
                connect: { id: Number(values?.accountType?.roleId) },
              },
            },
          },
          country: {
            connect: {
              abbreviation: values?.country?.toLowerCase(),
            },
          },
          school: {
            connect: {
              id: values?.school?.id,
            },
          },
        },
      },
    });
  };

  const createCoach = (values: FormData) => {
    return registerCoach({
      variables: {
        data: {
          firebaseUid: "",
          firstname: values.firstName,
          surname: values.lastName,
          email: values.email,
          username: values.username,
          avatar: values.avatar,
          accountType: {
            connect: {
              id: Number(values.accountType?.accountTypeId),
            },
          },
          role: {
            connect: { id: Number(values?.accountType?.roleId) },
          },
          coachProfile: {
            create: {
              title: values.title,
              canReceiveMessages: values.canReceiveMessages,
              city: values?.city,
              state: values?.state,
              school: { connect: { id: Number(values?.school?.id) } },
              country: {
                connect: {
                  abbreviation: values?.country?.toLowerCase(),
                },
              },
            },
          },
        },
      },
    });
  };

  const onSubmit = async (values: FormData) => {
    try {
      const payload = await CoachValidator.validate(values);
      const updateType = editType && searchParams?.coach;
      if (updateType) {
        await updateCoachFn(payload);
        toast({
          title: "Caoch updated",
          description: "You have successfully updated a coach",
          variant: "default",
        });
      } else {
        await createCoach(payload);
        await sendPasswordResetEmail(projectAuth, values?.email);
        toast({
          title: "Coach successfully created.",
          description: `A password reset link has been sent to ${values?.email} to complete the process.`,
          variant: "default",
        });
      }
      router.push(`/coaches`);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error.message}`,
        variant: "destructive",
      });
    } finally {
    }
  };

  return (
    <main className="w-full h-full">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        Go Back
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <Title>{fetchCoach ? `Edit Coach Profile` : " Add New Coach"}</Title>
          <Icons.school className="h-4 w-4 ml-2 stroke-tremor-content-emphasis dark:stroke-dark-tremor-content-emphasis" />
        </div>
        <Text>Coach Overview</Text>
      </div>
      <Divider></Divider>
      <form
        id="create_coach"
        name="create_coach"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 place-self-center">
            <AvatarUploader
              height={120}
              width={120}
              imgUrl={avatar}
              id="coaches_profile"
              onUploadSuccess={handleAvatarUploadSuccess}
              storageLocation="coaches"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="lastname"
              label="Last Name"
              className="bg-transparent"
              placeholder="Your Last Name"
              error={errors.lastName?.message}
              {...register("lastName", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="firstname"
              placeholder="Your First Name"
              label="First Name"
              className="bg-transparent"
              error={errors?.firstName?.message}
              {...register("firstName", { required: true })}
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
                setValue("accountType", {
                  accountTypeId: item?.id,
                  roleId: item?.roleId,
                });
              }}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <ComboBoxCard
              valueKey="value"
              displayKey="label"
              IdKey="label"
              label="Title"
              id="coach_title"
              placeholder={"Select Title"}
              isOpen={openTitle}
              scrollAreaClass="h-72"
              hasSearch
              error={errors?.title?.message}
              onClose={() => setOpenTitle(!openTitle)}
              items={coachTitleOptions}
              selectedValue={{ value: title }}
              onSelectValue={(item) => {
                setValue("title", item?.label);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <SchoolDropdown
              scrollAreaClass="h-72"
              hasSearch={true}
              id="schoolId"
              // onBlur={() => setFocus("school", { shouldSelect: true })}
              onClose={() => setOpenSchool(!openSchool)}
              isOpen={openSchool}
              selectedValue={{ value: school?.name }}
              onSelectValue={(school) => {
                setValue("school", {
                  id: school?.id,
                  name: school?.label,
                });
              }}
              placeholder={"Select high school"}
              label="High School"
              error={errors.school?.id?.message}
              whereClause={{
                id: { equals: coachData?.coachProfile?.schoolId },
                schoolTypeId: {
                  equals: 1,
                },
              }}
            />
          </div>
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
              onSelectCountry={(country) => setValue("country", country?.value)}
              // {...register("country", { required: true })}
              error={errors?.country?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
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
              onSelectState={(state) => setValue("state", state?.label)}
              selectStateId={(item) => setSelectedStateId(item)}
            />
          </div>
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
              onSelectCity={(city) => setValue("city", city?.label)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2 pt-6">
          <div className="col-span-12 sm:col-span-6" id="can_receive_messages">
            <div className="items-top flex space-x-2">
              <Checkbox
                checked={canReceiveMessages}
                onCheckedChange={(e: boolean) =>
                  setValue("canReceiveMessages", e)
                }
                id="can_receive_messages"
                name="can_receive_messages"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="can_receive_messages"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Can recieve and message
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            variant="default"
            disabled={isSubmitting}
            className="w-full mt-6"
            type="submit"
          >
            {isSubmitting ? (
              <div className="flex flex-row items-center justify-center">
                <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : (
              <>{fetchCoach ? "Save" : "Submit"}</>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default observer(CreateCoach);
