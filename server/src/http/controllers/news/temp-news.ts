// controllers/newsController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
    text: string;
}

interface NewsData {
    title: string;
    description: string;
    url: string;
    image: string;
    content: string;
    author: string;
    universityId: string; // Deve ser um ObjectId válido
}

export const getNews = async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    try {
        const decode = decodeURIComponent(request.params.text);
        const regex = new RegExp(decode, 'i');

        const news = await prisma.news.findMany({
            where: {
                university: {
                    name: {
                        contains: regex.source,
                        mode: 'insensitive',
                    },
                },
            },
        });
        reply.send(news.length !== 0 ? news : []);
    } catch (e) {
        reply.status(500).send({ error: "Erro ao buscar notícias: " + e });
    }
};

export const createNews = async (request: FastifyRequest<{ Body: NewsData }>, reply: FastifyReply) => {
    try {
        await prisma.news.create({
            data: {
                title: request.body.title,
                description: request.body.description,
                url: request.body.url,
                image: request.body.image,
                content: request.body.content,
                author: request.body.author,
                university: {
                    connect: { id: request.body.universityId },
                },
            },
        });
        reply.send({ msg: "Notícia adicionada com sucesso!" });
    } catch (e) {
        reply.status(500).send({ error: "Erro ao adicionar notícia: " + e });
    }
};
export const getNewsByLink = async (request: FastifyRequest<{ Params: { link: string } }>, reply: FastifyReply) => {
    try {
        // Decodificar o link para tratar caracteres especiais
        const decodedLink = decodeURIComponent(request.params.link);

        const news = await prisma.news.findUnique({
            where: {
                url: decodedLink,
            },
        });

        if (!news) {
            return reply.status(404).send({ error: "Notícia não encontrada" });
        }

        reply.send(news);
    } catch (e) {
        reply.status(500).send({ error: "Erro ao buscar notícia: " + e });
    }
};