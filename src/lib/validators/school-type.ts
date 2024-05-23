/** @format */

import * as Yup from "yup";

export const SchoolTypeValidator = Yup.object({
  name: Yup.string().required("Name is required").min(2, "Minimum 2 symbols"),
});
