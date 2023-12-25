/** @format */

"use client";

import { RootStoreProvider } from "@/mobx";
import { initializeApollo } from "@/services/graphql/config";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "../theme-provider";
import { ProvideAuth } from "@/hooks/useAuth";
import { observer } from "mobx-react-lite";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const apolloClient = initializeApollo();

  return (
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <RootStoreProvider>
          <ProvideAuth>
            <div className="w-full mx-auto h-screen min-h-screen">
              <main className="w-full">{children}</main>
            </div>
          </ProvideAuth>
        </RootStoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default observer(AuthProvider);
