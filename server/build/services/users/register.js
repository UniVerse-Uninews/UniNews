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

// src/services/users/register.ts
var register_exports = {};
__export(register_exports, {
  RegisterUseCase: () => RegisterUseCase
});
module.exports = __toCommonJS(register_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUseCase
});
