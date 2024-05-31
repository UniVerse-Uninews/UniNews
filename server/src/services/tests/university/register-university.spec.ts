import { expect, describe, it } from "vitest";
import { RegisterUniversityUseCase } from "../../university/register-university";
import { InMemoryUniversityRepository } from "../../../repositories/in-memory/in-memory-university-repository";
import { UniversityAlreadyExistError } from "../../errors/university-already-exist-error";

describe("Register University Use Case", () => {
  it("should not allow universities with the same URL", async () => {
    const universityRepository = new InMemoryUniversityRepository();
    const registerUniversityUseCase = new RegisterUniversityUseCase(universityRepository);

    const url = "http://example.com";

    await registerUniversityUseCase.execute({
      name: "University A",
      location: "Location A",
      url,
      description: "Description A",
    });

    console.log("First registration completed");

    await expect(
      registerUniversityUseCase.execute({
        name: "University B",
        location: "Location B",
        url,
        description: "Description B",
      }),
    ).rejects.toBeInstanceOf(UniversityAlreadyExistError);

    console.log("Second registration attempted");
  });

  it("should be able to register", async () => {
    const universityRepository = new InMemoryUniversityRepository();
    const registerUniversityUseCase = new RegisterUniversityUseCase(universityRepository);

    const { university } = await registerUniversityUseCase.execute({
      name: "University A",
      location: "Location A",
      url: "http://example.com",
      description: "Description A",
    });

    console.log("Registration successful");
    
    expect(university.id).toEqual(expect.any(String));
  });
});
