/** @format */

import * as Yup from "yup";

export const PermissionValidator = Yup.object({
  title: Yup.string().required("Title is required").min(2, "Minimum 2 symbols"),
  query: Yup.string().required("Query is required").min(2, "Minimum 2 symbols"),
});
