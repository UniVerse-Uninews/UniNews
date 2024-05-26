import { expect, describe, it } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository ";
import { RegisterUseCase } from "../users/register";
import { UserAlreadyExistError } from "../errors/user-already-exist-error";

describe("Register Use Case", () => {
  it("should hash users password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: "123456",
      role: "USER",
      desactivated: false,

    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not allow users with same email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "johndoe@example.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      passwordHash: "123456",
      role: "USER",
      desactivated: false,
    });

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        email,
        passwordHash: "123456",
        role: "USER",
        desactivated: false,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });

  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: "123456",
      role: "USER",
      desactivated: false,
    });

    expect(user.id).toEqual(expect.any(String));
  });
});