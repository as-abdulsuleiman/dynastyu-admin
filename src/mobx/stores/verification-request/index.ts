
/** @format */

"use client"

import { GetSkillVerificationRequestsQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const VerificationRequestStore = types
  .model("VerificationRequestStore", {
    verificationRequest: types.optional(types.frozen<Partial<GetSkillVerificationRequestsQuery[]>>(),[]),
  })
  .actions((store) => ({
    setVerificationRequest(verificationRequest: Partial<GetSkillVerificationRequestsQuery[]>) {
        store.verificationRequest = cast(verificationRequest) 
      },
  }));
