import { db } from "@/db";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
// import { TRPCError } from "@trpc/server";

import { agentsInsertSchema } from "@/app/(dashboard)/agents/schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";
export const agentsRouter = createTRPCRouter({
  // TODO: Change 'getone ' to use 'protecedProcedure'
getOne: baseProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    const [existingAgent] = await db
      .select({
        meetingCount:  sql<number>`5`,
        ...getTableColumns(agents)
      })
      .from(agents)
      .where(eq(agents.id, input.id));
    
    return existingAgent;
  }),

 // TODO: Change 'getmany ' to use 'protecedProcedure'
  getMany: baseProcedure.query(async () => {
    const data = await db
     .select()
     .from(agents);
    return data;
}),
 create: protectedProcedure.input(agentsInsertSchema)
  .mutation(async ({ input, ctx }) => {
    const [createdAgent] = await db.insert(agents).values({
      ...input,
      userId: ctx.auth.user.id,
    })
    .returning();

    return createdAgent;
  }),
});