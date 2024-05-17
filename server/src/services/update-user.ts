import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";

interface UpdateUserUseCaseRequest {
  userId: string;
  name?: string;
  email?: string;
  passwordHash?: string;
  role?: boolean;
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
      throw new Error("User not found");
    }

    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (passwordHash) user.passwordHash = await hash(passwordHash, 6);
    if (role !== undefined) user.role = role;

    const updatedUser = await this.usersRepository.updateUser(userId, user);

    return {
      user: updatedUser,
    };
  }
}
