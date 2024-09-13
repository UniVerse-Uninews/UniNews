import { FastifyRequest, FastifyReply } from 'fastify';
import { followUniversity, findNewsByUrl, saveNewsToDatabase, getSavedNewsByUser, getSavedNewsByUserId, removeNewsFromDatabase, unfollowUniversity, getFollowedUniversitiesByUser  } from '../../../repositories/prisma/prisma-save-repository';

interface GetSavedNewsQuery {
  userId: string;
}

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

export const getFollowedUniversitiesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.query as { userId: string };

  try {
    const followedUniversities = await getFollowedUniversitiesByUser(userId);

    if (followedUniversities.length === 0) {
      return reply.status(404).send({ message: 'Você não segue nenhuma universidade.' });
    }

    return reply.send(followedUniversities);
  } catch (error) {
    console.error('Error fetching followed universities:', error);
    return reply.status(500).send({ error: 'Erro ao buscar universidades seguidas.' });
  }
};


export async function saveNewsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { userId, news } = request.body as { userId: string; news: any };

  if (!userId || !news || !news.link) { 
      return reply.status(400).send({ error: 'Missing required fields' });
  }

  const universityUrl = '';

  const newsData = {
      link: news.link, 
      title: news.title,
      description: news.description,
      image: news.image || '', 
      author: news.author,
      published: new Date(news.published),
      created: new Date(news.created),
      category: news.category,
      enclosures: news.enclosures || [],
      media: news.media || {},
      universityId: universityUrl 
  };

  try {
      await saveNewsToDatabase(userId, newsData);
      reply.status(200).send({ message: 'News saved successfully' });
  } catch (error) {
      console.error('Error saving news:', error);
      reply.status(500).send({ error: 'Error saving news' });
  }
}



export const getNewsByUrlHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { url } = request.params as { url: string };

  try {
    const news = await findNewsByUrl(decodeURIComponent(url));

    if (!news) {
      reply.status(404).send({ message: 'News not found.' });
    } else {
      reply.send(news);
    }
  } catch (error: any) {
    reply.status(500).send({ message: error.message });
  }
};

export async function getSavedNewsHandler(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
  const userId = request.params.userId;

  try {
    const savedNews = await getSavedNewsByUser(userId);

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

export async function getSavedNewsByUserIdHandler(req: FastifyRequest<{ Querystring: GetSavedNewsQuery }>, reply: FastifyReply) {
  const userId = req.query.userId;

  if (!userId) {
    return reply.status(400).send({ error: 'User ID is required' });
  }

  try {
    const savedNews = await getSavedNewsByUserId(userId);
    if (!Array.isArray(savedNews)) {
      console.error('Saved news is not an array:', savedNews);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
    return reply.send({ savedNews });
  } catch (error) {
    console.error('Error fetching saved news:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export const removeNewsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, newsUrl } = request.body as { userId: string; newsUrl: string };


  if (typeof newsUrl !== 'string') {
      return reply.status(400).send({ error: 'newsUrl must be a string' });
  }

  if (!userId || !newsUrl) {
      return reply.status(400).send({ error: 'Missing required fields' });
  }

  try {
      await removeNewsFromDatabase(userId, newsUrl);
      return reply.status(200).send({ message: 'News removed successfully' });
  } catch (error) {
      console.error('Error removing news:', error);
      return reply.status(500).send({ error: 'Error removing news' });
  }
}

export const unfollowUniversityHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, universityId } = request.body as { userId: string; universityId: string };

  try {
    const unfollow = await unfollowUniversity(userId, universityId);
    return reply.send({ success: true, unfollow });
  } catch (error) {
    console.error('Error unfollowing university:', error);
    return reply.status(500).send({ error: 'Unable to unfollow university' });
  }
};

