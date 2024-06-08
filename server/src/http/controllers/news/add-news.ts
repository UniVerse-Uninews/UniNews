import { AddNewsUseCase } from "../../../services/news/add-news";
import { FastifyRequest, FastifyReply } from "fastify";

export async function addNews(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await new AddNewsUseCase().execute(req.body);
    reply.send({ msg: 'News added!' });
  } catch (error: unknown) {
    reply.send({ error: `Failed to add news: ${(error as Error).message}` });
  }
}