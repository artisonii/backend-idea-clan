const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { typeDefs } = require("./typeDefs/typeDefs");
const { resolvers } = require("./resolvers/resolvers");
const { errorWithStatusCode } = require("./utils/Error");
const { authorization } = require("./utils/authorization");
const PORT = process.env.PORT || 8080;

async function serverStart() {
  const app = express();

  app.use(cors());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authorization,
  });

  await server.start();

  server.applyMiddleware({ app: app });
  app.get("/", (req, res) => {
    res.send("server is running!");
  });

  app.listen(PORT, async () => {
    try {
      await connection;
      console.log("connect to mongodb");
    } catch (error) {
      console.log(error);
    }

    console.log("server is running");
  });
}
serverStart();
