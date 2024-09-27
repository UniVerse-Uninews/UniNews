import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllLocations } from '../../../repositories/prisma/prisma-university-repository';

export async function getAllLocationsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const locations = await getAllLocations();
    reply.send(locations);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao buscar localidades' });
  }
}
