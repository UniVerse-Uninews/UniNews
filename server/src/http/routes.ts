import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { hello: "world" };
    });
    app.post("/users", register);
  }