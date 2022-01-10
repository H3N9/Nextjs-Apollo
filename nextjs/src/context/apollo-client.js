import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = "http://localhost:3001/graphql";

console.log("create new?");
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
