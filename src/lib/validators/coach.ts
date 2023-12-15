/** @format */

import * as Yup from "yup";

export const CoachValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    firstName: Yup.string().min(2, "Minimum 2 symbols").required(),
    lastName: Yup.string().min(2, "Minimum 2 symbols").required(),
    accountType: Yup.string().required(),
    title: Yup.string().required(),
    canReceiveMessages: Yup.boolean(),
});
