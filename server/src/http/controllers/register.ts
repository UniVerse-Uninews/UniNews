// register.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { makeRegisterUseCase } from "../../services/factories/make-register-use-case";
import dotenv from "dotenv";

import { UserAlreadyExistError } from '../../services/errors/user-already-exist-error';

dotenv.config();

const prisma = new PrismaClient();

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    passwordHash: z.string().min(6)
  });

  try {
    const { name, email, passwordHash } = registerBodySchema.parse(request.body);

    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ name, email, passwordHash });

    reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      reply.status(409).send({ message: error.message });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  } finally {
    await prisma.$disconnect();
  }
}
