/** @format */

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword as FirebaseSignIn,
  createUserWithEmailAndPassword as FirebaseCreateUser,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  getAuth,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { User, useGetUserLazyQuery } from "@/services/graphql";
import { useRootStore } from "@/mobx";
import { projectAuth } from "@/services/firebase/config";
import { useToast } from "./use-toast";
import { hasSideBarPermissions, sidebarItem } from "@/lib/helpers";

const AuthContext = createContext<{
  isLoggedIn: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  refetch: () => void;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
}>({
  isLoggedIn: false,
  isInitializing: true,
  login: (_email, _password) =>
    new Promise((resolve: (value: any) => any) => resolve),
  logout: () => null,
  refetch: () => null,
  changePassword: (_currentPassword, _newPassword) => null,
});

export const ProvideAuth = ({ children }: { children: any }) => {
  const authValue: any = useAuthProvider();
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const {
    authStore: { user, setUser, resetAuth, initAuth },
  } = useRootStore();
  const { toast } = useToast();
  const siteUrl =
    process?.env?.NODE_ENV === "production"
      ? process?.env?.NEXT_PUBLIC_DYNASTYU_URL
      : typeof window !== "undefined" && window?.location?.origin;

  const [getUser] = useGetUserLazyQuery();

  const login = async (email: string, password: string) => {
    try {
      let firebaseUser;
      firebaseUser = await FirebaseSignIn(projectAuth, email, password);
      const dbUser = await getUser({
        variables: {
          where: {
            firebaseUid: firebaseUser?.user?.uid,
          },
        },
      });

      const permissionCount =
        dbUser?.data?.user?.role?.permissions?.length &&
        dbUser?.data?.user?.role?.permissions?.length > 0;
      const path = hasSideBarPermissions(
        sidebarItem,
        dbUser?.data?.user?.role?.permissions
      )[0];
      if (dbUser?.data?.user && dbUser?.data?.user?.coachProfile) {
        if (!dbUser?.data?.user?.coachProfile?.verified) {
          toast({
            title: "Access Denied",
            description: "Sorry, this user is not verified",
            variant: "destructive",
          });
        } else if (!permissionCount) {
          toast({
            title: "Access Denied",
            description:
              "Sorry, this user doesn't have permission to access the database",
            variant: "destructive",
          });
        } else {
          setUser(dbUser?.data?.user as User);
          window.location.href = `${siteUrl}/${path["path"]}`;
        }
      } else {
        toast({
          title: "Access Denied",
          description: "Sorry, you don't have to permission to the database",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      if ((error as FirebaseError).code === "auth/email-already-in-use") {
        toast({
          title: "Something went wrong.",
          description: "The email address is already in use!",
          variant: "destructive",
        });
        throw new Error("The email address is already in use!");
      }
      if ((error as FirebaseError).code === "auth/invalid-email") {
        toast({
          title: "Something went wrong.",
          description: "The email address is invalid!",
          variant: "destructive",
        });
        throw new Error("The email address is invalid!");
      }
      throw new Error(error as any);
    }
  };

  const logout = async () => {
    await signOut(projectAuth);
    resetAuth();
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const credential = EmailAuthProvider.credential(
        user.email as string,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    }
  };

  const refetch = async () => {
    const dbUser = await getUser({
      variables: { where: { firebaseUid: user.firebaseUid } },
    });
    setUser(dbUser.data?.user as User);
  };

  useEffect(() => {
    async function onAuthStateChangedCallback(user: FirebaseUser | null) {
      try {
        if (user !== null) {
          const token = await user.getIdTokenResult();
          await initAuth(token.token);
          const dbUser = await getUser({
            variables: { where: { firebaseUid: user?.uid } },
          });
          if (dbUser?.data?.user) {
            setIsInitializing(false);
            setIsLoggedIn(true);
            setUser(dbUser.data.user as User);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        setIsLoggedIn(false);
      } finally {
        setIsInitializing(false);
      }
    }
    onAuthStateChanged(projectAuth, onAuthStateChangedCallback);
    return () => {
      onAuthStateChanged(projectAuth, onAuthStateChangedCallback);
    };
  }, [getUser, initAuth, setUser]);

  return {
    isLoggedIn,
    login,
    logout,
    refetch,
    changePassword,
    isInitializing,
  };
}
