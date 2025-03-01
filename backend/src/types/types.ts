import { PrismaClient } from "@prisma/client";

export interface UserInput {
  email?: string;
  password?: string;
  name?: string;
  active?: boolean;
  role?: "ADMIN" | "USER";
  refreshToken?: string;
}

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
  role: string | null;
}

export interface userPayload {
  userId: string;
  role: string;
}
