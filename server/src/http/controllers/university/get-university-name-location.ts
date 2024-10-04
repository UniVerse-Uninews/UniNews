import { FastifyRequest, FastifyReply } from 'fastify';
import { getStatesByCountry, getUniversitiesByState } from '../../../repositories/prisma/prisma-university-repository';

// Retorna os estados com base no país
export async function getStatesByCountryHandler(request: FastifyRequest, reply: FastifyReply) {
  const { country } = request.query as { country: string };
  
  try {
    const states = await getStatesByCountry(country);
    reply.send({ states });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao buscar estados' });
  }
}

// Retorna as universidades com base no estado
export async function getUniversitiesByStateHandler(request: FastifyRequest, reply: FastifyReply) {
  const { state } = request.query as { state: string };
  
  try {
    const universities = await getUniversitiesByState(state);
    reply.send({ universities });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao buscar universidades' });
  }
}
