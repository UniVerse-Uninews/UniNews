import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeUpdateUniversityUseCase } from '../../services/factories/make-update-university-use-case';
import { ResourceNotFoundError } from '../../services/errors/resource-not-found-error';

export async function updateUniversityController(request: FastifyRequest, reply: FastifyReply) {
  const updateUniversityBodySchema = z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    url: z.string().optional(),
    description: z.string().optional(),
  });

  const updateUniversityParamsSchema = z.object({
    universityId: z.string(),
  });

  try {
    const { name, location, url, description } = updateUniversityBodySchema.parse(request.body);
    const { universityId } = updateUniversityParamsSchema.parse(request.params);

    const updateUseCase = makeUpdateUniversityUseCase();
    const result = await updateUseCase.execute({ universityId, name, location, url, description });

    reply.status(200).send({ university: result.university });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: 'University not found' });
    } else {
      console.error('Internal server error:', error);
      reply.status(500).send({ message: 'Internal server error' });
    }
  }
}