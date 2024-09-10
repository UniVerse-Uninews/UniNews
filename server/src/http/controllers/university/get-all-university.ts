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

export async function getAllUniversityWithPaginationController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const universityRepository = new PrismaUniversityRepository();

    const { page = 1, limit = 6 } = request.query as { page?: number; limit?: number };
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);

    const offset = (pageNumber - 1) * limitNumber;

    const allUniversities = await universityRepository.findAllPaginated(offset, limitNumber);

    reply.status(200).send({ universities: allUniversities, page: pageNumber });
  } catch (error) {
    console.error("Error retrieving universities:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}