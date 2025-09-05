import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { jewelryAssets, notification } from "~/lib/db/schema";

export type Notifications = Awaited<ReturnType<(typeof getNotifications)>>["data"]; // prettier-ignore

export const getNotifications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(notification)
      .leftJoin(jewelryAssets, eq(notification.jewelryAssetId, jewelryAssets.id))
      .where(eq(notification.toUserId, context.user.id))
      .orderBy(desc(notification.createdAt));

    return { success: true, data: res };
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    const res = await db
      .update(notification)
      .set({ isRead: true })
      .where(
        and(eq(notification.id, data.id), eq(notification.toUserId, context.user.id)),
      )
      .returning({ id: notification.id });

    return { success: true, data: res[0] };
  });

export const markAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .update(notification)
      .set({ isRead: true })
      .where(eq(notification.toUserId, context.user.id))
      .returning({ id: notification.id });

    return { success: true, data: res };
  });

export const deleteNotification = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    const res = await db
      .delete(notification)
      .where(
        and(eq(notification.id, data.id), eq(notification.toUserId, context.user.id)),
      )
      .returning({ id: notification.id });

    return { success: true, data: res[0] };
  });

// Utility server function to create a notification for an asset owner
export const createAssetOwnerNotification = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      jewelryAssetId: z.string(),
      kind: z.enum(["cart", "wishlist"]),
    }),
  )
  .handler(async ({ context, data }) => {
    const asset = await db
      .select({
        id: jewelryAssets.id,
        name: jewelryAssets.name,
        ownerId: jewelryAssets.userId,
      })
      .from(jewelryAssets)
      .where(eq(jewelryAssets.id, data.jewelryAssetId));

    const target = asset[0];
    if (!target) {
      throw new Error("Asset not found");
    }

    // disable notification to seller
    if (target.ownerId === context.user.id) {
      return { success: true, data: null };
    }

    const messageBase =
      data.kind === "cart"
        ? `${context.user.name || "Someone"} added your product "${target.name}" to their cart`
        : `${context.user.name || "Someone"} added your product "${target.name}" to their wishlist`;

    const res = await db
      .insert(notification)
      .values({
        toUserId: target.ownerId,
        fromUserId: context.user.id,
        jewelryAssetId: target.id,
        message: messageBase,
        isRead: false,
        type: data.kind === "cart" ? "order" : "community",
      })
      .returning({ id: notification.id });

    return { success: true, data: res[0] };
  });
