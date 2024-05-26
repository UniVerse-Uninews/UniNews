import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { Role, User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
  userId: string;
  name?: string;
  email?: string;
  passwordHash?: string;
  role?: Role;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    passwordHash,
    role
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    
    const dataToUpdate: Partial<User> = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (passwordHash) dataToUpdate.passwordHash = await hash(passwordHash, 6);
    if (role !== undefined) dataToUpdate.role = role;

    const updatedUser = await this.usersRepository.updateUser(userId, dataToUpdate);

    return {
      user: updatedUser,
    };
  }
}
