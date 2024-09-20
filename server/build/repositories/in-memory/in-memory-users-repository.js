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

// src/repositories/in-memory/in-memory-users-repository.ts
var in_memory_users_repository_exports = {};
__export(in_memory_users_repository_exports, {
  InMemoryUsersRepository: () => InMemoryUsersRepository
});
module.exports = __toCommonJS(in_memory_users_repository_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUsersRepository
});
