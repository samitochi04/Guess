import { FastifyInstance } from "fastify";
import { hashPassword, comparePassword, generateToken, verifyToken } from "../../services/auth";

export default async function authRoutes(fastify: FastifyInstance) {
  // Fake in-memory user database (Replace with real database)
  const users: { email: string; password: string }[] = [];

  // Public route: Signup
  fastify.post("/signup", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return reply.code(400).send({ error: "User already exists" });
    }

    // Hash password and store user
    const hashedPassword = await hashPassword(password);
    users.push({ email, password: hashedPassword });

    return reply.send({ message: "User registered successfully" });
  });

  // Public route: Login
  fastify.post("/login", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };

    // Find user in the database
    const user = users.find((u) => u.email === email);
    if (!user) {
      return reply.code(400).send({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return reply.code(400).send({ error: "Invalid email or password" });
    }

    // Generate and send token
    const token = generateToken(email);
    return reply.send({ token });
  });

  // Protected route: Get user profile
  fastify.get("/profile", { preHandler: verifyToken }, async (req, reply) => {
    if (!req.user) {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    return reply.send({ message: "Welcome to your profile!", user: req.user });
  });
}
