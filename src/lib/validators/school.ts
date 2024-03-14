/** @format */

import * as Yup from "yup";

export const SchoolValidator = Yup.object({
    logo: Yup.string().url(),
    name: Yup.string().required("Name is required").min(2, "Minimum 2 symbols"),
    conference: Yup.string().required("Conference is required"),
    division: Yup.string().required("Division is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    description: Yup.string(),
    yearFounded: Yup.string(),
    yearlyTuition: Yup.string().nullable(),
    undergradStudents: Yup.number().typeError("Required")
    .required("Required").nullable(),
    primaryColor:Yup.string().required("Primary color is required"),
    secondaryColor:Yup.string().required("Secondary color is required"),
    address:Yup.string(),
    city:Yup.string().required("City is required"),
    state:Yup.string().required("State is required"),
    country:Yup.string().required("Country is required"),
    schoolType: Yup.object().shape({
      name:Yup.string().required("school type is required"),
      id:Yup.number().integer().positive().required("School type is required"),
    }),
});

// Yup.string().required("Account type is required"),