/** @format */

import * as Yup from "yup";
import { isValid, parse } from "date-fns";

export const FanValidator = Yup.object({
  email: Yup.string().lowercase()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.string().required("Date is required"),
  username: Yup.string()
    .required("Username is required")
    .min(2, "Minimum 2 symbols"),
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "Minimum 2 symbols"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Minimum 2 symbols"),
  accountType: Yup.object()
    .shape({
      accountTypeId: Yup.string().required("Account type is required"),
      roleId: Yup.string().required("Role is required"),
    })
    .required("Account type is required"),
  avatar: Yup.string().url(),
  city: Yup.string(),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});
