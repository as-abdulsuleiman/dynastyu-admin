/** @format */

"use client";

import { GetAggregateSchoolQuery, GetPermissionsQuery, GetSchoolsQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const PermissionStore = types
  .model("PermissionStore", {
    permissions: types.optional(
      types.frozen<Partial<GetPermissionsQuery>>(),
      {}
    ),
  })
  .actions((store) => ({
    setPermission(permissions: Partial<GetPermissionsQuery>) {
      store.permissions = cast(permissions);
    },
  }));
