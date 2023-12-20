/** @format */

"use client"

import { GetAthletesQuery, GetUsersQuery, User } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const AthleteStore = types
  .model("AthleteStore", {
    athletes: types.optional(types.frozen<Partial<GetAthletesQuery[]>>(),[]),
  })
  .actions((store) => ({
    setAthletes(athletes: Partial<GetAthletesQuery[]>) {
        store.athletes =cast(athletes) 
      },
  }));
