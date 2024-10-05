import { FastifyReply, FastifyRequest } from 'fastify';
import { parse } from 'rss-to-json';
import { PrismaUniversityRepository } from '../../../repositories/prisma/prisma-university-repository';

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
export const getNpmDataWithoutLimit = async (
    request: FastifyRequest<{ Params: { text: string } }>,
    reply: FastifyReply
  ): Promise<void> => {
    try {
      const rssUrl = request.params.text;
  
      const rss = await parse(rssUrl);
  
      const universityRepository = new PrismaUniversityRepository();
      const allUniversities = await universityRepository.findAll();
  
      const associateUniversity = (newsItem: any) => {
        const matchedUniversity = allUniversities.find((university) =>
          newsItem.title.includes(university.name) || newsItem.description.includes(university.name)
        );
        return matchedUniversity ? { ...newsItem, universityId: matchedUniversity.id } : newsItem;
      };
  
      // Associa o ID da universidade às notícias, se houver correspondência
      const newsWithUniversities = rss.items.map(associateUniversity);
  
      reply.send({ items: newsWithUniversities, total: rss.items.length });
    } catch (e: any) {
      reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
    }
  };