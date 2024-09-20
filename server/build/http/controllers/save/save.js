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

// src/http/controllers/save/save.ts
var save_exports = {};
__export(save_exports, {
  followUniversityHandler: () => followUniversityHandler,
  getFollowedUniversitiesHandler: () => getFollowedUniversitiesHandler,
  getNewsByUrlHandler: () => getNewsByUrlHandler,
  getSavedNewsByUserIdHandler: () => getSavedNewsByUserIdHandler,
  getSavedNewsHandler: () => getSavedNewsHandler,
  removeNewsHandler: () => removeNewsHandler,
  saveNewsHandler: () => saveNewsHandler,
  unfollowUniversityHandler: () => unfollowUniversityHandler
});
module.exports = __toCommonJS(save_exports);

// src/repositories/prisma/prisma-save-repository.ts
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

// src/http/controllers/save/save.ts
var followUniversityHandler = async (request, reply) => {
  const { userId, universityId } = request.body;
  try {
    const follow = await followUniversity(userId, universityId);
    return reply.send(follow);
  } catch (error) {
    console.error("Error following university:", error);
    return reply.status(500).send({ error: "Unable to follow university" });
  }
};
var getFollowedUniversitiesHandler = async (request, reply) => {
  const { userId } = request.query;
  try {
    const followedUniversities = await getFollowedUniversitiesByUser(userId);
    if (followedUniversities.length === 0) {
      return reply.status(404).send({ message: "Voc\xEA n\xE3o segue nenhuma universidade." });
    }
    return reply.send(followedUniversities);
  } catch (error) {
    console.error("Error fetching followed universities:", error);
    return reply.status(500).send({ error: "Erro ao buscar universidades seguidas." });
  }
};
async function saveNewsHandler(request, reply) {
  const { userId, news } = request.body;
  if (!userId || !news || !news.link) {
    return reply.status(400).send({ error: "Missing required fields" });
  }
  const universityUrl = "";
  const newsData = {
    link: news.link,
    title: news.title,
    description: news.description,
    image: news.image || "",
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
    reply.status(200).send({ message: "News saved successfully" });
  } catch (error) {
    console.error("Error saving news:", error);
    reply.status(500).send({ error: "Error saving news" });
  }
}
var getNewsByUrlHandler = async (request, reply) => {
  const { url } = request.params;
  try {
    const news = await findNewsByUrl(decodeURIComponent(url));
    if (!news) {
      reply.status(404).send({ message: "News not found." });
    } else {
      reply.send(news);
    }
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};
async function getSavedNewsHandler(request, reply) {
  const userId = request.params.userId;
  try {
    const savedNews = await getSavedNewsByUser(userId);
    if (savedNews.length > 0) {
      reply.send({ savedNews });
    } else {
      reply.status(404).send({ message: "No saved news found for this user." });
    }
  } catch (error) {
    console.error("Error fetching saved news:", error);
    reply.status(500).send({ message: "Internal server error" });
  }
}
async function getSavedNewsByUserIdHandler(req, reply) {
  const userId = req.query.userId;
  if (!userId) {
    return reply.status(400).send({ error: "User ID is required" });
  }
  try {
    const savedNews = await getSavedNewsByUserId(userId);
    if (!Array.isArray(savedNews)) {
      console.error("Saved news is not an array:", savedNews);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
    return reply.send({ savedNews });
  } catch (error) {
    console.error("Error fetching saved news:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
var removeNewsHandler = async (request, reply) => {
  const { userId, newsUrl } = request.body;
  if (typeof newsUrl !== "string") {
    return reply.status(400).send({ error: "newsUrl must be a string" });
  }
  if (!userId || !newsUrl) {
    return reply.status(400).send({ error: "Missing required fields" });
  }
  try {
    await removeNewsFromDatabase(userId, newsUrl);
    return reply.status(200).send({ message: "News removed successfully" });
  } catch (error) {
    console.error("Error removing news:", error);
    return reply.status(500).send({ error: "Error removing news" });
  }
};
var unfollowUniversityHandler = async (request, reply) => {
  const { userId, universityId } = request.body;
  try {
    const unfollow = await unfollowUniversity(userId, universityId);
    return reply.send({ success: true, unfollow });
  } catch (error) {
    console.error("Error unfollowing university:", error);
    return reply.status(500).send({ error: "Unable to unfollow university" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  followUniversityHandler,
  getFollowedUniversitiesHandler,
  getNewsByUrlHandler,
  getSavedNewsByUserIdHandler,
  getSavedNewsHandler,
  removeNewsHandler,
  saveNewsHandler,
  unfollowUniversityHandler
});
