"use client"
import { GetUsersQuery, User } from "@/services/graphql";
import { cast, types } from "mobx-state-tree";

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const UsersStore = types
  .model("UsersStore", {
    users: types.optional(types.frozen<Partial<GetUsersQuery[]>>(), []),
    // atheletes: types.optional(types.frozen<Partial<User[]>>(), []),


  })
  .actions((store) => ({
    setUsers(user: Partial<GetUsersQuery[]>) {
      store.users = user
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
