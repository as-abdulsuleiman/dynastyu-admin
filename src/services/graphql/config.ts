import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    createHttpLink,
  } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
import { getToken } from "../token";
  
  const httpLink = createHttpLink({
    uri: "https://dynastyu-9de03.appspot.com/",
  });
  
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });
  
  let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
  
  const createApolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies:{
        User: {
          fields: {
            CoachProfile:{
              merge:true
            },
            UserCount: {
             merge:true
            },
          },
        },
      }
    }),
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  });
  
  export const initializeApollo = () => {
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") {
      return createApolloClient;
    }
  
    // Create the Apollo Client once in the client
    if (!apolloClient) {
      apolloClient = createApolloClient;
    }
  
    return apolloClient;
  };
  