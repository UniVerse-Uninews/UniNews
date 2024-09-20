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

// src/http/routes.ts
var routes_exports = {};
__export(routes_exports, {
  appRoutes: () => appRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controllers/user/register.ts
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

// src/http/controllers/user/authenticate.ts
var import_zod2 = require("zod");

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("invalid credentials");
  }
};

// src/services/users/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
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
    const doesPasswordMatch = await (0, import_bcryptjs2.compare)(password, user.passwordHash);
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
var import_client3 = require("@prisma/client");
var prisma3 = new import_client3.PrismaClient();
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod2.z.object({
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6),
    desactivated: import_zod2.z.boolean().optional()
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

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

// src/services/users/get-user-profile.ts
var GetUserProfileUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user
    };
  }
};

// src/http/controllers/user/get-user-profile.ts
async function getUserProfileController(request, reply) {
  const { userId } = request.params;
  try {
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    const userProfile = await getUserProfileUseCase.execute({ userId });
    reply.status(200).send(userProfile);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: "User not found" });
    } else {
      console.error("Error retrieving user profile:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// src/http/controllers/user/get-all-users.ts
async function getAllUsersController(request, reply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const allUsers = await usersRepository.findAll();
    reply.status(200).send(allUsers);
  } catch (error) {
    console.error("Error retrieving all users:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/services/users/delete-user.ts
var DeleteUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ id }) {
    const user = await this.usersRepository.deleteUser(id);
    return {
      user
    };
  }
};

// src/http/controllers/user/delete-user.ts
async function deleteUser(request, reply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    const { id } = request.params;
    if (!id) {
      reply.status(400).send({ error: "ID parameter is missing" });
      return;
    }
    const user = await deleteUserUseCase.execute({ id });
    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }
    reply.status(200).send(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/http/controllers/user/update-user.ts
var import_zod3 = require("zod");

// src/services/users/update-user.ts
var import_bcryptjs3 = require("bcryptjs");
var UpdateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId,
    name,
    email,
    passwordHash,
    role
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    const dataToUpdate = {};
    if (name)
      dataToUpdate.name = name;
    if (email)
      dataToUpdate.email = email;
    if (passwordHash)
      dataToUpdate.passwordHash = await (0, import_bcryptjs3.hash)(passwordHash, 6);
    if (role !== void 0)
      dataToUpdate.role = role;
    const updatedUser = await this.usersRepository.updateUser(userId, dataToUpdate);
    return {
      user: updatedUser
    };
  }
};

// src/services/factories/make-update-use-case.ts
function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);
  return updateUserUseCase;
}

// src/http/controllers/user/update-user.ts
async function updateUser(request, reply) {
  const updateUserBodySchema = import_zod3.z.object({
    name: import_zod3.z.string().optional(),
    email: import_zod3.z.string().email().optional(),
    passwordHash: import_zod3.z.string().min(6).optional(),
    role: import_zod3.z.string().optional()
  });
  const updateUserParamsSchema = import_zod3.z.object({
    userId: import_zod3.z.string()
  });
  try {
    const { name, email, passwordHash, role } = updateUserBodySchema.parse(request.body);
    const { userId } = updateUserParamsSchema.parse(request.params);
    const updateUseCase = makeUpdateUserUseCase();
    const result = await updateUseCase.execute({ userId, name, email, passwordHash });
    reply.status(200).send({ user: result.user });
  } catch (error) {
    if (error instanceof import_zod3.z.ZodError) {
      reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: "User not found" });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

// src/http/controllers/university/register-university.ts
var import_client4 = require("@prisma/client");
var import_zod4 = require("zod");

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
function makeRegisterUseCase2() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const registerUseCase = new RegisterUniversityUseCase(prismaUniversityRepository);
  return registerUseCase;
}

// src/http/controllers/university/register-university.ts
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
var prisma4 = new import_client4.PrismaClient();
var registerUniversitySchema = import_zod4.z.object({
  name: import_zod4.z.string(),
  url: import_zod4.z.string(),
  location: import_zod4.z.string(),
  description: import_zod4.z.string(),
  image: import_zod4.z.string()
});
async function registerUniversityController(request, reply) {
  const { name, url, location, description, image } = registerUniversitySchema.parse(request.body);
  const registerUseCase = makeRegisterUseCase2();
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

// src/http/controllers/university/get-all-university.ts
async function getAllUniversityController(request, reply) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const allUniversities = await universityRepository.findAll();
    reply.status(200).send(allUniversities);
  } catch (error) {
    console.error("Error retrieving all universities:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}
async function getAllUniversityWithPaginationController(request, reply) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const { page = 1, limit = 6 } = request.query;
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (pageNumber - 1) * limitNumber;
    const allUniversities = await universityRepository.findAllPaginated(offset, limitNumber);
    reply.status(200).send({ universities: allUniversities, page: pageNumber });
  } catch (error) {
    console.error("Error retrieving universities:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/services/university/get-university.ts
var GetUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    universityId
  }) {
    const university = await this.universityRepository.findById(universityId);
    if (!university) {
      throw new ResourceNotFoundError();
    }
    return {
      university
    };
  }
};

// src/http/controllers/university/get-university.ts
async function getUniversityController(request, reply) {
  const { id } = request.params;
  try {
    const universityRepository = new PrismaUniversityRepository();
    const getUniversityUseCase = new GetUniversityUseCase(universityRepository);
    const university = await getUniversityUseCase.execute({ universityId: id });
    reply.status(200).send(university);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: "University not found" });
    } else {
      console.error("Error retrieving university:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// src/services/university/delete-university.ts
var DeleteUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    universityId
  }) {
    const university = await this.universityRepository.deleteUniversity(universityId);
    return {
      university
    };
  }
};

// src/http/controllers/university/delete-university.ts
async function deleteUniversityController(request, reply) {
  const { id } = request.params;
  console.log("controller id: ", id);
  try {
    const universityRepository = new PrismaUniversityRepository();
    const deleteUniversityUseCase = new DeleteUniversityUseCase(universityRepository);
    const university = await deleteUniversityUseCase.execute({ universityId: id });
    reply.status(200).send(university);
  } catch (error) {
    console.error("Error deleting university:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/http/controllers/university/update-university.ts
var import_zod5 = require("zod");

// src/services/university/update-university.ts
var UpdateUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    universityId,
    name,
    location,
    description,
    url,
    image
  }) {
    const university = await this.universityRepository.findById(universityId);
    if (!university) {
      throw new ResourceNotFoundError();
    }
    const dataToUpdate = {};
    if (name)
      dataToUpdate.name = name;
    if (location)
      dataToUpdate.location = location;
    if (description)
      dataToUpdate.description = description;
    if (url)
      dataToUpdate.url = url;
    if (image)
      dataToUpdate.image = image;
    const updatedUniversity = await this.universityRepository.updateUniversity(universityId, dataToUpdate);
    return {
      university: updatedUniversity
    };
  }
};

// src/services/factories/make-update-university-use-case.ts
function makeUpdateUniversityUseCase() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const updateUniversityUseCase = new UpdateUniversityUseCase(prismaUniversityRepository);
  return updateUniversityUseCase;
}

// src/http/controllers/university/update-university.ts
async function updateUniversityController(request, reply) {
  const updateUniversityBodySchema = import_zod5.z.object({
    name: import_zod5.z.string().optional(),
    location: import_zod5.z.string().optional(),
    url: import_zod5.z.string().optional(),
    description: import_zod5.z.string().optional(),
    image: import_zod5.z.string().optional()
  });
  const updateUniversityParamsSchema = import_zod5.z.object({
    universityId: import_zod5.z.string()
  });
  try {
    const { name, location, url, description, image } = updateUniversityBodySchema.parse(request.body);
    const { universityId } = updateUniversityParamsSchema.parse(request.params);
    const updateUseCase = makeUpdateUniversityUseCase();
    const result = await updateUseCase.execute({ universityId, name, location, url, description, image });
    reply.status(200).send({ university: result.university });
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: "University not found" });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

// src/http/controllers/user/profile.ts
async function profile(request, reply) {
  await request.jwtVerify();
  console.log(request.user.sub);
  return reply.status(200);
}

// src/http/controllers/user/refresh.ts
async function refresh(request, reply) {
  await request.jwtVerify({ onlyCookie: true });
  const { role } = request.user;
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub
      }
    }
  );
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
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
    token
  });
}

// src/http/middleware/verify-user-role.ts
function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    console.log("Request user:", request.user);
    console.log("Role to verify:", roleToVerify);
    if (!request.user || !request.user.role) {
      console.error("User or role not available:", request.user);
      reply.status(401).send({ message: "Unauthorized" });
      return;
    }
    const { role } = request.user;
    if (role !== roleToVerify) {
      console.error("Role mismatch. Expected:", roleToVerify, "Actual:", role);
      reply.status(403).send({ message: "Forbidden" });
      return;
    }
    console.log("Role authorized:", role);
    return;
  };
}

// src/http/controllers/news/temp-news.ts
var import_client5 = require("@prisma/client");
var prisma5 = new import_client5.PrismaClient();
var createNews = async (request, reply) => {
  try {
    await prisma5.news.create({
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

// src/http/controllers/news/temp-npm.ts
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

// src/http/controllers/university/get-university-by-name.ts
async function getUniversityByNameController(request, reply) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const universities = await universityRepository.findByName(request.params.name);
    if (universities.length > 0) {
      reply.status(200).send(universities);
    } else {
      reply.status(404).send({ error: "No universities found" });
    }
  } catch (error) {
    console.error("Error retrieving universities by name:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/repositories/prisma/prisma-save-repository.ts
var import_client6 = require("@prisma/client");
var prisma6 = new import_client6.PrismaClient();
var saveNewsToDatabase = async (userId, newsData) => {
  const news = {
    link: newsData.link,
    title: newsData.title,
    description: newsData.description,
    image: newsData.image || "",
    author: newsData.author,
    published: new Date(newsData.published),
    created: new Date(newsData.created),
    category: newsData.category || [],
    enclosures: newsData.enclosures || [],
    media: newsData.media || {}
  };
  try {
    const existingSave = await prisma6.savedNews.findFirst({
      where: {
        userId,
        newsUrl: news.link
      }
    });
    if (existingSave) {
      console.log("Not\xEDcia j\xE1 salva para este usu\xE1rio.");
      return;
    }
    await prisma6.news.upsert({
      where: { link: news.link },
      update: {
        title: news.title,
        description: news.description,
        image: news.image,
        author: news.author,
        published: news.published,
        created: news.created,
        category: news.category,
        enclosures: news.enclosures,
        media: news.media
      },
      create: news
    });
    await prisma6.savedNews.upsert({
      where: { userId_newsUrl: { userId, newsUrl: news.link } },
      update: {},
      create: {
        userId,
        newsUrl: news.link
      }
    });
  } catch (error) {
    console.error("Error saving news:", error);
    throw new Error("Error saving news");
  }
};
var followUniversity = async (userId, universityId) => {
  return prisma6.follow.create({
    data: {
      userId,
      universityId
    }
  });
};
async function findNewsByUrl(link) {
  try {
    const news = await prisma6.news.findUnique({
      where: {
        link
      }
    });
    if (news) {
      console.log("Not\xEDcia encontrada:", news);
      return news;
    } else {
      console.log("Nenhuma not\xEDcia encontrada com essa URL.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar not\xEDcia:", error);
    throw new Error("Erro ao buscar not\xEDcia.");
  }
}
async function getSavedNewsByUserId(userId) {
  try {
    const savedNews = await prisma6.savedNews.findMany({
      where: { userId },
      include: { news: true }
    });
    console.log("Saved news:", savedNews);
    return savedNews;
  } catch (error) {
    console.error("Error fetching saved news from database:", error);
    throw error;
  }
}
async function removeNewsFromDatabase(userId, newsUrl) {
  try {
    console.log(`Removing news for userId: ${userId} and newsUrl: ${newsUrl}`);
    const result = await prisma6.savedNews.deleteMany({
      where: {
        userId,
        newsUrl
      }
    });
    if (result.count > 0) {
      console.log("Not\xEDcia removida com sucesso.");
    } else {
      console.log("Nenhuma not\xEDcia encontrada para remover.");
    }
  } catch (error) {
    console.error("Erro ao remover not\xEDcia:", error);
    throw new Error("Erro ao remover not\xEDcia");
  }
}
var unfollowUniversity = async (userId, universityId) => {
  return await prisma6.follow.deleteMany({
    where: {
      userId,
      universityId
    }
  });
};
var getFollowedUniversitiesByUser = async (userId) => {
  try {
    const followedUniversities = await prisma6.follow.findMany({
      where: {
        userId
      },
      include: {
        university: true
      }
    });
    return followedUniversities.map((follow) => follow.university);
  } catch (error) {
    throw new Error("Erro ao buscar universidades seguidas pelo usu\xE1rio.");
  }
};

// src/http/controllers/save/save.ts
var followUniversityHandler = async (request, reply) => {
  const { userId, universityId } = request.body;
  try {
    const follow = await followUniversity(userId, universityId);
    return reply.send(follow);
  } catch (error) {
    console.error("Error following university:", error);
    return reply.status(500).send({ error: "Unable to follow university" });
  }
};
var getFollowedUniversitiesHandler = async (request, reply) => {
  const { userId } = request.query;
  try {
    const followedUniversities = await getFollowedUniversitiesByUser(userId);
    if (followedUniversities.length === 0) {
      return reply.status(404).send({ message: "Voc\xEA n\xE3o segue nenhuma universidade." });
    }
    return reply.send(followedUniversities);
  } catch (error) {
    console.error("Error fetching followed universities:", error);
    return reply.status(500).send({ error: "Erro ao buscar universidades seguidas." });
  }
};
async function saveNewsHandler(request, reply) {
  const { userId, news } = request.body;
  if (!userId || !news || !news.link) {
    return reply.status(400).send({ error: "Missing required fields" });
  }
  const universityUrl = "";
  const newsData = {
    link: news.link,
    title: news.title,
    description: news.description,
    image: news.image || "",
    author: news.author,
    published: new Date(news.published),
    created: new Date(news.created),
    category: news.category,
    enclosures: news.enclosures || [],
    media: news.media || {},
    universityId: universityUrl
  };
  try {
    await saveNewsToDatabase(userId, newsData);
    reply.status(200).send({ message: "News saved successfully" });
  } catch (error) {
    console.error("Error saving news:", error);
    reply.status(500).send({ error: "Error saving news" });
  }
}
var getNewsByUrlHandler = async (request, reply) => {
  const { url } = request.params;
  try {
    const news = await findNewsByUrl(decodeURIComponent(url));
    if (!news) {
      reply.status(404).send({ message: "News not found." });
    } else {
      reply.send(news);
    }
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};
async function getSavedNewsByUserIdHandler(req, reply) {
  const userId = req.query.userId;
  if (!userId) {
    return reply.status(400).send({ error: "User ID is required" });
  }
  try {
    const savedNews = await getSavedNewsByUserId(userId);
    if (!Array.isArray(savedNews)) {
      console.error("Saved news is not an array:", savedNews);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
    return reply.send({ savedNews });
  } catch (error) {
    console.error("Error fetching saved news:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
var removeNewsHandler = async (request, reply) => {
  const { userId, newsUrl } = request.body;
  if (typeof newsUrl !== "string") {
    return reply.status(400).send({ error: "newsUrl must be a string" });
  }
  if (!userId || !newsUrl) {
    return reply.status(400).send({ error: "Missing required fields" });
  }
  try {
    await removeNewsFromDatabase(userId, newsUrl);
    return reply.status(200).send({ message: "News removed successfully" });
  } catch (error) {
    console.error("Error removing news:", error);
    return reply.status(500).send({ error: "Error removing news" });
  }
};
var unfollowUniversityHandler = async (request, reply) => {
  const { userId, universityId } = request.body;
  try {
    const unfollow = await unfollowUniversity(userId, universityId);
    return reply.send({ success: true, unfollow });
  } catch (error) {
    console.error("Error unfollowing university:", error);
    return reply.status(500).send({ error: "Unable to unfollow university" });
  }
};

// src/http/controllers/user/update-password.ts
var import_bcryptjs4 = require("bcryptjs");

// src/utils/email-service.ts
var import_nodemailer = __toESM(require("nodemailer"));
async function sendPasswordResetEmail(email, token) {
  const transporter = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
    from: `"UniNews" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Use the following token to reset your password: ${token}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .header img {
              width: 120px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888888;
              padding: 10px;
              background-color: #f4f4f4;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #F2A20C;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }

            .button:hover {
              background-color: #fac93b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="http://projetoscti.com.br/projetoscti27/uninews/img/tcc-logo-quadrado-sem-fundo.png" alt="UniNews Logo">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You requested a password reset. Use the following token to reset your password:</p>
              <p><strong>${token}</strong></p>
              <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>UniNews &copy; ${(/* @__PURE__ */ new Date()).getFullYear()}</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
}

// src/http/controllers/user/update-password.ts
var requestPasswordResetHandler = async (req, reply) => {
  const { email } = req.body;
  const usersRepository = new PrismaUsersRepository();
  try {
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }
    const token = Math.random().toString(36).substr(2, 6);
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    await usersRepository.createPasswordResetToken(user.id, token, expiresAt);
    await sendPasswordResetEmail(email, token);
    return reply.status(200).send({ message: "Password reset token sent" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};
var resetPasswordHandler = async (req, reply) => {
  const { token, newPassword } = req.body;
  const usersRepository = new PrismaUsersRepository();
  try {
    const passwordReset = await usersRepository.findPasswordResetByToken(token);
    if (!passwordReset || passwordReset.expiresAt < /* @__PURE__ */ new Date()) {
      return reply.status(400).send({ error: "Invalid or expired token" });
    }
    const hashedPassword = await (0, import_bcryptjs4.hash)(newPassword, 6);
    await usersRepository.updatePassword(passwordReset.userId, hashedPassword);
    await usersRepository.deletePasswordResetToken(token);
    return reply.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

// src/http/routes.ts
async function appRoutes(app) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.get("/users/:userId", getUserProfileController);
  app.get("/getallusers", { preValidation: [app.verifyJwt, verifyUserRole("ADMIN")] }, getAllUsersController);
  app.delete("/deleteuser/:id", { preValidation: [app.verifyJwt, verifyUserRole("ADMIN")] }, deleteUser);
  app.put("/users/:userId", updateUser);
  app.get("/me", { preValidation: [app.verifyJwt] }, profile);
  app.patch("/token/refresh", refresh);
  app.post("/password-reset/request", requestPasswordResetHandler);
  app.post("/password-reset/reset", resetPasswordHandler);
  app.post("/university", { preValidation: [app.verifyJwt, verifyUserRole("ADMIN")] }, registerUniversityController);
  app.get("/getalluniversity", getAllUniversityController);
  app.get("/univesitypagination", getAllUniversityWithPaginationController);
  app.get("/university/:id", getUniversityController);
  app.get("/getuniversityfollowed", getFollowedUniversitiesHandler);
  app.get("/university/name/:name", getUniversityByNameController);
  app.delete("/deleteuniversity/:id", { preValidation: [app.verifyJwt, verifyUserRole("ADMIN")] }, deleteUniversityController);
  app.put("/university/:universityId", { preValidation: [app.verifyJwt, verifyUserRole("ADMIN")] }, updateUniversityController);
  app.delete("/unfollowuniversity", unfollowUniversityHandler);
  app.post("/news", createNews);
  app.get("/npm/:text", getNpmData);
  app.get("/npm/university/:text", getNpmDataWithoutLimit);
  app.get("/news/:url", getNewsByUrlHandler);
  app.post("/followuniversity", followUniversityHandler);
  app.post("/save-news", saveNewsHandler);
  app.get("/saved-news", getSavedNewsByUserIdHandler);
  app.delete("/remove-news", removeNewsHandler);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appRoutes
});
