/** @format */

import * as Yup from "yup";

export const SignInValidator = Yup.object({
  email: Yup.string().lowercase()
    .email("Invalid email address")
    .required("Email is required"),
    password: Yup.string().required("Password is required"),
  
});
