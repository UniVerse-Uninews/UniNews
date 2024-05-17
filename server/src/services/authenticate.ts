import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository ";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
  desactivated?: boolean;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email,
    password,
    desactivated,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    console.log("Retrieved hashed password from database:", user.passwordHash);

    const doesPasswordMatch = await compare(password, user.passwordHash);

    const isDesactivated = user.desactivated;

    if (isDesactivated) {
      throw new InvalidCredentialsError();
    }

    console.log("Does password match?", doesPasswordMatch);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}