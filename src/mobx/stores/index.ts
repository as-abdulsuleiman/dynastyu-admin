/** @format */
"use client"

import { Instance, types } from "mobx-state-tree";
import { persist } from "mst-persist";
import localForage from "localforage";
import { AuthStore } from "./auth";
import { CounterStore } from "./counter";
import { UserStore } from "./users";
import { CoacheStore } from "./coaches";
import { FanStore } from "./fans";
import { AthleteStore } from "./athletes";

export const RootStore = types.model("RootStore", {
  counterStore: CounterStore,
  authStore: AuthStore,
  userStore: UserStore,
  athleteStore:AthleteStore,
  coacheStore: CoacheStore,
  fanStore:FanStore
});

export interface RootStore extends Instance<typeof RootStore> {}

export const createRootStore = () => {
  const rootStore = RootStore.create(
    {
      counterStore: CounterStore.create(),
      authStore: AuthStore.create(),
      athleteStore:AthleteStore.create(),
      userStore:UserStore.create(),
      coacheStore:CoacheStore.create(),
      fanStore: FanStore.create()
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
