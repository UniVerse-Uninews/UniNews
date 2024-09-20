"use strict";

// src/services/tests/users/update-user.spec.ts
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

// src/services/users/update-user.ts
var import_bcryptjs = require("bcryptjs");

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

// src/services/users/update-user.ts
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
      dataToUpdate.passwordHash = await (0, import_bcryptjs.hash)(passwordHash, 6);
    if (role !== void 0)
      dataToUpdate.role = role;
    const updatedUser = await this.usersRepository.updateUser(userId, dataToUpdate);
    return {
      user: updatedUser
    };
  }
};

// src/services/tests/users/update-user.spec.ts
(0, import_vitest.describe)("Update User Use Case", () => {
  let usersRepository;
  let sut;
  (0, import_vitest.beforeEach)(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });
  (0, import_vitest.it)("should be able to update a user's name", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6),
      role: "USER",
      desactivated: false
    });
    const updatedUserResponse = await sut.execute({
      userId: user.id,
      name: "Jane Doe"
    });
    (0, import_vitest.expect)(updatedUserResponse.user.name).toBe("Jane Doe");
  });
  (0, import_vitest.it)("should be able to update a user's email", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6),
      role: "USER",
      desactivated: false
    });
    const updatedUserResponse = await sut.execute({
      userId: user.id,
      email: "janedoe@example.com"
    });
    (0, import_vitest.expect)(updatedUserResponse.user.email).toBe("janedoe@example.com");
  });
  (0, import_vitest.it)("should be able to update a user's password", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6),
      role: "USER"
    });
    await sut.execute({
      userId: user.id,
      passwordHash: await (0, import_bcryptjs2.hash)("newpassword", 6)
    });
    const updatedUser = await usersRepository.findById(user.id);
    (0, import_vitest.expect)(updatedUser).not.toBeNull();
    if (updatedUser) {
      const isPasswordUpdated = await (0, import_bcryptjs2.compare)("newpassword", updatedUser.passwordHash);
      (0, import_vitest.expect)(isPasswordUpdated).toBe(false);
    } else {
      throw new Error("User not found.");
    }
  });
  (0, import_vitest.it)("should be able to update a user's role", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6),
      role: "ADMIN"
    });
    const updatedUserResponse = await sut.execute({
      userId: user.id,
      role: "ADMIN"
    });
    (0, import_vitest.expect)(updatedUserResponse.user.role).toBe("ADMIN");
  });
  (0, import_vitest.it)("should not update a non-existent user", async () => {
    await (0, import_vitest.expect)(
      sut.execute({
        userId: "non-existent-id",
        name: "Jane Doe"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
  (0, import_vitest.it)("should update only provided fields", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await (0, import_bcryptjs2.hash)("123456", 6),
      role: "USER"
    });
    const updatedUserResponse = await sut.execute({
      userId: user.id,
      name: "Jane Doe"
    });
    (0, import_vitest.expect)(updatedUserResponse.user.name).toBe("Jane Doe");
    (0, import_vitest.expect)(updatedUserResponse.user.email).toBe("johndoe@example.com");
    (0, import_vitest.expect)(updatedUserResponse.user.role).toBe("USER");
  });
});
