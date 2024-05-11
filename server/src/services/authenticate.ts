import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository ";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  passwordHash: string; // Change passwordHash to password
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email,
    passwordHash,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError(); // Provide an error message
    }

    console.log("Retrieved hashed password from database:", user.passwordHash);

    const doesPasswordMatch = await compare(passwordHash, user.passwordHash); 

    console.log("Does password match?", doesPasswordMatch);


    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError(); // Provide an error message
    }

    return {
      user,
    };
  }
}