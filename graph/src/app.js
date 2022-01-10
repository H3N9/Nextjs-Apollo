import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql";
import http from "http";
import "./monggose-connect";
import jwt from "express-jwt";

(async () => {
  const path = "/";
  const port = 3001;
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ user: req.user }),
  });
  app.use(
    path,
    jwt({
      secret: "h3n9",
      algorithms: ["HS256"],
      getToken: (req) => {
        if (req?.headers?.authorization?.split(" ")?.[0] === "Bearer") {
          return req?.headers?.authorization?.split(" ")?.[1];
        }
        return null;
      },
      credentialsRequired: false,
    }),
    (err, req, res, next) => {
      res.status(200).json({
        errors: [
          {
            message: err.message,
          },
        ],
      });
    }
  );
  await server.start();
  server.applyMiddleware({ app, path });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log("to the moon");
})();
