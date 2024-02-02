/** @format */

import * as Yup from "yup";

export const CoachValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required").min(2, "Minimum 2 symbols"),
  firstName: Yup.string().required("First Name is required").min(2, "Minimum 2 symbols"),
  lastName: Yup.string().required("Last Name is required").min(2, "Minimum 2 symbols"),
  accountType: Yup.object().shape({
    accountTypeId: Yup.string().required("Account type is required"),
    roleId: Yup.string().required("Role is required"),
  }).required("Account type is required"),
  title: Yup.string().required("Title is required"),
  canReceiveMessages: Yup.boolean(),
  school: Yup.object().shape({
     id: Yup.string().required("School is required"),
     name:  Yup.string()
  }),
  city:Yup.string(),
  state:Yup.string().required("State is required"),
  country:Yup.string().required("Country is required"),
  avatar: Yup.string().url()
});

// Yup.string().required("Account type is required"),