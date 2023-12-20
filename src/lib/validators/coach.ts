/** @format */

import * as Yup from "yup";

export const CoachValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    username:Yup.string().required("Username is required").min(2, "Minimum 2 symbols"),
    firstName: Yup.string().required("Full Name is required").min(2, "Minimum 2 symbols"),
    lastName: Yup.string().required("Last Name is required").min(2, "Minimum 2 symbols"),
    accountType: Yup.object().shape({
      accountTypeId:Yup.string().required("Account type is required"),
      roleId:Yup.string().required("Rolel is required"),
    }).required("Account type is required"),
    title: Yup.string().required("Title is required"),
    canReceiveMessages: Yup.boolean(),
    schoolId: Yup.string().required("School is required"),
    avatar: Yup.string().url()
});

// Yup.string().required("Account type is required"),