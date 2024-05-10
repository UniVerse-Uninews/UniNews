import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { UserAlreadyExistError } from "@/services/errors/user-already-exist-error ";
import { makeRegisterUseCase } from "@/services/factories/make-register-use-case ";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password_hash: z.string().min(6)
  });

  try {
    const { name, email, password_hash } = registerBodySchema.parse(request.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new UserAlreadyExistError();
    }

    const registerUseCase = makeRegisterUseCase();

    // Create the new user
    await prisma.user.create({ data: { name, email, password_hash }});

    await registerUseCase.execute({ name, email, password_hash });

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
