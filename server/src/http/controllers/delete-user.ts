import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "../../services/delete-user";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    const { id } = request.params as { id: string };

    if (!id) {
      reply.status(400).send({ error: "ID parameter is missing" });
      return;
    }

    const user = await deleteUserUseCase.execute({ id });

    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }

    reply.status(200).send(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}