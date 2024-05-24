import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUniversityRepository } from '../../repositories/prisma/prisma-university-repository';
import { GetUniversityUseCase } from "../../services/get-university";
import { ResourceNotFoundError } from "../../services/errors/resource-not-found-error";

export async function getUniversityController(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
        const universityRepository = new PrismaUniversityRepository();
        const getUniversityUseCase = new GetUniversityUseCase(universityRepository);
        const university = await getUniversityUseCase.execute({ universityId: id });
        reply.status(200).send(university);
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            reply.status(404).send({ error: "University not found" });
        } else {
            console.error("Error retrieving university:", error);
            reply.status(500).send({ error: "Internal Server Error" });
        }
    }
}