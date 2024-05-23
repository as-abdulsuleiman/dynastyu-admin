/** @format */

import * as Yup from "yup";

export const AccountTypeValidator = Yup.object({
  title: Yup.string().required("Title is required").min(2, "Minimum 2 symbols"),
  role: Yup.object()
    .shape({
      title: Yup.string(),
      id: Yup.string().required("Role is required"),
    })
});
