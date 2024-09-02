import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository';
import { sendPasswordResetEmail } from '../../../utils/email-service';

interface RequestPasswordResetBody {
  email: string;
}

interface ResetPasswordBody {
  token: string;
  newPassword: string;
}

export const requestPasswordResetHandler = async (req: FastifyRequest<{ Body: RequestPasswordResetBody }>, reply: FastifyReply) => {
  const { email } = req.body;
  const usersRepository = new PrismaUsersRepository();

  try {
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await usersRepository.createPasswordResetToken(user.id, token, expiresAt);
    await sendPasswordResetEmail(email, token);

    return reply.status(200).send({ message: 'Password reset token sent' });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
};

export const resetPasswordHandler = async (req: FastifyRequest<{ Body: ResetPasswordBody }>, reply: FastifyReply) => {
  const { token, newPassword } = req.body;
  const usersRepository = new PrismaUsersRepository();

  try {
    const passwordReset = await usersRepository.findPasswordResetByToken(token);

    if (!passwordReset || passwordReset.expiresAt < new Date()) {
      return reply.status(400).send({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await hash(newPassword, 10);
    await usersRepository.updatePassword(passwordReset.userId, hashedPassword);
    await usersRepository.deletePasswordResetToken(token);

    return reply.status(200).send({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
};