import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
// import { TRPCError } from "@trpc/server";

import { agentsInsertSchema } from "@/app/(dashboard)/agents/schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";
export const agentsRouter = createTRPCRouter({
  // TODO: Change 'getone ' to use 'protecedProcedure'
getOne: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, input.id));
    
    return existingAgent;
  }),

 // TODO: Change 'getmany ' to use 'protecedProcedure'
  getMany: protectedProcedure.query(async () => {
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