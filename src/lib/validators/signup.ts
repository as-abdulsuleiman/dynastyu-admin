/** @format */

import * as Yup from "yup";

export const SignUpValidator = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstname: Yup.string().required("First Name is required"),
  surname: Yup.string().required("Surname is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ],
    "Passwords must match"
  ),
  position:  Yup.string().required("Position is required"),
});
