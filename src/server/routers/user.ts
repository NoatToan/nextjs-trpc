import { z } from 'zod';
import { router, procedure } from '../trpc';
import prisma from '@src/modules/prisma/client';

export const userRouter = router({
  // CREATE user
  createUser: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        teamId: z.number().optional(),
        isLeader: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          teamId: input.teamId,
          isLeader: input.isLeader ?? false,
        },
      });
    }),

  // READ all users
  getUsers: procedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        team: true,
      },
    });
  }),

  // READ user by id
  getUserById: procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return await prisma.user.findUnique({
      where: { id: input.id },
      include: { team: true },
    });
  }),

  // UPDATE user
  updateUser: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        teamId: z.number().optional(),
        isLeader: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.user.update({
        where: { id },
        data,
      });
    }),

  // DELETE user
  deleteUser: procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    return await prisma.user.delete({
      where: { id: input.id },
    });
  }),
});
