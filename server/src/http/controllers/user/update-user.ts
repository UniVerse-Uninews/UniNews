import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../../../services/factories/make-update-use-case";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    passwordHash: z.string().min(6).optional(),
    role: z.string().optional()
  });

  const updateUserParamsSchema = z.object({
    userId: z.string(),
  });

  try {
    const { name, email, passwordHash, role } = updateUserBodySchema.parse(request.body);
    const { userId } = updateUserParamsSchema.parse(request.params);

    const updateUseCase = makeUpdateUserUseCase();
    const result = await updateUseCase.execute({ userId, name, email, passwordHash, });

    reply.status(200).send({ user: result.user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: "User not found" });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
