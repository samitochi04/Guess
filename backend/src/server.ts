import fastify from "./app";

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
