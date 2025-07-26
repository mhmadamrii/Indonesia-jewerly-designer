import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { cartItem, jewerlyAssets } from "~/lib/db/schema";

const CartSchema = z.object({
  jewerlyAssetId: z.string(),
  quantity: z.number(),
});

export const getCartItems = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(cartItem)
      .leftJoin(jewerlyAssets, eq(cartItem.jewerlyAssetId, jewerlyAssets.id))
      .where(eq(cartItem.userId, context.user.id));

    return {
      success: true,
      data: res,
    };
  });

export const createCartItem = createServerFn({ method: "POST" })
  .validator(CartSchema)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const { jewerlyAssetId, quantity } = data;

    const res = await db
      .insert(cartItem)
      .values({
        userId: context.user.id,
        jewerlyAssetId,
        quantity,
      })
      .returning({ id: cartItem.id });

    return {
      success: true,
      data: res[0],
    };
  });

export const deleteCartItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const res = await db
      .delete(cartItem)
      .where(and(eq(cartItem.userId, context.user.id), eq(cartItem.id, data.id)))
      .returning({ id: cartItem.id });

    return {
      success: true,
      data: res,
    };
  });
