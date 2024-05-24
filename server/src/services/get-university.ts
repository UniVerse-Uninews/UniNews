// get-user-profile.ts
import { PrismaUniversityRepository } from "@/repositories/prisma/prisma-university-repository ";
import { University } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUniversityUseCaseRequest {
  universityId: string;
}

interface GetUniversityUseCaseResponse {
  university: University;
}

export class GetUniversityUseCase {
  constructor(private universityRepository: PrismaUniversityRepository) {}

  async execute({
    universityId,
  }: GetUniversityUseCaseRequest): Promise<GetUniversityUseCaseResponse> {
    const university = await this.universityRepository.findById(universityId);

    if (!university) {
      throw new ResourceNotFoundError();
    }
    return {
      university,
    };
  }
}