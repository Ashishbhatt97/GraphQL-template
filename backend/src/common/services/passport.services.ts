import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "./prisma.services";
import { User } from "@prisma/client";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const generateToken = (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1m",
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const token = { accessToken, refreshToken };
  return token;
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    ) as JwtPayload & { userId: string };

    if (!decoded) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return null;
    }

    const accessToken: string = jwt.sign(
      { userId: user["id"], role: user["role"] },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "1m",
      }
    );

    return accessToken;
  } catch (error) {
    return null;
  }
};
