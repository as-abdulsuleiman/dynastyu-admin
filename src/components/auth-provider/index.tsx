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

export function AuthProvider({ children }: AuthProviderProps) {
  const apolloClient = initializeApollo();

  return (
    <ApolloProvider client={apolloClient}>
      <RootStoreProvider>
        <ThemeProvider>
          <ProvideAuth>{children}</ProvideAuth>
        </ThemeProvider>
      </RootStoreProvider>
    </ApolloProvider>
  );
}
