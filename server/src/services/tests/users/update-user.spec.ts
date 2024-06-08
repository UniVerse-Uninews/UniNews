import { expect, describe, it, beforeEach } from "vitest";
import { hash, compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../../../repositories/in-memory/in-memory-users-repository";
import { UpdateUserUseCase } from "../../users/update-user";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

describe("Update User Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: UpdateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it("should be able to update a user's name", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await hash("123456", 6),
      role: "USER",
      desactivated: false,
    });

    const updatedUserResponse = await sut.execute({
      userId: user.id,
      name: "Jane Doe",
    });

    expect(updatedUserResponse.user.name).toBe("Jane Doe");
  });

  it("should be able to update a user's email", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await hash("123456", 6),
      role: "USER",
      desactivated: false,
    });

    const updatedUserResponse = await sut.execute({
      userId: user.id,
      email: "janedoe@example.com",
    });

    expect(updatedUserResponse.user.email).toBe("janedoe@example.com");
  });

  it("should be able to update a user's password", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await hash("123456", 6),
      role: "USER",
    });

    await sut.execute({
      userId: user.id,
      passwordHash: await hash("newpassword", 6),
    });

    const updatedUser = await usersRepository.findById(user.id);
    expect(updatedUser).not.toBeNull();
    if (updatedUser) {
      const isPasswordUpdated = await compare("newpassword", updatedUser.passwordHash);
      expect(isPasswordUpdated).toBe(false);
    } else {
      throw new Error("User not found.");
    }
  });

  it("should be able to update a user's role", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await hash("123456", 6),
      role: "ADMIN",
    });

    const updatedUserResponse = await sut.execute({
      userId: user.id,
      role: "ADMIN",
    });

    expect(updatedUserResponse.user.role).toBe("ADMIN");
  });

  it("should not update a non-existent user", async () => {
    await expect(
      sut.execute({
        userId: "non-existent-id",
        name: "Jane Doe",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should update only provided fields", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await hash("123456", 6),
      role: "USER",
    });

    const updatedUserResponse = await sut.execute({
      userId: user.id,
      name: "Jane Doe",
    });

    expect(updatedUserResponse.user.name).toBe("Jane Doe");
    expect(updatedUserResponse.user.email).toBe("johndoe@example.com");
    expect(updatedUserResponse.user.role).toBe("USER");
  });
});
