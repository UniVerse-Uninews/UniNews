import { FastifyReply, FastifyRequest } from 'fastify';
import { parse } from 'rss-to-json';

export const getNpmData = async (request: FastifyRequest<{ Params: { text: string }; Querystring: { limit?: number } }>, reply: FastifyReply): Promise<void> => {
    try {
        const rssUrl = request.params.text;
        const { limit = 5 } = request.query; 
        
        const rss = await parse(rssUrl);

        const limitedItems = rss.items.slice(0, limit);

        reply.send({ items: limitedItems });
    } catch (e: any) {
        reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
    }
};

export const getNpmDataWithoutLimit = async (request: FastifyRequest<{ Params: { text: string } }>, reply: FastifyReply): Promise<void> => {
    try {
        const rssUrl = (request.params as { text: string }).text;
        const rss = await parse(rssUrl);
        reply.send(rss);
    } catch (e: any) {
        reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
    }
};