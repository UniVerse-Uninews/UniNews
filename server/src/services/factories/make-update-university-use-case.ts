import { PrismaUniversityRepository } from "@/repositories/prisma/prisma-university-repository ";
import { UpdateUniversityUseCase } from "../update-university";

export function makeUpdateUniversityUseCase() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const updateUniversityUseCase = new UpdateUniversityUseCase(prismaUniversityRepository);

  return updateUniversityUseCase;
}