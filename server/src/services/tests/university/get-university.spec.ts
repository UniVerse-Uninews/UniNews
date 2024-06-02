import { expect, describe, it } from "vitest";
import { GetUniversityUseCase } from "../../university/get-university";
import { InMemoryUniversityRepository } from "../../../repositories/in-memory/in-memory-university-repository";
import { University } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";
import { randomUUID } from "crypto";

describe("Get University Use Case", () => {
    it("should return the university if it exists", async () => {
        const mockUniversity: University = {
          id: randomUUID(),
          name: "University A",
          location: "Location A",
          url: "http://example.com",
          description: "Description A",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      
        const universityRepository = new InMemoryUniversityRepository();
        await universityRepository.create(mockUniversity);
      
        console.log("Mock University added to repository:", mockUniversity);
      
        const getUniversityUseCase = new GetUniversityUseCase(universityRepository);
      
        const { university } = await getUniversityUseCase.execute({ universityId: mockUniversity.id });
        console.log("University found", university);
      
        expect(university).toEqual(mockUniversity);
      });
      
  it("should throw ResourceNotFoundError if the university does not exist", async () => {
    const universityRepository = new InMemoryUniversityRepository();

    const getUniversityUseCase = new GetUniversityUseCase(universityRepository);

    await expect(getUniversityUseCase.execute({ universityId: "1" })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
