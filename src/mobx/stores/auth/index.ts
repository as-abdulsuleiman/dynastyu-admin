/** @format */

"use client"

import { User } from "@/services/graphql";
import { TOKEN_KEY, destroyToken, saveToken } from "@/services/token";
import { cast, types } from "mobx-state-tree";
import nookies, { destroyCookie } from "nookies";
/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

export const AuthStore = types
  .model("AuthStore", {
    user: types.optional(types.frozen<Partial<User>>(), {}),
  })
  .actions((store) => ({
    setUser(user: Partial<User>) {
      store.user = cast(user)
    },
    initAuth(token: string) {
      saveToken(token);
      nookies.set(undefined, TOKEN_KEY, token, { path: "/" });
    },
    resetAuth() {
      store.user = {};
      destroyToken();
      destroyCookie(null, TOKEN_KEY)
      nookies.set(undefined, TOKEN_KEY, "", { path: "/sign-in" });
    },
  }));
