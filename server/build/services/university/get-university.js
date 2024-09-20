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

// src/services/university/get-university.ts
var get_university_exports = {};
__export(get_university_exports, {
  GetUniversityUseCase: () => GetUniversityUseCase
});
module.exports = __toCommonJS(get_university_exports);

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetUniversityUseCase
});
