// register-use-case.ts

import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  passwordHash: string;
  role : string;
  desactivated: boolean;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    passwordHash,
    desactivated
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const passwordHashed = await hash(passwordHash, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: passwordHashed,
      desactivated
    });

    console.log(user);

    return {
      user,
    };
  }
}
