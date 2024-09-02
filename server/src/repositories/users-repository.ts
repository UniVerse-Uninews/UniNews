import { Prisma, User, PasswordReset } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findAll(): Promise<User[]>; 
  deleteUser(id: string): Promise<User>;
  updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<PasswordReset>;
  findPasswordResetByToken(token: string): Promise<PasswordReset | null>;
  deletePasswordResetToken(token: string): Promise<PasswordReset>;
  updatePassword(userId: string, hashedPassword: string): Promise<User>;
}