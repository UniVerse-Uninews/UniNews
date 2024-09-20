"use strict";

// src/services/tests/users/get-user-profile.spec.ts
var import_vitest = require("vitest");
var import_bcryptjs = require("bcryptjs");

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

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

// src/services/users/get-user-profile.ts
var GetUserProfileUseCase = class {
  constructor(usersRepository2) {
    this.usersRepository = usersRepository2;
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

// src/services/tests/users/get-user-profile.spec.ts
var usersRepository = new InMemoryUsersRepository();
var sut = new GetUserProfileUseCase(usersRepository);
(0, import_vitest.describe)("Get User Profile Use Case", () => {
  (0, import_vitest.beforeEach)(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  (0, import_vitest.it)("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs.hash)("123456", 6)
    });
    const { user } = await sut.execute({
      userId: createdUser.id
    });
    (0, import_vitest.expect)(user.id).toEqual(import_vitest.expect.any(String));
    (0, import_vitest.expect)(user.name).toEqual("John Doe");
  });
  (0, import_vitest.it)("should be not able to get user profile with wrong id", async () => {
    (0, import_vitest.expect)(
      () => sut.execute({
        userId: "wrong-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
