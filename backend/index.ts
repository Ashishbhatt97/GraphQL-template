import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import http from "http";
import { decodeToken } from "./src/common/services/passport.services";
import { prisma } from "./src/common/services/prisma.services";
import { userResolvers, userTypeDefs } from "./src/GraphQL";
import { Context, userPayload } from "./src/types/types";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Enable JSON parsing with a limit of 50mb
app.use(json({ limit: "50mb" }));

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
  })
);

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const initServer = async () => {
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return { prisma, userId: null, role: null };
        }

        const token = authHeader.split(" ")[1];

        const userPayload = decodeToken(token);
        if (!userPayload) {
          return { prisma, userId: null, role: null };
        }

        const userId = (userPayload as userPayload).userId;
        const role = (userPayload as userPayload).role;
        return { prisma, userId, role };
      },
    })
  );

  // Start the HTTP server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
};

// Initialize the server
initServer().catch((error) => {
  console.error("Failed to start server:", error);
});
