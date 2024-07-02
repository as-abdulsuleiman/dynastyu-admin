/** @format */

import * as Yup from "yup";

export const AthletePositionValidator = Yup.object({
  name: Yup.string().required("Name is required").min(2, "Minimum 2 symbols"),
  shortName:Yup.string().required("Short Name is required").min(2, "Minimum 2 symbols"),
  category: Yup.object()
    .shape({
      name: Yup.string(),
      id: Yup.string().required("Category is required"),
    })
});
