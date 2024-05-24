import { FastifyRequest, FastifyReply } from 'fastify';

export function verifyUserRole(roleToVerify: 'ADMIN' | 'USER') {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        console.log('Request user:', request.user);
        console.log('Role to verify:', roleToVerify);

        if (!request.user || !request.user.role) {
            console.error('User or role not available:', request.user);
            reply.status(401).send({ message: 'Unauthorized' });
            return;
        }

        const { role } = request.user;

        if (role !== roleToVerify) {
            console.error('Role mismatch. Expected:', roleToVerify, 'Actual:', role);
            reply.status(403).send({ message: 'Forbidden' });
            return;
        }

        console.log('Role authorized:', role);
        reply.status(200).send({ message: 'Authorized' });
    };
}
