import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password_hash: string; 
}
interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password_hash, // Add password_hash to the execute method parameters
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    // const password_hash = await hash(password, 6); // Move hashing password outside of this class

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return {
      user,
    };
  }
}
