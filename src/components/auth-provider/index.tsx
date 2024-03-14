/** @format */

"use client";

import { RootStoreProvider } from "@/mobx";
import { initializeApollo } from "@/services/graphql/config";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "../theme-provider";
import { ProvideAuth } from "@/hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const apolloClient = initializeApollo();

  return (
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <RootStoreProvider>
          <ProvideAuth>{children}</ProvideAuth>
        </RootStoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default AuthProvider;
