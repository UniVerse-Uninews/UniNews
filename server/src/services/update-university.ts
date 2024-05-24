import { UniversityRepository } from "@/repositories/university-repository ";
import { University } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUniversityUseCaseRequest {
    universityId: string;
    name?: string;
    location?: string;
    description?: string;
    url?: string;
}

interface UpdateUniversityUseCaseResponse {
    university: University;
}

export class UpdateUniversityUseCase {
    constructor(private universityRepository: UniversityRepository) {}

    async execute({
        universityId,
        name,
        location,
        description,
        url,
    }: UpdateUniversityUseCaseRequest): Promise<UpdateUniversityUseCaseResponse> {
        const university = await this.universityRepository.findById(universityId);
        if (!university) {
            throw new ResourceNotFoundError();
        }

        const dataToUpdate: Partial<University> = {};
        if (name) dataToUpdate.name = name;
        if (location) dataToUpdate.location = location;
        if (description) dataToUpdate.description = description;
        if (url) dataToUpdate.url = url;

        const updatedUniversity = await this.universityRepository.updateUniversity(universityId, dataToUpdate);

        return {
            university: updatedUniversity,
        };
    }
}