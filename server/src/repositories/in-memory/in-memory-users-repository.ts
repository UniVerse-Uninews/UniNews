import { randomUUID } from "crypto";
import { UsersRepository } from "../users-repository";
import { User, Prisma, $Enums } from "@prisma/client";

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: data.role || "USER",
      desactivated: false
    };

    this.items.push(user);

    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    user.name = data.name?.toString() ?? user.name;
    user.email = data.email?.toString() ?? user.email;
    user.passwordHash = data.passwordHash?.toString() ?? user.passwordHash;
    user.role = typeof data.role === 'string' ? data.role : user.role;
    user.desactivated = typeof data.desactivated === 'boolean' ? data.desactivated : user.desactivated;
    user.updatedAt = new Date();

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("User not found.");
    }
    const [deletedUser] = this.items.splice(index, 1);
    return deletedUser;
  }

  async findAll(): Promise<User[]> {
    return this.items.map(user => ({
      ...user,
      createdAt: user.createdAt instanceof Date ? user.createdAt : new Date(user.createdAt),
      updatedAt: user.updatedAt instanceof Date ? user.updatedAt : new Date(user.updatedAt)
    }));
  }
}
