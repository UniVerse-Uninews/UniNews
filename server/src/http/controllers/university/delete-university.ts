import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUniversityRepository } from '../../../repositories/prisma/prisma-university-repository';
import { DeleteUniversityUseCase } from '../../../services/university/delete-university';

export async function deleteUniversityController(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    console.log("controller id: ", id);
    try {
        const universityRepository = new PrismaUniversityRepository();
        const deleteUniversityUseCase = new DeleteUniversityUseCase(universityRepository);
        const university = await deleteUniversityUseCase.execute({ universityId: id });
        reply.status(200).send(university);
    } catch (error) {
        console.error("Error deleting university:", error);
        reply.status(500).send({ error: "Internal Server Error" });
    }
}