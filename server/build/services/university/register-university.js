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

// src/services/university/register-university.ts
var register_university_exports = {};
__export(register_university_exports, {
  RegisterUniversityUseCase: () => RegisterUniversityUseCase
});
module.exports = __toCommonJS(register_university_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUniversityUseCase
});
