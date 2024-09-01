import { FastifyRequest, FastifyReply } from 'fastify';
import { followUniversity, getSavedNews, findNewsByUrl, saveNewsToDatabase, getSavedNewsByUser   } from '../../../repositories/prisma/prisma-save-repository';


interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  published: number; // Assuming this is a timestamp
  created: number; // Assuming this is a timestamp
  category: string[];
  enclosures?: any[];
  media?: any;
}

interface SaveNewsRequestBody {
  userId: string;
  news: {
    id: string;
    title: string;
    description: string;
    author: string;
    published: number;
    created: number;
    category: string[];
    enclosures?: any[];
    media?: any;
  };
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


export async function saveNewsHandler(request: FastifyRequest, reply: FastifyReply) {
  const { userId, news } = request.body as { userId: string; news: any };

  if (!userId || !news || !news.link) { // Check for 'link' field
      return reply.status(400).send({ error: 'Missing required fields' });
  }

  // Assume the university URL is provided elsewhere and not in the news item
  const universityUrl = ''; // You need to determine how to get this

  const newsData = {
      link: news.link, // Use 'link' instead of 'url'
      title: news.title,
      description: news.description,
      image: news.image || '', // Extract image if available
      author: news.author,
      published: new Date(news.published),
      created: new Date(news.created),
      category: news.category,
      enclosures: news.enclosures || [],
      media: news.media || {},
      universityId: universityUrl // Replace with correct universityId based on URL
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

// export const getNewsByUrlController = async (request: FastifyRequest, reply: FastifyReply) => {
//   const { url } = request.params as { url: string };
//   console.log('URL:', url);
//   try {
//     const decodedUrl = decodeURIComponent(url);
//     console.log('Decoded URL:', decodedUrl);
//     const news = await getNewsByUrl(decodedUrl);
//     if (news) {
//       reply.send(news);
//     } else {
//       reply.status(404).send({ message: 'News not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching news by URL:', error);
//     reply.status(500).send({ message: 'Error fetching news' });
//   }
// };


