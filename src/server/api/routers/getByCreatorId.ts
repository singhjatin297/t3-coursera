import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const getByCreatorIdRouter = createTRPCRouter({
    GetByCreatorId: protectedProcedure
    .query( async ({ctx}) => {
        const userId = ctx.auth.userId;

        if (!userId) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
         }
      const coursebyCreatorId = await ctx.prisma.course.findMany({
        where: {
          userId: userId,
        },
      });
      return coursebyCreatorId;
    }),

});