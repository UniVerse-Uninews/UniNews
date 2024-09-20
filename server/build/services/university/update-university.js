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

// src/services/university/update-university.ts
var update_university_exports = {};
__export(update_university_exports, {
  UpdateUniversityUseCase: () => UpdateUniversityUseCase
});
module.exports = __toCommonJS(update_university_exports);

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUniversityUseCase
});
