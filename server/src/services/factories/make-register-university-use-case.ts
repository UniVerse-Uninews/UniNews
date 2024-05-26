import { PrismaUniversityRepository } from "../../repositories/prisma/prisma-university-repository";
import { RegisterUniversityUseCase } from "../university/register-university";

export function makeRegisterUseCase() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const registerUseCase = new RegisterUniversityUseCase(prismaUniversityRepository);

  return registerUseCase;
}