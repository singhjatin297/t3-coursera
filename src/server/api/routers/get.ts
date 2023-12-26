import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const getRouter = createTRPCRouter({
    
  getAll: protectedProcedure
    .query(({ctx}) => {
        return ctx.prisma.course.findMany();
    })

});