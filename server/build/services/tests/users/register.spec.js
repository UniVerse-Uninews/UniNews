"use strict";

// src/services/tests/users/register.spec.ts
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

// src/services/tests/users/register.spec.ts
(0, import_vitest.describe)("Register Use Case", () => {
  (0, import_vitest.it)("should hash users password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: "123456",
      role: "USER",
      desactivated: false
    });
    const isPasswordCorrectlyHashed = await (0, import_bcryptjs2.compare)(
      "123456",
      user.passwordHash
    );
    (0, import_vitest.expect)(isPasswordCorrectlyHashed).toBe(true);
  });
  (0, import_vitest.it)("should not allow users with same email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const email = "johndoe@example.com";
    await registerUseCase.execute({
      name: "John Doe",
      email,
      passwordHash: "123456",
      role: "USER",
      desactivated: false
    });
    await (0, import_vitest.expect)(
      registerUseCase.execute({
        name: "John Doe",
        email,
        passwordHash: "123456",
        role: "USER",
        desactivated: false
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
  (0, import_vitest.it)("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: "123456",
      role: "USER",
      desactivated: false
    });
    (0, import_vitest.expect)(user.id).toEqual(import_vitest.expect.any(String));
  });
});
