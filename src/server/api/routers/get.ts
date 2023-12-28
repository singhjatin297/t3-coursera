import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { string, z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const getRouter = createTRPCRouter({
    
  getAll: protectedProcedure
    .query(({ctx}) => {
        return ctx.prisma.course.findMany();
    }),

  getById: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .query(async ({ctx, input}) => {
      
      return await ctx.prisma.course.findUnique({
        where: {
          id: input.listingId,
        }
      })
    })

});