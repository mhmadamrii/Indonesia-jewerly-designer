import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq, InferSelectModel } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { wishlistItem } from "~/lib/db/schema";
import { deleteCache, getFromCache, setCache } from "~/lib/redis/cachUtils";

type WishlistItem = InferSelectModel<typeof wishlistItem>;

export const getWishlistItems = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const cacheKey = `wishlist_data:${context.user.id}`;
    const cached = await getFromCache<WishlistItem[]>(cacheKey);

    if (cached) {
      return { success: true, data: cached };
    }

    const res = await db
      .select()
      .from(wishlistItem)
      .where(eq(wishlistItem.userId, context.user.id));

    await setCache(cacheKey, res, { ttlSeconds: 600 });

    return {
      success: true,
      data: res,
    };
  });

export const addWishlistItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ imageUrl: z.string(), jewerlyAssetId: z.string() }))
  .handler(async ({ data, context }) => {
    const cacheKey = `wishlist_data:${context.user.id}`;

    const { imageUrl, jewerlyAssetId } = data;

    const res = await db
      .insert(wishlistItem)
      .values({
        jewerlyAssetId,
        userId: context.user.id,
        imageUrl,
      })
      .returning({ id: wishlistItem.id });

    await deleteCache(cacheKey);

    return {
      success: true,
      data: res,
    };
  });

export const deleteWishlistItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    const cacheKey = `wishlist_data:${context.user.id}`;

    const { id } = data;

    const res = await db
      .delete(wishlistItem)
      .where(eq(wishlistItem.id, id))
      .returning({ id: wishlistItem.id });

    await deleteCache(cacheKey);

    return {
      success: true,
      data: res,
    };
  });
