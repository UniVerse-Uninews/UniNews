"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/university/register-university.ts
var register_university_exports = {};
__export(register_university_exports, {
  registerUniversityController: () => registerUniversityController
});
module.exports = __toCommonJS(register_university_exports);
var import_client2 = require("@prisma/client");
var import_zod = require("zod");

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

// src/services/errors/university-already-exist-error.ts
var UniversityAlreadyExistError = class extends Error {
  constructor() {
    super("University already exist");
  }
};

// src/services/university/register-university.ts
var RegisterUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    name,
    location,
    url,
    description,
    image
  }) {
    const universityAlreadyExists = await this.universityRepository.findByUrl(url);
    if (universityAlreadyExists) {
      throw new UniversityAlreadyExistError();
    }
    const university = await this.universityRepository.create({
      name,
      location,
      url,
      description,
      image
    });
    return {
      university
    };
  }
};

// src/services/factories/make-register-university-use-case.ts
function makeRegisterUseCase() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const registerUseCase = new RegisterUniversityUseCase(prismaUniversityRepository);
  return registerUseCase;
}

// src/http/controllers/university/register-university.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma2 = new import_client2.PrismaClient();
var registerUniversitySchema = import_zod.z.object({
  name: import_zod.z.string(),
  url: import_zod.z.string(),
  location: import_zod.z.string(),
  description: import_zod.z.string(),
  image: import_zod.z.string()
});
async function registerUniversityController(request, reply) {
  const { name, url, location, description, image } = registerUniversitySchema.parse(request.body);
  const registerUseCase = makeRegisterUseCase();
  try {
    await registerUseCase.execute({
      name,
      url,
      location,
      description,
      image
    });
    reply.send({ message: "University registered successfully" });
  } catch (error) {
    if (error instanceof UniversityAlreadyExistError) {
      reply.status(409).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerUniversityController
});
