import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../../server/api/trpc";

export const buyCourseRouter = createTRPCRouter({

  buyCourse: protectedProcedure
  .input(z.object({ listingId: z.string()}))
  .mutation(async({input, ctx}) => {

    const newUserId = ctx.auth.userId;
    if (typeof newUserId !== "string") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User ID not string" });
      }

    const course = await ctx.prisma.course.findUnique({
        where:{
            id:input.listingId
        }
    })

    if (!course) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Course not found" });
  }

    const purchase = await ctx.prisma.purchase.create({
        data:{
            courseId:input.listingId,
            userId:newUserId,
            title:course.title,
            description:course.description,
            price:course.price
        }
    })
    return {
        purchase,
        course,
      };
  })


});