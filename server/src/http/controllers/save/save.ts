import { FastifyRequest, FastifyReply } from 'fastify';
import { followUniversity, saveNewsArticle, getSavedNews, getNewsByUrl  } from '../../../repositories/prisma/prisma-save-repository';

export const followUniversityHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, universityId } = request.body as { userId: string; universityId: string };

  try {
    const follow = await followUniversity(userId, universityId);
    return reply.send(follow);
  } catch (error) {
    console.error('Error following university:', error);
    return reply.status(500).send({ error: 'Unable to follow university' });
  }
};

export const saveNewsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, newsId } = request.body as { userId: string; newsId: string };

  if (!userId || !newsId) {
      return reply.status(400).send({ error: 'User ID and News ID are required' });
  }

  try {
      const result = await saveNewsArticle(userId, newsId);
      console.log('Saved news:', result);
      return reply.send(result);
  } catch (error: any) {
      if (error.code === 'P2002') {
          return reply.status(400).send({ error: 'News is already saved' });
      }
      console.error('Error saving news:', error);
      return reply.status(500).send({ error: 'Unable to save news' });
  }
};

export async function getSavedNewsHandler(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
  const userId = request.params.userId; 
  try {
    const savedNews = await getSavedNews(userId);
    if (savedNews.length > 0) {
      reply.send({ savedNews });
    } else {
      reply.status(404).send({ message: 'No saved news found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching saved news:', error);
    reply.status(500).send({ message: 'Internal server error' });
  }
}

export const getNewsByUrlController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { url } = request.params as { url: string };
  console.log('URL:', url);
  try {
    const decodedUrl = decodeURIComponent(url);
    console.log('Decoded URL:', decodedUrl);
    const news = await getNewsByUrl(decodedUrl);
    if (news) {
      reply.send(news);
    } else {
      reply.status(404).send({ message: 'News not found' });
    }
  } catch (error) {
    console.error('Error fetching news by URL:', error);
    reply.status(500).send({ message: 'Error fetching news' });
  }
};
