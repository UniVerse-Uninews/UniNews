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

// src/services/users/update-user.ts
var update_user_exports = {};
__export(update_user_exports, {
  UpdateUserUseCase: () => UpdateUserUseCase
});
module.exports = __toCommonJS(update_user_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserUseCase
});
