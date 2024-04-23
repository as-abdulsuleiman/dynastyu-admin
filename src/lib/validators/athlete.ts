/** @format */

import * as Yup from "yup";
// const hudlPattern = /^https:\/\/app\.dynastyu\.com\/user\/\d+$/;
// const hudlPattern = /^https:\/\/www\.hudl\.com\/video\/\w+/;
const hudlPattern = /^https:\/\/www\.hudl\.com\/video\/[a-zA-Z0-9]+$/;

export const AthleteValidator = Yup.object({
  email: Yup.string().lowercase()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required").min(2, "Minimum 2 symbols"),
  firstName: Yup.string().required("First Name is required").min(2, "Minimum 2 symbols"),
  lastName: Yup.string().required("Last Name is required").min(2, "Minimum 2 symbols"),
  dob: Yup.string().required("Date is required"),
  accountType: Yup.object().shape({
    accountTypeId: Yup.string().required("Account type is required"),
    roleId: Yup.string().required("Role is required"),
  }).required("Account type is required"),
  position: Yup.string().required("Position is required"),
  school: Yup.object().shape({
     id: Yup.string().required("School is required"),
     name:  Yup.string()
  }),
  graduationYear:Yup.string().required("Graduation year is required"),
  gpa: Yup.string()
    .trim()
    .matches(/^[0-4][.][0-9][0-9]$/, "Invalid GPA. Please ensure that the GPA falls within the range of 0-4 to 4.00")
    .required("GPA is required"),
  city:Yup.string().required("City is required"),
  state:Yup.string().required("State is required"),
  country:Yup.string().required("Country is required"),
  avatar: Yup.string().url(),
  hudlLink: Yup.string().url().required("Hudl link is required").matches(hudlPattern,"Hudl link is not valid"),
});
