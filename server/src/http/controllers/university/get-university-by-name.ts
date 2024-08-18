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
    const universities = await universityRepository.findByName(request.params.name);
    if (universities.length > 0) {
      reply.status(200).send(universities);
    } else {
      reply.status(404).send({ error: 'No universities found' });
    }
  } catch (error) {
    console.error('Error retrieving universities by name:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}
