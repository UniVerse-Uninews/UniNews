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

// src/http/controllers/news/get-rss-feed.ts
var get_rss_feed_exports = {};
__export(get_rss_feed_exports, {
  getRSSFeed: () => getRSSFeed
});
module.exports = __toCommonJS(get_rss_feed_exports);

// src/services/news/get-rss-feed.ts
var import_rss_to_json = require("rss-to-json");
var GetRSSFeedUseCase = class {
  async execute(url) {
    return await (0, import_rss_to_json.parse)(url);
  }
};

// src/http/controllers/news/get-rss-feed.ts
async function getRSSFeed(req, reply) {
  const { text } = req.params;
  try {
    const rss = await new GetRSSFeedUseCase().execute(text);
    reply.send(rss);
  } catch (error) {
    reply.send({ error: `Failed to parse RSS feed: ${error.message}` });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRSSFeed
});
