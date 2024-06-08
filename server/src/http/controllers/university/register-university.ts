import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { makeRegisterUseCase} from "../../../services/factories/make-register-university-use-case";
import dotenv from "dotenv";

import { UniversityAlreadyExistError } from '../../../services/errors/university-already-exist-error';

dotenv.config();

const prisma = new PrismaClient();

const registerUniversitySchema = z.object({
  name: z.string(),
  url: z.string(),
  location: z.string(),
  description: z.string(),
});

export async function registerUniversityController(request: FastifyRequest, reply: FastifyReply) {
  const { name, url, location, description } = registerUniversitySchema.parse(request.body);

  const registerUseCase = makeRegisterUseCase();

  try {
    await registerUseCase.execute({
      name,
      url,
      location,
      description,
    });

    reply.send({ message: "University registered successfully" });
  } catch (error) {
    if (error instanceof UniversityAlreadyExistError) {
      reply.status(409).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}



