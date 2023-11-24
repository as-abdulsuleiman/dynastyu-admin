/** @format */

import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword as FirebaseSignIn,
  createUserWithEmailAndPassword as FirebaseCreateUser,
  signOut,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  User,
  UserCreateInput,
  useCreateOneUserMutation,
  useGetUserLazyQuery,
} from "@/services/graphql";
import { useRootStore } from "@/mobx";
import { projectAuth } from "@/services/firebase/config";
//   import { projectAuth } from "@services/firebase/config";
//   import { useRootStore } from "@mobx/index";
//   import {
//     User,
//     UserCreateInput,
//     useCreateOneUserMutation,
//     useGetUserLazyQuery,
//   } from "@services/graphql";

const AuthContext = createContext<{
  isLoggedIn?: boolean;
  isInitializing?: boolean;
  login?: (email: string, password: string) => Promise<void>;
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

  const [getUser] = useGetUserLazyQuery();

  const login = async (email: string, password: string) => {
    try {
      let firebaseUser;
      firebaseUser = await FirebaseSignIn(projectAuth, email, password);
      const dbUser = await getUser({
        variables: {
          where: {
            firebaseUid: firebaseUser?.user.uid,
          },
        },
      });
      if (!dbUser?.data?.user) {
        return (window.location.href = "http://localhost:3000/sign-in");
      } else {
        return setUser(dbUser?.data?.user as User);
      }
    } catch (error: unknown) {
      if ((error as FirebaseError).code === "auth/email-already-in-use") {
        throw new Error("That email address is already in use!");
      }
      if ((error as FirebaseError).code === "auth/invalid-email") {
        throw new Error("That email address is invalid!");
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

  async function onAuthStateChangedCallback(user: FirebaseUser | null) {
    try {
      if (user !== null) {
        const token = await user.getIdTokenResult();
        await initAuth(token.token);
        const dbUser = await getUser({
          variables: { where: { firebaseUid: user?.uid } },
        });
        if (dbUser?.data?.user) {
          setUser(dbUser.data.user as User);
          setIsLoggedIn(true);
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

  useEffect(() => {
    const subscriber = onAuthStateChanged(
      projectAuth,
      onAuthStateChangedCallback
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    isLoggedIn,
    login,
    logout,
    refetch,
    changePassword,
    isInitializing,
  };
}
