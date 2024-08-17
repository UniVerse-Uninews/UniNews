import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUniversityRepository } from '../../../repositories/prisma/prisma-university-repository';

interface Params {
  name: string;
}

export async function getUniversityByNameController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const university = await universityRepository.findByName(request.params.name);
    if (university) {
      reply.status(200).send(university);
    } else {
      reply.status(404).send({ error: 'University not found' });
    }
  } catch (error) {
    console.error('Error retrieving university by name:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}
