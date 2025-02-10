import { fastifyCors } from "@fastify/cors";
import fastify from "./app";

const start = async () => {
  try {
    // Register CORS plugin with the Fastify instance
    fastify.register(fastifyCors, {
      origin: ["http://localhost:5173"], // Allow your frontend to make requests
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    });

    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
