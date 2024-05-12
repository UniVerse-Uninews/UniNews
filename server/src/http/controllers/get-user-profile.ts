import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../../services/get-user-profile";
import { ResourceNotFoundError } from "../../services/errors/resource-not-found-error";

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as { userId: string };

  try {
    const usersRepository = new PrismaUsersRepository(); // Instantiate your repository here
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    const userProfile = await getUserProfileUseCase.execute({ userId });
    reply.status(200).send(userProfile);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: "User not found" });
    } else {
      console.error("Error retrieving user profile:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
