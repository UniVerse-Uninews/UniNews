import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "../../services/delete-user";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    const { id } = request.body as { id: string };

    const user = await deleteUserUseCase.execute({ id });

    reply.status(200).send(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}