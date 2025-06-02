import { z } from 'zod';
import { router, procedure } from '../trpc';
import prisma from '@src/modules/prisma/client';

// Tái sử dụng RoleEnum từ schema bạn đã định nghĩa
export const RoleEnum = z.enum(['MEMBER', 'LEADER', 'INTERN']);

const UserTeamInput = z.object({
  teamId: z.number(),
  role: RoleEnum,
});

const BaseUserInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.number(),
  isLeader: z.boolean().optional(),
  teams: z.array(UserTeamInput).min(1),
});

export const userRouter = router({
  createUser: procedure.input(BaseUserInput).mutation(async ({ input }) => {
    return await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        phoneNumber: input.phoneNumber,
        isLeader: input.isLeader ?? false,
        userTeams: {
          create: input.teams.map(t => ({
            team: { connect: { id: t.teamId } },
            role: t.role,
          })),
        },
      },
      include: {
        userTeams: {
          include: { team: true },
        },
      },
    });
  }),

  getUsers: procedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        userTeams: {
          include: { team: true },
        },
      },
    });
  }),

  getUserById: procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return await prisma.user.findUnique({
      where: { id: input.id },
      include: {
        userTeams: {
          include: { team: true },
        },
      },
    });
  }),

  updateUser: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        phoneNumber: z.number().optional(),
        isLeader: z.boolean().optional(),
        teams: z.array(UserTeamInput).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, teams, ...data } = input;
      const updateData: any = { ...data };

      if (teams) {
        // Xoá toàn bộ team cũ rồi tạo lại
        updateData.userTeams = {
          deleteMany: {},
          create: teams.map(t => ({
            team: { connect: { id: t.teamId } },
            role: t.role,
          })),
        };
      }

      return await prisma.user.update({
        where: { id },
        data: updateData,
        include: {
          userTeams: {
            include: { team: true },
          },
        },
      });
    }),

  deleteUser: procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await prisma.userTeam.deleteMany({ where: { userId: input.id } });
    return await prisma.user.delete({ where: { id: input.id } });
  }),
});
