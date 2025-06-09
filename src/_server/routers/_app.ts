import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  cmsPost: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async opts => {
      // const post = await prisma.post.findUnique({
      //   where: { id: parseInt(id) },
      //   include: {
      //     author: true,
      //   },
      // });
      const payload = await getPayload({ config: configPromise });

      // const posts = await payload.find({
      //   collection: 'posts',
      //   depth: 1,
      //   limit: 12,
      //   overrideAccess: false,
      //   select: {
      //     title: true,
      //     slug: true,
      //     categories: true,
      //     meta: true,
      //   },
      // });
      return {
        post: 'posts',
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
