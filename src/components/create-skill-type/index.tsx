/** @format */

"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import SkillIcon from "@/components/Icons/skill";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SkillTypeValidator } from "@/lib/validators/skillType";
import { Icons } from "../Icons";
import { Textarea } from "../ui/textarea";
import MultiTextInput from "../multi-text-input";
import {
  useCreateSkillTypeMutation,
  useGetSkillTypeQuery,
  useUpdateSkillTypeMutation,
} from "@/services/graphql";
import { observer } from "mobx-react-lite";
import { Separator } from "../ui/separator";
import Title from "../title";
import ContentHeader from "../content-header";

interface CreateSkillTypeProps {
  params: {
    action: string;
  };
  searchParams: {
    skillType: number;
  };
}

type FormData = yup.InferType<typeof SkillTypeValidator>;

const CreateSkillType: FC<CreateSkillTypeProps> = ({
  params,
  searchParams,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { action } = params;
  const editType = action === "edit" ?? false;
  const fetchSkillType = editType && searchParams?.skillType;
  const [option, setOption] = useState<string>("");
  const [secondOption, setSecondOption] = useState<string>("");
  const [maskOption, setMaskOption] = useState<string>("");
  const [videoLabelOption, setVideoLabelOption] = useState<string>("");
  const [createSkillType] = useCreateSkillTypeMutation();
  const [upateSkillType] = useUpdateSkillTypeMutation();

  const { data: skillTypeData, loading } = useGetSkillTypeQuery({
    variables: {
      where: {
        id: searchParams?.skillType,
      },
    },
    skip: !fetchSkillType,
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SkillTypeValidator),
    defaultValues: {
      name: "",
      unit: "",
      icon: "",
      mask: [],
      options: [],
      videosLabels: [],
      description: "",
      numberOfVideos: 1,
      secondFieldName: "",
      secondValueOptions: [],
      isPrimaryForRecruitment: false,
    },
    values: {
      name: skillTypeData?.skillType?.name || "",
      unit: skillTypeData?.skillType?.unit || "",
      icon: skillTypeData?.skillType?.icon || null,
      mask: skillTypeData?.skillType?.mask || [],
      options: skillTypeData?.skillType?.options || [],
      videosLabels: skillTypeData?.skillType?.videosLabels || [],
      description: skillTypeData?.skillType?.description || "",
      numberOfVideos: skillTypeData?.skillType?.numberOfVideos || 1,
      secondFieldName: skillTypeData?.skillType?.secondFieldName || "",
      secondValueOptions: skillTypeData?.skillType?.secondValueOptions || [],
      isPrimaryForRecruitment:
        skillTypeData?.skillType?.isPrimaryForRecruitment || false,
    },
  });

  const {
    mask,
    videosLabels,
    options,
    secondValueOptions,
    isPrimaryForRecruitment,
  } = getValues();

  const watchAllFields = watch();

  const handleAddOption = (val: string) => {
    if (options?.includes(val)) {
      toast({
        title: "Options",
        description: `${val || "Value"} already exists`,
        variant: "destructive",
      });
    } else {
      setValue("options", [...options, val], {
        shouldTouch: true,
        shouldDirty: true,
      });
      setOption("");
    }
  };

  const handleVideoLabelOption = (val: string) => {
    if (videosLabels?.includes(val)) {
      toast({
        title: "Second value options",
        description: `${val || "Value"} already exists`,
        variant: "destructive",
      });
    } else {
      setValue("videosLabels", [...(videosLabels as string[]), val], {
        shouldTouch: true,
        shouldDirty: true,
      });
      setVideoLabelOption("");
    }
  };

  const handleMaskOption = (val: string) => {
    if (mask?.includes(val)) {
      toast({
        title: "Second value options",
        description: `${val || "Value"} already exists`,
        variant: "destructive",
      });
    } else {
      setValue("mask", [...(mask as string[]), val], {
        shouldTouch: true,
        shouldDirty: true,
      });
      setMaskOption("");
    }
  };

  const handleSecondOption = (val: string) => {
    if (secondValueOptions?.includes(val)) {
      toast({
        title: "Second value options",
        description: `${val || "Value"} already exists`,
        variant: "destructive",
      });
    } else {
      setValue(
        "secondValueOptions",
        [...(secondValueOptions as string[]), val],
        { shouldTouch: true, shouldDirty: true }
      );
      setSecondOption("");
    }
  };

  const handleRemoveItem = (val: any, fieldName: keyof FormData) => {
    const dataField = fieldName as keyof FormData;
    const field = getValues()?.[dataField];
    if (Array?.isArray(field)) {
      const filteredItems = [...field?.filter((f: any) => f !== val)];
      setValue(fieldName, [...filteredItems], {
        shouldTouch: true,
        shouldDirty: true,
      });
    }
  };

  const updateSkillTypeFn = (payload: FormData) => {
    return upateSkillType({
      variables: {
        where: {
          id: searchParams?.skillType,
        },
        data: {
          name: { set: payload?.name },
          icon: { set: payload.icon },
          unit: { set: payload?.unit as string },
          mask: { set: payload?.mask as string[] },
          options: { set: payload.options as string[] },
          numberOfVideos: { set: payload?.numberOfVideos },
          secondValueOptions: { set: payload.secondValueOptions as string[] },
          videosLabels: { set: payload.videosLabels as string[] },
          description: { set: payload?.description },
          secondFieldName: { set: payload?.secondFieldName },
          isPrimaryForRecruitment: { set: payload?.isPrimaryForRecruitment },
        },
      },
    });
  };

  const createSkillTypeFn = (payload: FormData) => {
    return createSkillType({
      variables: {
        data: {
          icon: payload.icon,
          name: payload?.name,
          unit: payload?.unit as string,
          mask: { set: payload?.mask as string[] },
          options: { set: payload.options as string[] },
          numberOfVideos: payload?.numberOfVideos,
          secondValueOptions: { set: payload.secondValueOptions as string[] },
          videosLabels: { set: payload.videosLabels as string[] },
          description: payload?.description,
          secondFieldName: payload?.secondFieldName,
          isPrimaryForRecruitment: payload?.isPrimaryForRecruitment,
        },
      },
    });
  };

  const onSubmit = async (values: FormData) => {
    const payload = await SkillTypeValidator.validate(values);
    let updateType = fetchSkillType;
    try {
      if (updateType) {
        await updateSkillTypeFn(payload);
      } else {
        await createSkillTypeFn(payload);
      }
      const toastTitle = updateType
        ? "Skill type updated"
        : "Skill type created";
      const toastMsg = updateType
        ? `You have successfully updated ${payload?.name} skill type`
        : `You have successfully created ${payload?.name} skill type`;
      toast({
        title: toastTitle,
        description: toastMsg,
        variant: "successfull",
      });
      router.push(`/skill-types`);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <main className="w-full h-full">
      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <ContentHeader
        title={fetchSkillType ? "Edit Skill Type" : "Create New Skill Type"}
        subHeader={"Skill Type Overview"}
        // icon={<SkillIcon className="h-5 w-5" />}
      />
      <Separator className="my-6" />
      <form
        id="create_skillType"
        name="create_skillType"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="name"
              placeholder="Name"
              label="Name"
              type="text"
              className="bg-transparent"
              autoComplete="null"
              error={errors?.name?.message}
              {...register("name", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="secondFieldName"
              type="text"
              label="Second Field Name"
              className="bg-transparent"
              placeholder="Second Field Name"
              error={errors?.secondFieldName?.message}
              {...register("secondFieldName", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="numberOfVideos"
              type="number"
              label="Number Of Videos"
              className="bg-transparent"
              placeholder="Number Of Videos"
              error={errors?.numberOfVideos?.message}
              {...register("numberOfVideos", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="unit"
              type="text"
              label="Unit"
              className="bg-transparent"
              placeholder="Unit"
              error={errors?.unit?.message}
              {...register("unit", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <MultiTextInput
              items={options as string[]}
              type="text"
              id="options"
              placeholder="Enter Options"
              //   name="inputArray"
              label="Options"
              value={option}
              onKeyDown={handleAddOption}
              onChange={(e) => setOption(e)}
              error={errors.options?.message}
              handleRemoveItem={(index) => handleRemoveItem(index, "options")}

              //   onBlur={() => setTouched("options", true)}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <MultiTextInput
              items={secondValueOptions as string[]}
              type="text"
              id="secondValueOptions"
              placeholder="Enter Second Value Options"
              //   name="inputArray"
              label="Second Value Options"
              value={secondOption}
              onKeyDown={handleSecondOption}
              onChange={(e) => setSecondOption(e)}
              error={errors.secondValueOptions?.message}
              handleRemoveItem={(index) =>
                handleRemoveItem(index, "secondValueOptions")
              }

              //   onBlur={() => setTouched("secondValueOptions", true)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <MultiTextInput
              items={videosLabels as string[]}
              type="text"
              id="videosLabels"
              placeholder="Enter Video Labels"
              //   name="inputArray"
              label="Video Labels"
              value={videoLabelOption}
              onKeyDown={handleVideoLabelOption}
              onChange={(e) => setVideoLabelOption(e)}
              error={errors?.videosLabels?.message}
              handleRemoveItem={(index) =>
                handleRemoveItem(index, "videosLabels")
              }

              //   onBlur={() => setTouched("options", true)}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <MultiTextInput
              items={mask as string[]}
              type="text"
              id="mask"
              placeholder="Enter Mask"
              //   name="inputArray"
              label="Mask"
              value={maskOption}
              onKeyDown={handleMaskOption}
              onChange={(e) => setMaskOption(e)}
              error={errors?.mask?.message}
              handleRemoveItem={(index) => handleRemoveItem(index, "mask")}

              //   onBlur={() => setTouched("secondValueOptions", true)}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 py-2">
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="icon"
              placeholder="Icon"
              label="Icon"
              type="text"
              className="bg-transparent"
              autoComplete="null"
              error={errors?.icon?.message}
              {...register("icon", { required: true })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
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
        <div className="grid grid-cols-12 gap-6 py-2 pt-6">
          <div className="col-span-12 sm:col-span-6" id="can_receive_messages">
            <div className="items-top flex space-x-2">
              <Checkbox
                checked={isPrimaryForRecruitment}
                onCheckedChange={(e: boolean) =>
                  setValue("isPrimaryForRecruitment", e)
                }
                id="is_primary_for_recruitment"
                name="is_primary_for_recruitment"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="is_primary_for_recruitment"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Primary for recruitment
                </label>
              </div>
            </div>
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
            <>{fetchSkillType ? "Save" : "Submit"}</>
          )}
        </Button>
      </form>
    </main>
  );
};

export default observer(CreateSkillType);
