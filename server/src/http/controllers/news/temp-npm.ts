// controllers/npmController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { parse } from 'rss-to-json';

export const getNpmData = async (request: FastifyRequest<{ Params: { text: string } }>, reply: FastifyReply): Promise<void> => {
    try {
        const rssUrl = (request.params as { text: string }).text;
        const rss = await parse(rssUrl);
        reply.send(rss);
    } catch (e: any) {
        reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
    }
};
