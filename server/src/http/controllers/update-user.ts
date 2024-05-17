import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../../services/factories/make-update-use-case";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    passwordHash: z.string().min(6).optional(),
    role: z.boolean().optional()
  });

  try {
    const { name, email, passwordHash, role } = updateUserBodySchema.parse(request.body);
    const { userId } = request.params as { userId: string };


    const updateUseCase = makeUpdateUserUseCase();
    await updateUseCase.execute({ userId, name, email, passwordHash, role });

    reply.status(200).send();
  } catch (error) {
    console.error("Internal server error:", error);
    reply.status(500).send({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
