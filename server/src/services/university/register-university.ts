import { University } from "@prisma/client";
import { UniversityRepository } from "../../repositories/university-repository";
import { UniversityAlreadyExistError } from "../errors/university-already-exist-error";

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
        const universityAlreadyExists = await this.universityRepository.findByUrl(url);

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