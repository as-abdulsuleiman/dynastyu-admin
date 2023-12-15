"use client"
import { GetUsersQuery, User } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const AtheletesStore = types
  .model("AtheletesStore", {
    // atheletes: types.optional(types.frozen<Partial<User[]>>(), []),
    atheletes: types.optional(types.frozen<Partial<GetUsersQuery[]>>(),[],
    ),
    // atheletes: types.optional(types.array(types.frozen<User[]>()), []),


  })
  .actions((store) => ({
   
    setAtheletes(atheletes: Partial<GetUsersQuery[]>) {
        store.atheletes = atheletes
      },
    // initAuth(token: string) {
    // //   saveToken(token);
    // //   nookies.set(undefined, TOKEN_KEY, token, { path: "/" });
    // },
    // resetAuth() {
    //   store.users = {};
    // //   destroyToken();
    // //   nookies.set(undefined, TOKEN_KEY, "", { path: "/" });
    // },
  }));
