"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/prisma/prisma-save-repository.ts
var prisma_save_repository_exports = {};
__export(prisma_save_repository_exports, {
  findNewsByUrl: () => findNewsByUrl,
  followUniversity: () => followUniversity,
  getFollowedUniversitiesByUser: () => getFollowedUniversitiesByUser,
  getNewsByUrl: () => getNewsByUrl,
  getSavedNewsByUser: () => getSavedNewsByUser,
  getSavedNewsByUserId: () => getSavedNewsByUserId,
  removeNewsFromDatabase: () => removeNewsFromDatabase,
  saveNewsToDatabase: () => saveNewsToDatabase,
  unfollowUniversity: () => unfollowUniversity
});
module.exports = __toCommonJS(prisma_save_repository_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var saveNewsToDatabase = async (userId, newsData) => {
  const news = {
    link: newsData.link,
    title: newsData.title,
    description: newsData.description,
    image: newsData.image || "",
    author: newsData.author,
    published: new Date(newsData.published),
    created: new Date(newsData.created),
    category: newsData.category || [],
    enclosures: newsData.enclosures || [],
    media: newsData.media || {}
  };
  try {
    const existingSave = await prisma.savedNews.findFirst({
      where: {
        userId,
        newsUrl: news.link
      }
    });
    if (existingSave) {
      console.log("Not\xEDcia j\xE1 salva para este usu\xE1rio.");
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
        media: news.media
      },
      create: news
    });
    await prisma.savedNews.upsert({
      where: { userId_newsUrl: { userId, newsUrl: news.link } },
      update: {},
      create: {
        userId,
        newsUrl: news.link
      }
    });
  } catch (error) {
    console.error("Error saving news:", error);
    throw new Error("Error saving news");
  }
};
var followUniversity = async (userId, universityId) => {
  return prisma.follow.create({
    data: {
      userId,
      universityId
    }
  });
};
var getSavedNewsByUser = async (userId) => {
  try {
    return prisma.savedNews.findMany({
      where: { userId },
      include: { news: true }
    });
  } catch (error) {
    console.error("Error fetching saved news:", error);
    throw new Error("Error fetching saved news.");
  }
};
async function findNewsByUrl(link) {
  try {
    const news = await prisma.news.findUnique({
      where: {
        link
      }
    });
    if (news) {
      console.log("Not\xEDcia encontrada:", news);
      return news;
    } else {
      console.log("Nenhuma not\xEDcia encontrada com essa URL.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar not\xEDcia:", error);
    throw new Error("Erro ao buscar not\xEDcia.");
  }
}
var getNewsByUrl = async (link) => {
  console.log("Fetching news with URL:", link);
  if (!link) {
    throw new Error("URL is required");
  }
  try {
    const news = await prisma.news.findUnique({
      where: {
        link
      }
    });
    return news;
  } catch (error) {
    console.error("Error fetching news by URL:", error);
    throw error;
  }
};
async function getSavedNewsByUserId(userId) {
  try {
    const savedNews = await prisma.savedNews.findMany({
      where: { userId },
      include: { news: true }
    });
    console.log("Saved news:", savedNews);
    return savedNews;
  } catch (error) {
    console.error("Error fetching saved news from database:", error);
    throw error;
  }
}
async function removeNewsFromDatabase(userId, newsUrl) {
  try {
    console.log(`Removing news for userId: ${userId} and newsUrl: ${newsUrl}`);
    const result = await prisma.savedNews.deleteMany({
      where: {
        userId,
        newsUrl
      }
    });
    if (result.count > 0) {
      console.log("Not\xEDcia removida com sucesso.");
    } else {
      console.log("Nenhuma not\xEDcia encontrada para remover.");
    }
  } catch (error) {
    console.error("Erro ao remover not\xEDcia:", error);
    throw new Error("Erro ao remover not\xEDcia");
  }
}
var unfollowUniversity = async (userId, universityId) => {
  return await prisma.follow.deleteMany({
    where: {
      userId,
      universityId
    }
  });
};
var getFollowedUniversitiesByUser = async (userId) => {
  try {
    const followedUniversities = await prisma.follow.findMany({
      where: {
        userId
      },
      include: {
        university: true
      }
    });
    return followedUniversities.map((follow) => follow.university);
  } catch (error) {
    throw new Error("Erro ao buscar universidades seguidas pelo usu\xE1rio.");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findNewsByUrl,
  followUniversity,
  getFollowedUniversitiesByUser,
  getNewsByUrl,
  getSavedNewsByUser,
  getSavedNewsByUserId,
  removeNewsFromDatabase,
  saveNewsToDatabase,
  unfollowUniversity
});
