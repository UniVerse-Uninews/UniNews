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

// src/http/controllers/news/temp-news.ts
var temp_news_exports = {};
__export(temp_news_exports, {
  createNews: () => createNews,
  getNews: () => getNews,
  getNewsByLink: () => getNewsByLink
});
module.exports = __toCommonJS(temp_news_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var getNews = async (request, reply) => {
  try {
    const decode = decodeURIComponent(request.params.text);
    const regex = new RegExp(decode, "i");
    const news = await prisma.news.findMany({
      where: {
        university: {
          name: {
            contains: regex.source,
            mode: "insensitive"
          }
        }
      }
    });
    reply.send(news.length !== 0 ? news : []);
  } catch (e) {
    reply.status(500).send({ error: "Erro ao buscar not\xEDcias: " + e });
  }
};
var createNews = async (request, reply) => {
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
          connect: { id: request.body.universityId }
        }
      }
    });
    reply.send({ msg: "Not\xEDcia adicionada com sucesso!" });
  } catch (e) {
    reply.status(500).send({ error: "Erro ao adicionar not\xEDcia: " + e });
  }
};
var getNewsByLink = async (request, reply) => {
  try {
    const decodedLink = decodeURIComponent(request.params.link);
    const news = await prisma.news.findUnique({
      where: {
        url: decodedLink
      }
    });
    if (!news) {
      return reply.status(404).send({ error: "Not\xEDcia n\xE3o encontrada" });
    }
    reply.send(news);
  } catch (e) {
    reply.status(500).send({ error: "Erro ao buscar not\xEDcia: " + e });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNews,
  getNews,
  getNewsByLink
});
