"use strict";

// src/services/tests/users/authenticate.spec.ts
var import_vitest = require("vitest");
var import_bcryptjs2 = require("bcryptjs");

// src/repositories/in-memory/in-memory-users-repository.ts
var import_crypto = require("crypto");
var InMemoryUsersRepository = class {
  constructor() {
    this.items = [];
  }
  async findById(id) {
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }
  async findByEmail(email) {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }
  async create(data) {
    const user = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      role: data.role || "USER",
      desactivated: false
    };
    this.items.push(user);
    return user;
  }
  async updateUser(id, data) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }
    user.name = data.name?.toString() ?? user.name;
    user.email = data.email?.toString() ?? user.email;
    user.passwordHash = data.passwordHash?.toString() ?? user.passwordHash;
    user.role = typeof data.role === "string" ? data.role : user.role;
    user.desactivated = typeof data.desactivated === "boolean" ? data.desactivated : user.desactivated;
    user.updatedAt = /* @__PURE__ */ new Date();
    return user;
  }
  async deleteUser(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("User not found.");
    }
    const [deletedUser] = this.items.splice(index, 1);
    return deletedUser;
  }
  async findAll() {
    return this.items.map((user) => ({
      ...user,
      createdAt: user.createdAt instanceof Date ? user.createdAt : new Date(user.createdAt),
      updatedAt: user.updatedAt instanceof Date ? user.updatedAt : new Date(user.updatedAt)
    }));
  }
};

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("invalid credentials");
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

// src/services/tests/users/authenticate.spec.ts
(0, import_vitest.describe)("Authenticate Use Case", () => {
  (0, import_vitest.it)("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6)
    });
    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456"
    });
    (0, import_vitest.expect)(user.id).toEqual(import_vitest.expect.any(String));
  });
  (0, import_vitest.it)("should be not able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
    (0, import_vitest.expect)(
      () => sut.execute({
        email: "johndoe@example.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  (0, import_vitest.it)("should be not able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6)
    });
    (0, import_vitest.expect)(
      () => sut.execute({
        email: "johndoe@example.com",
        password: "123123"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
