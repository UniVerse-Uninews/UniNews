import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveNewsToDatabase = async (userId: string, newsData: any) => {


  const news = {
    link: newsData.link, 
    title: newsData.title,
    description: newsData.description,
    image: newsData.image || '', 
    author: newsData.author,
    published: new Date(newsData.published),
    created: new Date(newsData.created),
    category: newsData.category || [], 
    enclosures: newsData.enclosures || [],
    media: newsData.media || {},
  };

  try {
    
    const existingSave = await prisma.savedNews.findFirst({
      where: {
        userId: userId,
        newsUrl: news.link,
      },
    });

    if (existingSave) {
      console.log('Notícia já salva para este usuário.');
      return; 
    }

    await prisma.news.upsert({
      where: { link: news.link },
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
      where: { userId_newsUrl: { userId, newsUrl: news.link } }, 
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


export const getSavedNewsByUser = async (userId: string) => {
  try {
    return prisma.savedNews.findMany({
      where: { userId },
      include: { news: true }, 
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

export async function getSavedNewsByUserId(userId: string) {
  try {
    const savedNews = await prisma.savedNews.findMany({
      where: { userId },
      include: { news: true } 
    });
    console.log('Saved news:', savedNews);
    return savedNews; 
  } catch (error) {
    console.error('Error fetching saved news from database:', error);
    throw error; 
  }
}

export async function removeNewsFromDatabase(userId: string, newsUrl: string) {
  try {
      console.log(`Removing news for userId: ${userId} and newsUrl: ${newsUrl}`);

      const result = await prisma.savedNews.deleteMany({
          where: {
              userId: userId,
              newsUrl: newsUrl,
          },
      });

      if (result.count > 0) {
          console.log('Notícia removida com sucesso.');
      } else {
          console.log('Nenhuma notícia encontrada para remover.');
      }
  } catch (error) {
      console.error('Erro ao remover notícia:', error);
      throw new Error('Erro ao remover notícia');
  }
}

export const unfollowUniversity = async (userId: string, universityId: string) => {
  return await prisma.follow.deleteMany({
    where: {
      userId,
      universityId,
    },
  });
};

export const getFollowedUniversitiesByUser = async (userId: string) => {
  try {
    const followedUniversities = await prisma.follow.findMany({
      where: {
        userId: userId
      },
      include: {
        university: true  
      }
    });

    return followedUniversities.map(follow => follow.university);
  } catch (error) {
    throw new Error('Erro ao buscar universidades seguidas pelo usuário.');
  }
};