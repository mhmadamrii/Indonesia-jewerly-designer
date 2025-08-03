import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { wishlistItem } from "~/lib/db/schema";

export const getWishlistItems = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(wishlistItem)
      .where(eq(wishlistItem.userId, context.user.id));

    return {
      success: true,
      data: res,
    };
  });

export const addWishlistItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ imageUrl: z.string() }))
  .handler(async ({ data, context }) => {
    const { imageUrl } = data;

    const res = await db
      .insert(wishlistItem)
      .values({
        userId: context.user.id,
        imageUrl,
      })
      .returning({ id: wishlistItem.id });

    return {
      success: true,
      data: res,
    };
  });

export const deleteWishlistItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    const { id } = data;

    const res = await db
      .delete(wishlistItem)
      .where(eq(wishlistItem.id, id))
      .returning({ id: wishlistItem.id });

    return {
      success: true,
      data: res,
    };
  });
