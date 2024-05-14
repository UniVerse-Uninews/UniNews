import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";

interface DeleteUserUseCaseRequest {
  id: string;
}

interface DeleteUserUseCaseResponse {
  user: User;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.deleteUser(id);

    return {
      user,
    };
  }
}