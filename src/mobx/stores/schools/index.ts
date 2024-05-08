/** @format */

"use client";

import { GetAggregateSchoolQuery, GetSchoolsQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const SchoolStore = types
  .model("SchoolStore", {
    schools: types.optional(
      types.frozen<Partial<GetAggregateSchoolQuery>>(),
      {}
    ),
  })
  .actions((store) => ({
    setSchools(schools: Partial<GetAggregateSchoolQuery>) {
      store.schools = cast(schools);
    },
  }));
