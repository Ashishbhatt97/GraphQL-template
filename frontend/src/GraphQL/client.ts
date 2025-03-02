import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN_MUTATION } from "./authQueries";

const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API;

const getAccessToken = (): string | null =>
  localStorage.getItem("access_token");
const getRefreshToken = (): string | null =>
  localStorage.getItem("refresh_token");

const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const decoded: { exp: number } = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) throw new Error("No refresh token available");

    const response = await fetch(GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: REFRESH_TOKEN_MUTATION.loc?.source.body,
        variables: { refreshToken: refreshTokenValue },
      }),
    });

    const result = await response.json();

    if (result.data.refreshAccessToken) {
      localStorage.setItem(
        "access_token",
        result.data.refreshAccessToken.accessToken
      );
      localStorage.setItem(
        "refresh_token",
        result.data.refreshAccessToken.refreshToken
      );
    }

    throw new Error("No access token returned");
  } catch (error) {
    console.error("Error refreshing token:", error);
    window.location.reload();
    return null;
  }
};

const httpLink = createHttpLink({
  uri: GRAPHQL_API,
});

const authLink = setContext(async (_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message === "User not authenticated") {
        const accessToken = getAccessToken();

        if (!accessToken || isTokenExpired(accessToken)) {
          return new Promise(async (resolve, reject) => {
            const newToken = await refreshToken();
            if (newToken) {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newToken}`,
                },
              }));
              resolve(forward(operation));
            } else {
              reject(err);
            }
          });
        }
      }
    }
  }
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
