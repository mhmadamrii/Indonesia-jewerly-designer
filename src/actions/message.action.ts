import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq, sql } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { conversation, conversationParticipant, message, user } from "~/lib/db/schema";

export const getAllConversations = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<{ success: boolean; data: any[] }> => {
    const userId = context.user.id;

    const res = await db
      .select({
        conversationId: conversation.id,
        type: conversation.type,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        lastMessage: sql`(
          SELECT row_to_json(m)
          FROM ${message} m
          WHERE m.conversation_id = ${conversation.id}
          ORDER BY m.created_at DESC
          LIMIT 1
        )`.as("last_message"),
        receiver: sql`(
          SELECT row_to_json(u)
          FROM ${user} u
          INNER JOIN ${conversationParticipant} cp
            ON cp.user_id = u.id
          WHERE cp.conversation_id = ${conversation.id}
            AND u.id != ${userId}
          LIMIT 1
        )`.as("receiver"),
      })
      .from(conversation)
      .innerJoin(
        conversationParticipant,
        eq(conversation.id, conversationParticipant.conversationId),
      )
      .where(eq(conversationParticipant.userId, userId));

    return {
      success: true,
      data: res,
    };
  });

export const getMessagesByConversationId = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ conversationId: z.string() }))
  .handler(async ({ context, data }) => {
    const userId = context.user.id;
    const { conversationId } = data;

    const isParticipant = await db
      .select()
      .from(conversationParticipant)
      .where(
        and(
          eq(conversationParticipant.conversationId, conversationId),
          eq(conversationParticipant.userId, userId),
        ),
      )
      .limit(1);

    if (isParticipant.length === 0) {
      return { success: false, error: "Access denied" };
    }

    const messagesList = await db
      .select()
      .from(message)
      .innerJoin(user, eq(message.senderId, user.id))
      .where(eq(message.conversationId, conversationId))
      .orderBy(asc(message.createdAt));

    return {
      success: true,
      data: messagesList,
    };
  });

export const createMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ content: z.string(), conversationId: z.string() }))
  .handler(async ({ data, context }) => {
    const { content, conversationId } = data;

    const res = await db
      .insert(message)
      .values({
        content,
        senderId: context.user.id,
        conversationId,
      })
      .returning({ id: message.id });

    return {
      success: true,
      data: res[0],
    };
  });

export const createConversation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      type: z.string(),
      receiverId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const chat = await db
      .insert(conversation)
      .values(data)
      .returning({ id: conversation.id });

    const participants = await db
      .insert(conversationParticipant)
      .values([
        { userId: context.user.id, conversationId: chat[0].id },
        { userId: data.receiverId, conversationId: chat[0].id },
      ])
      .returning({ id: conversationParticipant.id });

    return {
      success: true,
      data: participants[0],
    };
  });
