import { FastifyInstance } from "fastify";
import { hashPassword, comparePassword, generateToken } from "../../services/auth";

const users: { email: string; password: string; firstName?: string; lastName?: string }[] = [];

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/signup", async (request, reply) => {
    const { firstName, lastName, email, password } = request.body as { firstName: string; lastName: string; email: string; password: string };

    if (users.find((user) => user.email === email)) {
      return reply.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    users.push({ firstName, lastName, email, password: hashedPassword });

    return reply.send({ message: "User registered successfully" });
  });

  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    const user = users.find((user) => user.email === email);

    if (!user || !(await comparePassword(password, user.password))) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const token = generateToken(email);
    return reply.send({ token });
  });
}
