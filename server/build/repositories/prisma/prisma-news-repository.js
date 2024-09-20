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

// src/repositories/prisma/prisma-news-repository.ts
var prisma_news_repository_exports = {};
__export(prisma_news_repository_exports, {
  PrismaNewsRepository: () => PrismaNewsRepository
});
module.exports = __toCommonJS(prisma_news_repository_exports);
var import_client = require("@prisma/client");
var PrismaNewsRepository = class {
  constructor() {
    this.prisma = new import_client.PrismaClient();
  }
  async findByUniversity(regex) {
    const result = await this.prisma.$runCommandRaw({
      aggregate: "News",
      pipeline: [
        {
          $match: {
            university: {
              $regex: regex.source,
              $options: "i"
            }
          }
        }
      ],
      cursor: {}
    });
    return result.cursor.firstBatch;
  }
  async create(newsData) {
    return await this.prisma.news.create({ data: newsData });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaNewsRepository
});
