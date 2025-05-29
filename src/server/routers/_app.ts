import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async opts => {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
          author: true,
        },
      });
      return {
        post: post,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
