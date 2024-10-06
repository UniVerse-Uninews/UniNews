import { FastifyReply, FastifyRequest } from 'fastify';
import { parse } from 'rss-to-json';

export const getNpmData = async (request: FastifyRequest<{ Params: { text: string }; Querystring: { limit?: number; offset?: number } }>, reply: FastifyReply): Promise<void> => {
    try {
        const rssUrl = request.params.text;
        const { limit = 5, offset = 0 } = request.query; 
        
        const rss = await parse(rssUrl);

        const startIndex = Number(offset);
        const endIndex = startIndex + Number(limit);

        const limitedItems = rss.items.slice(startIndex, endIndex);

        reply.send({ items: limitedItems, total: rss.items.length });
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