import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const postRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  createCourse: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string(), price: z.string() }))
    .mutation(async ({input, ctx}) => {
      if (typeof ctx.auth.userId !== "string") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User ID not string" });
      }

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.auth.userId
        },
      })

      if(!existingUser){
        await ctx.prisma.user.create({
          data:{
            id: ctx.auth.userId
          },
        })
      }

     const course = await ctx.prisma.course.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
    return course;
    })
});