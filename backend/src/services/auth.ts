import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { FastifyRequest, FastifyReply } from "fastify";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";

// Extend FastifyRequest to include 'user'
declare module "fastify" {
  interface FastifyRequest {
    user?: { email: string };
  }
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Generate JWT token
export const generateToken = (email: string): string => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

// Middleware to verify JWT token
export const verifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return reply.code(401).send({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (typeof decoded === "string" || !decoded.email) {
      return reply.code(401).send({ error: "Unauthorized: Invalid token format" });
    }

    req.user = { email: decoded.email }; // Attach user data to request
  } catch (error) {
    return reply.code(401).send({ error: "Unauthorized: Invalid token" });
  }
};
