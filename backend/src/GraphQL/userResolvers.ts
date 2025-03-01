import { PrismaClient, User } from "@prisma/client";
import { generateToken } from "../common/services/passport.services";
import bcrypt from "bcryptjs";
import { UserInput } from "../types/types";
import roleAuth from "../common/middlwares/roleAuth.middleware";

export const userResolvers = {
  Query: {
    me: async (
      _,
      __,
      { userId, prisma }: { userId: string; prisma: PrismaClient }
    ) => {
      
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      const { password, ...result } = user;
      return result;
    },
    getUser: async (
      _,
      { id }: { id: string },
      { prisma }: { prisma: PrismaClient }
    ) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const { password, ...result } = user;
      return result;
    },
  },

  Mutation: {
    createUser: async (
      _,
      {
        email,
        password,
        name,
      }: { email: string; password: string; name: string },
      { prisma }: { prisma: PrismaClient }
    ) => {
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          role: "USER",
          password: hashedPassword,
        },
      });

      const { password: userPassword, ...result } = user;
      return result;
    },
    login: async (
      _,
      { email, password }: { email: string; password: string },
      { prisma }: { prisma: PrismaClient }
    ) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: token.refreshToken },
      });

      return token;
    },

    refreshToken: async (
      _,
      { refreshToken }: { refreshToken: string },
      { prisma }: { prisma: PrismaClient }
    ) => {
      const user = await prisma.user.findFirst({
        where: { refreshToken },
      });

      if (!user) {
        throw new Error("Invalid refresh token");
      }

      const token = generateToken(user);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: token.refreshToken },
      });

      return token;
    },

    updateUser: async (
      _,
      { user }: { user: UserInput },
      { userId, prisma }: { userId: string; prisma: PrismaClient }
    ) => {
      const userResponse = await prisma.user.update({
        where: { id: userId },
        data: { ...user },
      });

      const { password, ...result } = userResponse;
      return result;
    },
    logout: async (
      _,
      __,
      { userId, prisma }: { userId: string; prisma: PrismaClient }
    ) => {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
      return true;
    },
    deleteUser: async (
      _,
      __,
      { userId, prisma }: { userId: string; prisma: PrismaClient }
    ) => {
      await prisma.user.delete({
        where: { id: userId },
      });
      return true;
    },
  },
};
