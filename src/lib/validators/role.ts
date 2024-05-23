/** @format */

import * as Yup from "yup";

export const RoleValidator = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Minimum 2 symbols"),
});
