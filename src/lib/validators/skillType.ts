/** @format */

import * as Yup from "yup";

export const SkillTypeValidator = Yup.object({
  name: Yup.string().required("Name is required"),
  secondFieldName: Yup.string(),
  unit: Yup.string(),
  icon: Yup.string().nullable(),
  isPrimaryForRecruitment: Yup.boolean(),
  description: Yup.string(),
  mask: Yup.array().of(Yup.string().trim()),
  videosLabels: Yup.array().of(Yup.string().trim()),
  secondValueOptions: Yup.array().of(Yup.string().trim()),
  options: Yup.array()
    .of(Yup.string().trim())
    .min(1, "Options must be at least 1")
    .nullable().required("Options is required"),
  numberOfVideos: Yup.number()
    .min(1, "Number of videos must be at least 1")
    .max(5, 'Number of videos must be at most 5')
    .integer("Number of videos must be an integer")
    .positive()
    .typeError("Number of videos must be a valid number")
    .required("Number of videos is required")
    .default(1),
});
