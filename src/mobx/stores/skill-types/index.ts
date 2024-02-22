/** @format */

"use client";

import { SkillsTypesQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const SkillTypeStore = types
  .model("SkillTypes", {
    skillTypes: types.optional(types.frozen<Partial<SkillsTypesQuery[]>>(), []),
  })
  .actions((store) => ({
    setSkillTypes(skillTypes: Partial<SkillsTypesQuery[]>) {
      store.skillTypes = cast(skillTypes);
    },
  }));
