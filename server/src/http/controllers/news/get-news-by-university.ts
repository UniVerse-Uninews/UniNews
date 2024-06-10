import { GetNewsByUniversityUseCase } from '@/services/news/get-news-by-university ';
import { FastifyRequest, FastifyReply } from 'fastify';


export async function getNewsByUniversity(req: FastifyRequest, reply: FastifyReply) {
    const { text } = req.params as { text: string };
    const decode = decodeURIComponent(text);
    const regex = new RegExp(decode, 'i');

    try {
      const news = await new GetNewsByUniversityUseCase().execute(regex);
      reply.send(news.length ? news : null);
    } catch (error: any) {
      reply.send({ error: `Failed to get news: ${error.message}` });
    }
  }