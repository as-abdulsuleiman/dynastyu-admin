/** @format */

"use client";

import { GetAggregateCoachProfileQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const CoacheStore = types
  .model("CoacheStore", {
    coaches: types.optional(
      types.frozen<Partial<GetAggregateCoachProfileQuery>>(),
      {}
    ),
  })
  .actions((store) => ({
    setCoaches(coaches: Partial<GetAggregateCoachProfileQuery>) {
      store.coaches = cast(coaches);
    },
  }));
