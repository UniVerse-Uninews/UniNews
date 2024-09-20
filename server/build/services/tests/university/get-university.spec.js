"use strict";

// src/services/tests/university/get-university.spec.ts
var import_vitest = require("vitest");

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

// src/services/tests/university/get-university.spec.ts
var import_crypto2 = require("crypto");
(0, import_vitest.describe)("Get University Use Case", () => {
  (0, import_vitest.it)("should return the university if it exists", async () => {
    const mockUniversity = {
      id: (0, import_crypto2.randomUUID)(),
      name: "University A",
      location: "Location A",
      url: "http://example.com",
      description: "Description A",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      image: "http://example.com/image.jpg"
    };
    const universityRepository = new InMemoryUniversityRepository();
    await universityRepository.create(mockUniversity);
    console.log("Mock University added to repository:", mockUniversity);
    const getUniversityUseCase = new GetUniversityUseCase(universityRepository);
    const { university } = await getUniversityUseCase.execute({ universityId: mockUniversity.id });
    console.log("University found", university);
    (0, import_vitest.expect)(university).toEqual(mockUniversity);
  });
  (0, import_vitest.it)("should throw ResourceNotFoundError if the university does not exist", async () => {
    const universityRepository = new InMemoryUniversityRepository();
    const getUniversityUseCase = new GetUniversityUseCase(universityRepository);
    await (0, import_vitest.expect)(getUniversityUseCase.execute({ universityId: "1" })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
