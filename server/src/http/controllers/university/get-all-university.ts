import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUniversityRepository } from "../../../repositories/prisma/prisma-university-repository";

export async function getAllUniversityController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const universityRepository = new PrismaUniversityRepository(); 
    const allUniversities = await universityRepository.findAll();
    reply.status(200).send(allUniversities);
  } catch (error) {
    console.error("Error retrieving all universities:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}