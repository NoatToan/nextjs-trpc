import { z } from 'zod';

export const RoleEnum = z.enum(['MEMBER', 'LEADER', 'INTERN']);

export const UserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name is required',
    })
    .min(1, 'Name is required'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is required',
    })
    .email('Invalid email'),
  phoneNumber: z
    .number({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number is required',
    })
    .min(1, 'Phone number is required'),
  isLeader: z.boolean().optional(),
  teams: z
    .array(
      z.object({
        teamId: z.number(),
        role: RoleEnum,
      }),
    )
    .min(1, 'Select at least one team'),
});

export type UserInput = z.infer<typeof UserSchema>;
