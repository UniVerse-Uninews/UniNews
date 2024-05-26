import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";

export async function getAllUsersController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository(); 
    const allUsers = await usersRepository.findAll();
    reply.status(200).send(allUsers);
  } catch (error) {
    console.error("Error retrieving all users:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}