/** @format */

"use client";

import {  GetSkillVerificationRequestsQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const SkillVerificationRequestStore = types
  .model("SkillVerificationRequestStore", {
    skillVerificationRequest: types.optional(types.frozen<Partial<GetSkillVerificationRequestsQuery[]>>(), []),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((store) => ({
    setSkillVerificationRequest(skillVerificationRequest: Partial<GetSkillVerificationRequestsQuery[]>) {
      store.skillVerificationRequest = cast(skillVerificationRequest);
    },
    setLoading(value: boolean) {
      store.isLoading = value;
    },
  }));
