import { University } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { UniversityRepository } from "../repositories/university-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UniversityAlreadyExistError } from "./errors/university-alreads-exist-error";

interface RegisterUniversityUseCaseRequest {
    name: string;
    location: string;
    url: string;
    description: string;
}

interface RegisterUniversityUseCaseResponse {
    university: University;
}

export class RegisterUniversityUseCase {
    constructor(private universityRepository: UniversityRepository) { }

    async execute({
        name,
        location,
        url,
        description,
    }: RegisterUniversityUseCaseRequest): Promise<RegisterUniversityUseCaseResponse> {
        const universityAlreadyExists = await this.universityRepository.findByEmail(url);

        if (universityAlreadyExists) {
            throw new UniversityAlreadyExistError();
        }

        const university = await this.universityRepository.create({
            name,
            location,
            url,
            description,
        });

        return {
            university,
        };
    }
}