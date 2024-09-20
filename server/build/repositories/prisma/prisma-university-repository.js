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

// src/repositories/prisma/prisma-university-repository.ts
var prisma_university_repository_exports = {};
__export(prisma_university_repository_exports, {
  PrismaUniversityRepository: () => PrismaUniversityRepository
});
module.exports = __toCommonJS(prisma_university_repository_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : []
});

// src/repositories/prisma/prisma-university-repository.ts
var PrismaUniversityRepository = class {
  async findById(id) {
    try {
      const university = await prisma.university.findUnique({
        where: { id }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while finding university by id:", error);
      return null;
    }
  }
  async findByUrl(url) {
    try {
      const university = await prisma.university.findUnique({
        where: { url }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while finding university by url:", error);
      return null;
    }
  }
  async create(data) {
    try {
      const university = await prisma.university.create({
        data
      });
      return university;
    } catch (error) {
      console.error("Error occurred while creating university:", error);
      throw error;
    }
  }
  async findAll() {
    try {
      const allUniversities = await prisma.university.findMany();
      return allUniversities;
    } catch (error) {
      console.error("Error occurred while finding all universities:", error);
      return [];
    }
  }
  async deleteUniversity(id) {
    try {
      const university = await prisma.university.delete({
        where: { id }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while deleting university:", error);
      throw error;
    }
  }
  async updateUniversity(id, data) {
    try {
      const university = await prisma.university.update({
        where: { id },
        data: {
          ...data,
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while updating university:", error);
      throw error;
    }
  }
  async findByName(prefix) {
    try {
      const universities = await prisma.university.findMany({
        where: {
          name: {
            contains: prefix,
            mode: "insensitive"
          }
        },
        orderBy: {
          name: "asc"
        }
      });
      return universities;
    } catch (error) {
      console.error("Error occurred while finding universities by name:", error);
      return [];
    }
  }
  async findAllPaginated(offset, limit) {
    try {
      console.log(`Fetching universities with offset: ${offset}, limit: ${limit}`);
      const universities = await prisma.university.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          name: "asc"
        }
      });
      if (universities.length === 0) {
        console.log("No universities found");
      }
      return universities;
    } catch (error) {
      console.error("Error occurred while paginating universities:", error);
      return [];
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaUniversityRepository
});
