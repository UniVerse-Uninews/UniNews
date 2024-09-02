import { prisma } from "@/lib/prisma ";
import { Prisma, User, PasswordReset } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findAll() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  async deleteUser(id: string) : Promise<User>{
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return user;
  }

  async createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<PasswordReset> {
    const passwordReset = await prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
    return passwordReset;
  }

  async findPasswordResetByToken(token: string): Promise<PasswordReset | null> {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token,
      },
    });
    return passwordReset;
  }

  async deletePasswordResetToken(token: string): Promise<PasswordReset> {
    const passwordReset = await prisma.passwordReset.delete({
      where: {
        token,
      },
    });
    return passwordReset;
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<User> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: hashedPassword, 
        updatedAt: new Date(),
      },
    });
    return user;
  }
}