import { FastifyRequest, FastifyReply } from 'fastify';
import { GetRSSFeedUseCase } from '../../../services/news/get-rss-feed';

export async function getRSSFeed(req: FastifyRequest, reply: FastifyReply) {
    const { text } = req.params as { text: string };
    try {
      const rss = await new GetRSSFeedUseCase().execute(text);
      reply.send(rss);
    } catch (error: any) {
      reply.send({ error: `Failed to parse RSS feed: ${error.message}` });
    }
}