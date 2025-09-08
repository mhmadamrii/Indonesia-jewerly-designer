import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { conversation, conversationParticipant, user } from "~/lib/db/schema";

export const getAllConversations = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select({
        conversation: {
          id: conversation.id,
          type: conversation.type,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        },
        participant: {
          id: conversationParticipant.id,
          userId: conversationParticipant.userId,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(conversation)
      .leftJoin(
        conversationParticipant,
        eq(conversationParticipant.conversationId, conversation.id),
      )
      .innerJoin(user, eq(conversationParticipant.userId, user.id))
      .where(eq(conversationParticipant.userId, context.user.id));

    return {
      success: true,
      data: res,
    };
  });

export const createMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {});

export const createConversation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      type: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const chat = await db
      .insert(conversation)
      .values(data)
      .returning({ id: conversation.id });

    const res = await db
      .insert(conversationParticipant)
      .values({
        userId: context.user.id,
        conversationId: chat[0].id,
      })
      .returning({ id: conversationParticipant.id });

    return {
      success: true,
      data: res,
    };
  });
