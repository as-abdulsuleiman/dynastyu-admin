/** @format */

"use client";

import {  GetAggregateCoachProfileQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const CoachVerificationRequestStore = types
  .model("CoachVerificationRequestStore", {
    caochVerificationRequest: types.optional(
      types.frozen<Partial<GetAggregateCoachProfileQuery>>(),
      {}
    ),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((store) => ({
    setCoachVerificationRequest(caochVerificationRequest: Partial<GetAggregateCoachProfileQuery>) {
      store.caochVerificationRequest = cast(caochVerificationRequest);
    },
    setLoading(value: boolean) {
      store.isLoading = value;
    },
  }));
