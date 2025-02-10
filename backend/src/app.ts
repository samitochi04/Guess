import Fastify from "fastify";
import authRoutes from "./api/auth";

const fastify = Fastify({ logger: true });

fastify.register(authRoutes, { prefix: "/api/auth" });

export default fastify;
