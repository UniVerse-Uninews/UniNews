import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cors from "@fastify/cors";

export const app = fastify();

app.register(cors);



app.register(appRoutes);