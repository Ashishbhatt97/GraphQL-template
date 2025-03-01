import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
