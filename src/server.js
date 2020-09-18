import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
