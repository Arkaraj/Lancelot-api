import { ApolloServer } from "apollo-server-express";
import express from "express";
require("dotenv-save").config();
import { connection } from "./config/connection";
import { resolvers } from "./resolver";
import { typeDefs } from "./typeDefs";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await connection();
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  // Modified server startup
  app.listen({ port }, () => {
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath} 🚀 `
    );
  });
}

startApolloServer();
