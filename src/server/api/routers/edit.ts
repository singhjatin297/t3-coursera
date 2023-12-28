import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const editRouter = createTRPCRouter({
    
  editCourse: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string(), price: z.string(), listingId: z.string() }))
    .mutation(async ({input, ctx})=> {

        const course = await ctx.prisma.course.update({
            where: {
              id: input.listingId
            },
            data: {
              title: input.title,
              description: input.description,
              price: input.price
            }
          }) 
        return course;
    })
});