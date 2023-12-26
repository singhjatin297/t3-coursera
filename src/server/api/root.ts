import { postRouter } from "../../server/api/routers/post";
import { createTRPCRouter } from "../../server/api/trpc";
import { getRouter } from "./routers/get";
import { getByCreatorIdRouter } from "./routers/getByCreatorId";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  get: getRouter,
  getByCreatorId: getByCreatorIdRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;