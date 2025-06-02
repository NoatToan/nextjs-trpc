import { z } from 'zod';
import { router, procedure } from '../trpc';
import prisma from '@src/modules/prisma/client';

export const teamRouter = router({
  createTeam: procedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input }) => {
    return await prisma.team.create({ data: { name: input.name } });
  }),

  getTeams: procedure.query(async () => {
    return await prisma.team.findMany({
      include: {
        userTeams: {
          include: {
            user: true,
          },
        },
      },
    });
  }),

  getTeamById: procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return await prisma.team.findUnique({
      where: { id: input.id },
      include: {
        userTeams: {
          include: {
            user: true,
          },
        },
      },
    });
  }),

  updateTeam: procedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return await prisma.team.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),

  deleteTeam: procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await prisma.userTeam.deleteMany({ where: { teamId: input.id } });
    return await prisma.team.delete({ where: { id: input.id } });
  }),
});
