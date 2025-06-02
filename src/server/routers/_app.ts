import { router } from '../trpc';
import { teamRouter } from './team';
import { userRouter } from './user';

export const appRouter = router({
  team: teamRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
