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

// src/http/controllers/news/temp-npm.ts
var temp_npm_exports = {};
__export(temp_npm_exports, {
  getNpmData: () => getNpmData,
  getNpmDataWithoutLimit: () => getNpmDataWithoutLimit
});
module.exports = __toCommonJS(temp_npm_exports);
var import_rss_to_json = require("rss-to-json");
var getNpmData = async (request, reply) => {
  try {
    const rssUrl = request.params.text;
    const { limit = 5, offset = 0 } = request.query;
    const rss = await (0, import_rss_to_json.parse)(rssUrl);
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const limitedItems = rss.items.slice(startIndex, endIndex);
    reply.send({ items: limitedItems, total: rss.items.length });
  } catch (e) {
    reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
  }
};
var getNpmDataWithoutLimit = async (request, reply) => {
  try {
    const rssUrl = request.params.text;
    const rss = await (0, import_rss_to_json.parse)(rssUrl);
    reply.send(rss);
  } catch (e) {
    reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getNpmData,
  getNpmDataWithoutLimit
});
