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

        // Função para associar o ID da universidade às notícias
        const associateUniversity = (newsItem: any): any => {
            console.log('Processing news item:', newsItem);  // Log da notícia atual
            let matchedUniversityId: string | null = null;

            allUniversities.forEach((university) => {
                console.log(`Checking university: ${university.name}`);  // Log da universidade sendo verificada
                
                // Normalizando para facilitar a comparação
                const universityName = university.name.toLowerCase();
                const titleMatch = newsItem.title.toLowerCase().includes(universityName);
                const descriptionMatch = newsItem.description.toLowerCase().includes(universityName);
                
                if (titleMatch || descriptionMatch) {
                    console.log(`Match found! University ID: ${university.id}`);  // Log quando há uma correspondência
                    matchedUniversityId = university.id;
                }
            });

            if (matchedUniversityId) {
                return { ...newsItem, universityId: matchedUniversityId };
            } else {
                console.log('Erro: universityId não encontrado para esta notícia.', newsItem); // Log de erro se não houver correspondência
                return newsItem; // Retorna o item de notícia sem o ID da universidade
            }
        };

        // Associa o ID da universidade às notícias, se houver correspondência
        const newsWithUniversities = rss.items.map(associateUniversity);

        reply.send({ items: newsWithUniversities, total: rss.items.length });
    } catch (e: any) {
        reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
    }
};
