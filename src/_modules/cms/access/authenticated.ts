import { User } from '@src/payload-types';
import type { AccessArgs } from 'payload';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user);
};
