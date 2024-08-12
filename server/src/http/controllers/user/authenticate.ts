import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error ";
import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate-use-case ";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    desactivated: z.boolean().optional()
  });

  try {
    const { email, password, desactivated } = authenticateBodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({ email, password, desactivated });

    const token = await reply.jwtSign({
      role: user.role,
    },
      {
        sign: {
          sub: user.id,
      },
    },
    );

    const refreshToken = await reply.jwtSign({
      role: user.role,
    },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
      },
    },
    );

    return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
    .status(200)
    .send({
      token
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    } else {
      console.error("Error during authentication:", error);
      return reply.status(500).send({ message: "Internal Server Error" });
      
    }
  }
}