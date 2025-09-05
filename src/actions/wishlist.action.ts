import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq, InferSelectModel } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { wishlistItem } from "~/lib/db/schema";
import { deleteCache, getFromCache, setCache } from "~/lib/redis/cachUtils";
import { createAssetOwnerNotification } from "./notification.action";

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
  .validator(z.object({ imageUrl: z.string(), jewelryAssetId: z.string() }))
  .handler(async ({ data, context }) => {
    const cacheKey = `wishlist_data:${context.user.id}`;

    const { imageUrl, jewelryAssetId } = data;

    const res = await db
      .insert(wishlistItem)
      .values({
        jewelryAssetId,
        userId: context.user.id,
        imageUrl,
      })
      .returning({ id: wishlistItem.id });

    await deleteCache(cacheKey);

    // Fire-and-forget notification to asset owner
    try {
      await createAssetOwnerNotification({
        data: { jewelryAssetId, kind: "wishlist" },
      });
    } catch (_) {}

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
