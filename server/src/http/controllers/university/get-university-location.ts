import { FastifyRequest, FastifyReply } from 'fastify';
import { getUniversitiesByLocation } from '../../../repositories/prisma/prisma-university-repository';

export const getUniversitiesByLocationHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const { location } = req.query as { location: string };
    
    try {
        const universities = await getUniversitiesByLocation(location);
        reply.send(universities);
    } catch (error) {
        reply.status(500).send({ message: `Error fetching universities for location ${location}` });
    }
};