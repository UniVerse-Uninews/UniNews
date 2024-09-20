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

// src/services/news/add-news.ts
var add_news_exports = {};
__export(add_news_exports, {
  AddNewsUseCase: () => AddNewsUseCase
});
module.exports = __toCommonJS(add_news_exports);

// src/repositories/prisma/prisma-news-repository.ts
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

// src/repositories/news-repository.ts
var NewsRepository = class extends PrismaNewsRepository {
};

// src/services/news/add-news.ts
var AddNewsUseCase = class {
  constructor() {
    this.newsRepository = new NewsRepository();
  }
  async execute(newsData) {
    return await this.newsRepository.create(newsData);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddNewsUseCase
});
