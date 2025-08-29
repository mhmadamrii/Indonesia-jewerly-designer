import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { OPTIONS } from "~/constants";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewelryAssets, jewelryAssetTags, tag, user } from "~/lib/db/schema";
import { getClient } from "~/lib/redis/config";

export type MyJewelryAssetsType = Awaited<ReturnType<(typeof getMyjewelryAssets)>>["data"]; // prettier-ignore
export type TypejewelryAssetById = Awaited<ReturnType<(typeof getjewelryById)>>["data"]; // prettier-ignore

const jewelryAssetSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.string(),
  typeAsset: z.string(),
  thumbnailUrl: z.string(),
  assetUrl: z.string(),
  previewUrl: z.string(),
  tags: z.array(z.string()).optional(),
  boost: z.number(),
  totalBoostToUpdate: z.number(),
  totalStorageLimitToUpdate: z.number(),
});

export const getAllCategories = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(category);
  return {
    success: true,
    data: res,
  };
});

export const getjewelryById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const res = await db
      .select()
      .from(jewelryAssets)
      .leftJoin(user, eq(user.id, jewelryAssets.userId))
      .innerJoin(category, eq(category.id, jewelryAssets.categoryId))
      .leftJoin(
        jewelryAssetTags,
        eq(jewelryAssetTags.jewelryAssetId, jewelryAssets.categoryId),
      )
      .where(eq(jewelryAssets.id, data.id));

    return {
      success: true,
      data: res[0],
    };
  });

export const getjewelryTagsAndCategories = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const [tags, categories, currentStorageLimit] = await Promise.all([
      db.select().from(tag),
      db.select().from(category),
      db
        .select({
          userStorageLimit: user.userStorageLimit,
          userStorageUsage: user.userStorageUsage,
        })
        .from(user)
        .where(eq(user.id, context.user.id)),
    ]);

    return {
      success: true,
      data: {
        tags,
        categories,
        storage: currentStorageLimit,
      },
    };
  });

export const getMyjewelryAssets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(jewelryAssets)
      .innerJoin(user, eq(user.id, jewelryAssets.userId))
      .innerJoin(category, eq(category.id, jewelryAssets.categoryId))
      .where(eq(jewelryAssets.userId, context.user.id));

    return {
      success: true,
      data: res,
    };
  });

export const createjewelryAsset = createServerFn({ method: "POST" })
  .validator(jewelryAssetSchema)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const redis = await getClient();
    const cachedKey = `dashboard_data:${context.user.id}`;

    const {
      name,
      description,
      categoryId,
      thumbnailUrl,
      previewUrl,
      assetUrl,
      price,
      typeAsset,
      tags,
      boost,
      totalBoostToUpdate,
      totalStorageLimitToUpdate,
    } = data;

    const [insertedAsset, updateBoostCredit] = await Promise.all([
      await db
        .insert(jewelryAssets)
        .values({
          userId: context.user.id,
          name,
          typeAsset,
          price,
          description,
          categoryId,
          thumbnailUrl,
          previewUrl,
          assetUrl,
          boost,
        })
        .returning({ id: jewelryAssets.id }),
      await db
        .update(user)
        .set({
          boostCredit: totalBoostToUpdate,
          userStorageUsage: totalStorageLimitToUpdate,
        })
        .where(eq(user.id, context.user.id))
        .returning({ id: user.id }),
    ]);

    const jewelryAssetId = insertedAsset[0].id;

    if (tags && tags.length > 0) {
      await db.insert(jewelryAssetTags).values(
        tags.map((tagId: string) => ({
          jewelryAssetId,
          tagId,
        })),
      );
    }

    await Promise.all([
      redis.del(cachedKey),
      redis.del(`explore_data:${context.user.id}`),
    ]);

    return {
      success: true,
      data: insertedAsset,
    };
  });

export const seedjewelryTags = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .insert(tag)
      .values(
        OPTIONS.map((item) => ({
          name: item.value,
        })),
      )
      .returning({ id: tag.id });

    return {
      success: true,
      data: res,
    };
  });

export const deletejewelryAsset = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const res = await db
      .delete(jewelryAssets)
      .where(eq(jewelryAssets.id, data.id))
      .returning({ id: jewelryAssets.id });

    return {
      success: true,
      data: res,
    };
  });

export const editjewelryAsset = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.coerce.number().min(1).max(500000),
      thumbnailUrl: z.string(),
      previewUrl: z.string(),
      assetUrl: z.string(),
      typeAsset: z.string(),
      boost: z.number(),
      categoryId: z.string(),
      tags: z.array(z.string()).optional(),
      totalBoostToUpdate: z.number(),
      totalStorageLimitToUpdate: z.number(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const res = await db
      .update(jewelryAssets)
      .set({
        name: data.name,
        description: data.description,
        price: data.price,
        // thumbnailUrl: data.thumbnailUrl,
        // previewUrl: data.previewUrl,
        // assetUrl: data.assetUrl,
        typeAsset: data.typeAsset,
        userId: context.user.id,
        boost: data.boost,
        categoryId: data.categoryId,
      })
      .where(eq(jewelryAssets.id, data.id))
      .returning({ id: jewelryAssets.id });

    return {
      success: true,
      data: res,
    };
  });

export const addLikes = createServerFn({ method: "POST" })
  .validator(
    z.object({
      jewelryAssetId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    const res = await db
      .update(jewelryAssets)
      .set({
        likes: sql`${jewelryAssets.likes} + 1`,
      })
      .where(eq(jewelryAssets.id, data.jewelryAssetId))
      .returning({ id: jewelryAssets.id });

    return {
      success: true,
      data: res,
    };
  });
