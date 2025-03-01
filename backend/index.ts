import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userResolvers, userTypeDefs } from "./src/GraphQL";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { prisma } from "./src/common/services/prisma.services";
import dotenv from "dotenv";
import { decodeToken } from "./src/common/services/passport.services";

dotenv.config();

interface Context {
  prisma: PrismaClient;
  userId: string | null;
  role: string | null;
}

interface userPayload {
  userId: string;
  role: string;
}

const server = new ApolloServer<Context>({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
});

const initServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { prisma, userId: null, role: null };
      }

      let userId: string | null = null;
      let role: string | null = null;

      const token = authHeader.split(" ")[1];

      const userPayload = decodeToken(token);
      userId = (userPayload as userPayload).userId;
      role = (userPayload as userPayload).role;

      return { prisma, userId, role };
    },
  });
  console.log(`Server ready at: ${url}`);
};

initServer();
