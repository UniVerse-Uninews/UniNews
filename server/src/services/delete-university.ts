import { University } from "@prisma/client";
import { UniversityRepository } from "@/repositories/university-repository ";

interface DeleteUniversityUseCaseRequest {
  universityId: string;
}

interface DeleteUniversityUseCaseResponse {
  university: University;
}

export class DeleteUniversityUseCase {
  
  constructor(private universityRepository: UniversityRepository) {}
  async execute({
    universityId,
  }: DeleteUniversityUseCaseRequest): Promise<DeleteUniversityUseCaseResponse> {
    const university = await this.universityRepository.deleteUniversity(universityId);

    return {
      university,
    };
  }

  
}