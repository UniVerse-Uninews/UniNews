"use strict";

// src/services/tests/university/register-university.spec.ts
var import_vitest = require("vitest");

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

// src/repositories/in-memory/in-memory-university-repository.ts
var import_crypto = require("crypto");
var InMemoryUniversityRepository = class {
  constructor() {
    this.items = [];
  }
  findByName(prefix) {
    throw new Error("Method not implemented.");
  }
  async findById(id) {
    const university = this.items.find((item) => item.id === id);
    return university || null;
  }
  async findByUrl(url) {
    const university = this.items.find((item) => item.url === url);
    return university || null;
  }
  async create(data) {
    const university = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      location: data.location,
      url: data.url,
      description: data.description,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      image: data.image
    };
    this.items.push(university);
    return university;
  }
  async updateUniversity(id, data) {
    const university = await this.findById(id);
    if (!university) {
      throw new Error("University not found.");
    }
    university.name = data.name?.toString() ?? university.name;
    university.location = data.location?.toString() ?? university.location;
    university.url = data.url?.toString() ?? university.url;
    university.description = data.description?.toString() ?? university.description;
    university.updatedAt = /* @__PURE__ */ new Date();
    return university;
  }
  async deleteUniversity(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("University not found.");
    }
    const [deletedUniversity] = this.items.splice(index, 1);
    return deletedUniversity;
  }
  async findAll() {
    return this.items.map((university) => ({
      ...university,
      createdAt: university.createdAt instanceof Date ? university.createdAt : new Date(university.createdAt),
      updatedAt: university.updatedAt instanceof Date ? university.updatedAt : new Date(university.updatedAt)
    }));
  }
};

// src/services/tests/university/register-university.spec.ts
(0, import_vitest.describe)("Register University Use Case", () => {
  (0, import_vitest.it)("should not allow universities with the same URL", async () => {
    const universityRepository = new InMemoryUniversityRepository();
    const registerUniversityUseCase = new RegisterUniversityUseCase(universityRepository);
    const url = "http://example.com";
    await registerUniversityUseCase.execute({
      name: "University A",
      location: "Location A",
      url,
      description: "Description A",
      image: "http://example.com/image.jpg"
    });
    console.log("First registration completed");
    await (0, import_vitest.expect)(
      registerUniversityUseCase.execute({
        name: "University B",
        location: "Location B",
        url,
        description: "Description B",
        image: "http://example.com/image.jpg"
      })
    ).rejects.toBeInstanceOf(UniversityAlreadyExistError);
    console.log("Second registration attempted");
  });
  (0, import_vitest.it)("should be able to register", async () => {
    const universityRepository = new InMemoryUniversityRepository();
    const registerUniversityUseCase = new RegisterUniversityUseCase(universityRepository);
    const { university } = await registerUniversityUseCase.execute({
      name: "University A",
      location: "Location A",
      url: "http://example.com",
      description: "Description A",
      image: "http://example.com/image.jpg"
    });
    console.log("Registration successful");
    (0, import_vitest.expect)(university.id).toEqual(import_vitest.expect.any(String));
  });
});
