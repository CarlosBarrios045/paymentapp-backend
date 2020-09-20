import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });
import "./database";

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;

    if (!token || token === "null")
      return {
        user: "",
      };

    if (token) {
      try {
        // Verify token of front end
        const user = await jwt.verify(token, process.env.SECRET);

        // Save user into request
        req.user = user;

        return {
          user,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
  cors: corsOptions,
});

server
  .listen({ port: process.env.PORT, host: process.env.HOST })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
