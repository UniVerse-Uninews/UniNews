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

// src/http/controllers/user/register.ts
var register_exports = {};
__export(register_exports, {
  register: () => register
});
module.exports = __toCommonJS(register_exports);
var import_client2 = require("@prisma/client");
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : []
});

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
  async findAll() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
  async deleteUser(id) {
    const user = await prisma.user.delete({
      where: {
        id
      }
    });
    return user;
  }
  async updateUser(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return user;
  }
  async createPasswordResetToken(userId, token, expiresAt) {
    const passwordReset = await prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt
      }
    });
    return passwordReset;
  }
  async findPasswordResetByToken(token) {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token
      }
    });
    return passwordReset;
  }
  async deletePasswordResetToken(token) {
    const passwordReset = await prisma.passwordReset.delete({
      where: {
        token
      }
    });
    return passwordReset;
  }
  async updatePassword(userId, hashedPassword) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: hashedPassword,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return user;
  }
};

// src/services/users/register.ts
var import_bcryptjs = require("bcryptjs");

// src/services/errors/user-already-exist-error.ts
var UserAlreadyExistError = class extends Error {
  constructor() {
    super("E-mail already exist");
  }
};

// src/services/users/register.ts
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    passwordHash,
    desactivated
  }) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }
    const passwordHashed = await (0, import_bcryptjs.hash)(passwordHash, 6);
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: passwordHashed,
      desactivated
    });
    console.log(user);
    return {
      user
    };
  }
};

// src/services/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);
  return registerUseCase;
}

// src/http/controllers/user/register.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma2 = new import_client2.PrismaClient();
async function register(request, reply) {
  const registerBodySchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string().email(),
    passwordHash: import_zod.z.string().min(6),
    desactivated: import_zod.z.boolean().default(false),
    role: import_zod.z.enum(["ADMIN", "USER"]).default("USER")
  });
  console.log(request.body);
  try {
    const { name, email, passwordHash, desactivated, role } = registerBodySchema.parse(request.body);
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ name, email, passwordHash, desactivated, role });
    reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      reply.status(409).send({ message: error.message });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  } finally {
    await prisma2.$disconnect();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  register
});
