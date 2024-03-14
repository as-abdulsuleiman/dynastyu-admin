/** @format */

import { Instance, types } from "mobx-state-tree";
import { persist } from "mst-persist";
import localForage from "localforage";
import { AuthStore } from "./auth";
import { CounterStore } from "./counter";
import { UserStore } from "./users";
import { CoacheStore } from "./coaches";
import { FanStore } from "./fans";
import { AthleteStore } from "./athletes";
import { SchoolStore } from "./schools";
import { SkillTypeStore } from "./skill-types";
import { VerificationRequestStore } from "./verification-request";

export const RootStore = types.model("RootStore", {
  counterStore: CounterStore,
  authStore: AuthStore,
  userStore: UserStore,
  athleteStore: AthleteStore,
  coacheStore: CoacheStore,
  fanStore: FanStore,
  schoolStore: SchoolStore,
  SkillTypeStore :SkillTypeStore,
  verificationRequestStore:VerificationRequestStore
});

export interface RootStore extends Instance<typeof RootStore> {}

export const createRootStore = () => {
  const rootStore = RootStore.create(
    {
      counterStore: CounterStore.create(),
      authStore: AuthStore.create(),
      athleteStore: AthleteStore.create(),
      userStore: UserStore.create(),
      coacheStore: CoacheStore.create(),
      fanStore: FanStore.create(),
      schoolStore: SchoolStore.create(),
      SkillTypeStore :SkillTypeStore.create(),
      verificationRequestStore:VerificationRequestStore.create()

    },
    { NODE_ENV: process.env.NODE_ENV }
  );

  if (typeof window !== "undefined") {
    persist("rootStore", rootStore, {
      storage: localForage, // or AsyncStorage in react-native.
      // default: localStorage
      jsonify: false, // if you use AsyncStorage, this shoud be true
      // default: true
      // whitelist: ['athleteStore','userStore','coacheStore','fanStore']
    }).then(() => console.log("rootStore has been hydrated"));
  }

  return rootStore;
};
