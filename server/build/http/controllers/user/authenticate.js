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

// src/http/controllers/user/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  authenticate: () => authenticate
});
module.exports = __toCommonJS(authenticate_exports);
var import_zod = require("zod");

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("invalid credentials");
  }
};

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

// src/services/users/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password,
    desactivated
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    console.log("Retrieved hashed password from database:", user.passwordHash);
    const doesPasswordMatch = await (0, import_bcryptjs.compare)(password, user.passwordHash);
    const isDesactivated = user.desactivated;
    if (isDesactivated) {
      throw new InvalidCredentialsError();
    }
    console.log("Does password match?", doesPasswordMatch);
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }
    return {
      user
    };
  }
};

// src/services/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
  return authenticateUseCase;
}

// src/http/controllers/user/authenticate.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod.z.object({
    email: import_zod.z.string().email(),
    password: import_zod.z.string().min(6),
    desactivated: import_zod.z.boolean().optional()
  });
  try {
    const { email, password, desactivated } = authenticateBodySchema.parse(request.body);
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({ email, password, desactivated });
    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      }
    );
    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d"
        }
      }
    );
    return reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: true
    }).status(200).send({
      token,
      role: user.role,
      id: user.id
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    } else {
      console.error("Error during authentication:", error);
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticate
});
