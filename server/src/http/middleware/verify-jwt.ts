import { FastifyRequest, FastifyReply } from 'fastify';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    // If jwtVerify succeeds, the user data should be attached to request.user
    console.log('User:', request.user);
    // Continue to the next middleware or route handler
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' });
  }
}
