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

// src/repositories/in-memory/in-memory-university-repository.ts
var in_memory_university_repository_exports = {};
__export(in_memory_university_repository_exports, {
  InMemoryUniversityRepository: () => InMemoryUniversityRepository
});
module.exports = __toCommonJS(in_memory_university_repository_exports);
var import_crypto = require("crypto");
var InMemoryUniversityRepository = class {
  constructor() {
    this.items = [];
  }
  findByName(prefix) {
    throw new Error("Method not implemented.");
  }
  async findById(id) {
    const university = this.items.find((item) => item.id === id);
    return university || null;
  }
  async findByUrl(url) {
    const university = this.items.find((item) => item.url === url);
    return university || null;
  }
  async create(data) {
    const university = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      location: data.location,
      url: data.url,
      description: data.description,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      image: data.image
    };
    this.items.push(university);
    return university;
  }
  async updateUniversity(id, data) {
    const university = await this.findById(id);
    if (!university) {
      throw new Error("University not found.");
    }
    university.name = data.name?.toString() ?? university.name;
    university.location = data.location?.toString() ?? university.location;
    university.url = data.url?.toString() ?? university.url;
    university.description = data.description?.toString() ?? university.description;
    university.updatedAt = /* @__PURE__ */ new Date();
    return university;
  }
  async deleteUniversity(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("University not found.");
    }
    const [deletedUniversity] = this.items.splice(index, 1);
    return deletedUniversity;
  }
  async findAll() {
    return this.items.map((university) => ({
      ...university,
      createdAt: university.createdAt instanceof Date ? university.createdAt : new Date(university.createdAt),
      updatedAt: university.updatedAt instanceof Date ? university.updatedAt : new Date(university.updatedAt)
    }));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUniversityRepository
});
