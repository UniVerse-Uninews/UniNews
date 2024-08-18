import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "process";
import fastifyCookie from "@fastify/cookie";
import { verifyJwt } from "../src/http/middleware/verify-jwt"

// Import custom typings to extend FastifyInstance
import './@types/fastify-jwt.d.ts';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET as string,
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },
    sign: {
        expiresIn: "1h"
    }
});

app.register(fastifyCookie);
app.register(cors);

app.decorate("verifyJwt", verifyJwt);

app.register(appRoutes);


