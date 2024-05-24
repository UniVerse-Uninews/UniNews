import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "process";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET as string,
})

app.register(cors);



app.register(appRoutes);