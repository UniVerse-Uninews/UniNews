import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveNewsToDatabase = async (userId: string, newsData: any) => {
  const news = {
    link: newsData.link, // Use 'link' as the primary key
    title: newsData.title,
    description: newsData.description,
    image: newsData.image || '', // Provide a default value if not available
    author: newsData.author,
    published: new Date(newsData.published),
    created: new Date(newsData.created),
    category: newsData.category || [], // Provide a default empty array if not available
    enclosures: newsData.enclosures || [],
    media: newsData.media || {},
  };

  try {
    await prisma.news.upsert({
      where: { link: news.link }, // Use 'link' as the identifier
      update: {
        title: news.title,
        description: news.description,
        image: news.image,
        author: news.author,
        published: news.published,
        created: news.created,
        category: news.category,
        enclosures: news.enclosures,
        media: news.media,
      },
      create: news,
    });

    await prisma.savedNews.upsert({
      where: { userId_newsUrl: { userId, newsUrl: news.link } }, // Adjust field names as necessary
      update: {},
      create: {
        userId,
        newsUrl: news.link,
      },
    });
  } catch (error) {
    console.error('Error saving news:', error);
    throw new Error('Error saving news');
  }
};



export const followUniversity = async (userId: string, universityId: string) => {
  return prisma.follow.create({
    data: {
      userId,
      universityId,
    },
  });
};

// export const saveNewsArticle = async (userId: string, newsId: string) => {
//   const existingSavedNews = await prisma.savedNews.findUnique({
//       where: {
//           userId_newsId: {
//               userId,
//               newsId
//           }
//       }
//   });

//   if (existingSavedNews) {
//       return { message: 'News already saved' };
//   }

//   return prisma.savedNews.create({
//       data: {
//           userId,
//           newsUrl: newsId
//       }
//   });
// };


export const getSavedNews = async (userId: string) => {
  try {
    const savedNews = await prisma.savedNews.findMany({
      where: { userId },
    });
    return savedNews;
  } catch (error) {
    console.error('Error fetching saved news:', error);
    throw error;
  }
};

export const getSavedNewsByUser = async (userId: string) => {
  try {
    return prisma.savedNews.findMany({
      where: { userId },
      include: { news: true }, // Include news details
    });
  } catch (error) {
    console.error('Error fetching saved news:', error);
    throw new Error('Error fetching saved news.');
  }
};

export async function findNewsByUrl(link: string) {
  try {
    const news = await prisma.news.findUnique({
      where: {
        link: link
      }
    });

    if (news) {
      console.log('Notícia encontrada:', news);
      return news;
    } else {
      console.log('Nenhuma notícia encontrada com essa URL.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    throw new Error('Erro ao buscar notícia.');
  }
}

export const getNewsByUrl = async (link: string) => {
  console.log('Fetching news with URL:', link); 
  if (!link) {
      throw new Error('URL is required');
  }

  try {
      const news = await prisma.news.findUnique({
          where: {
              link: link, 
          },
      });
      return news;
  } catch (error) {
      console.error('Error fetching news by URL:', error);
      throw error;
  }
};
