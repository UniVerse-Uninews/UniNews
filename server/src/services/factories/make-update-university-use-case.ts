import { PrismaUniversityRepository } from "@/repositories/prisma/prisma-university-repository ";
import { UpdateUniversityUseCase } from "../university/update-university";

export function makeUpdateUniversityUseCase() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const updateUniversityUseCase = new UpdateUniversityUseCase(prismaUniversityRepository);

  return updateUniversityUseCase;
}