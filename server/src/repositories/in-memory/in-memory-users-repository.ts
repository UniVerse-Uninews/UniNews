import { randomUUID } from "crypto";
import { UsersRepository } from "../users-repository";
import { User, Prisma } from "@prisma/client";

export class InMemoryUsersRepository implements UsersRepository {
  findAll(): Promise<{ id: string; createdAt: Date; updatedAt: Date; name: string; email: string; passwordHash: string; }[]> {
    throw new Error("Method not implemented.");
  }
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
}
}