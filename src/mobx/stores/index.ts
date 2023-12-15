/** @format */
"use client"

import { Instance, types } from "mobx-state-tree";
import { persist } from "mst-persist";
import localForage from "localforage";
import { AuthStore } from "./auth";
import { CounterStore } from "./counter";
import { UsersStore } from "./users";
import { AtheletesStore } from "./atheletes";

export const RootStore = types.model("RootStore", {
  counterStore: CounterStore,
  authStore: AuthStore,
  usersStore: UsersStore,
  atheletesStore:AtheletesStore,
});

export interface RootStore extends Instance<typeof RootStore> {}

export const createRootStore = () => {
  const rootStore = RootStore.create(
    {
      counterStore: CounterStore.create(),
      authStore: AuthStore.create(),
      atheletesStore:AtheletesStore.create(),
      usersStore:UsersStore.create()
    },
    { NODE_ENV: process.env.NODE_ENV }
  );

  if (typeof window !== "undefined") {
    persist("rootStore", rootStore, {
      storage: localForage, // or AsyncStorage in react-native.
      // default: localStorage
      jsonify: false, // if you use AsyncStorage, this shoud be true
      // default: true
      // whitelist: ['authStore', ] 
    }).then(() => console.log("rootStore has been hydrated"));
  }

  return rootStore;
};
