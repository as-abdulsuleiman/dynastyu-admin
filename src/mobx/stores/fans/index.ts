/** @format */

"use client";

import { GetAggregateUserQuery } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const FanStore = types
  .model("FanStore", {
    fans: types.optional(types.frozen<Partial<GetAggregateUserQuery>>(), {}),
  })
  .actions((store) => ({
    setFans(fans: Partial<GetAggregateUserQuery>) {
      store.fans = cast(fans);
    },
  }));
