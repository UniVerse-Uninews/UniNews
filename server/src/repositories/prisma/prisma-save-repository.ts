import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const followUniversity = async (userId: string, universityId: string) => {
  return prisma.follow.create({
    data: {
      userId,
      universityId,
    },
  });
};

export const saveNewsArticle = async (userId: string, newsId: string) => {
  const existingSavedNews = await prisma.savedNews.findUnique({
      where: {
          userId_newsId: {
              userId,
              newsId
          }
      }
  });

  if (existingSavedNews) {
      return { message: 'News already saved' };
  }

  return prisma.savedNews.create({
      data: {
          userId,
          newsId
      }
  });
};


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

export async function findNewsByUrl(url: string) {
  try {
    const news = await prisma.news.findUnique({
      where: {
        url: url
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

// src/repositories/prisma/prisma-save-repository.ts
export const getNewsByUrl = async (url: string) => {
  console.log('Fetching news with URL:', url); 
  if (!url) {
      throw new Error('URL is required');
  }

  try {
      const news = await prisma.news.findUnique({
          where: {
              url: url, 
          },
      });
      return news;
  } catch (error) {
      console.error('Error fetching news by URL:', error);
      throw error;
  }
};
