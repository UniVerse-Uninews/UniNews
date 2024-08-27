import '@fastify/jwt'
import { FastifyInstance } from 'fastify';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            sub: string;
            role : 'ADMIN' | 'USER';
            id: string;
        }
    }
}

declare module 'fastify' {
    interface FastifyRequest {
        verifyJwt: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}