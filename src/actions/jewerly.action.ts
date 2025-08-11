import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { OPTIONS } from "~/constants";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewerlyAssets, jewerlyAssetTags, tag, user } from "~/lib/db/schema";
import { getClient } from "~/lib/redis/config";

export type MyJewelryAssetsType = Awaited<ReturnType<(typeof getMyJewerlyAssets)>>["data"]; // prettier-ignore
export type TypeJewerlyAssetById = Awaited<ReturnType<(typeof getJewerlyById)>>["data"]; // prettier-ignore

const JewerlyAssetSchema = z.object({
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

export const getJewerlyById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const res = await db
      .select()
      .from(jewerlyAssets)
      .leftJoin(user, eq(user.id, jewerlyAssets.userId))
      .innerJoin(category, eq(category.id, jewerlyAssets.categoryId))
      .where(eq(jewerlyAssets.id, data.id));

    return {
      success: true,
      data: res[0],
    };
  });

export const getJewerlyTagsAndCategories = createServerFn({ method: "GET" })
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

export const getMyJewerlyAssets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(jewerlyAssets)
      .innerJoin(user, eq(user.id, jewerlyAssets.userId))
      .innerJoin(category, eq(category.id, jewerlyAssets.categoryId))
      .where(eq(jewerlyAssets.userId, context.user.id));

    return {
      success: true,
      data: res,
    };
  });

export const createJewerlyAsset = createServerFn({ method: "POST" })
  .validator(JewerlyAssetSchema)
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
        .insert(jewerlyAssets)
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
        .returning({ id: jewerlyAssets.id }),
      await db
        .update(user)
        .set({
          boostCredit: totalBoostToUpdate,
          userStorageLimit: totalStorageLimitToUpdate,
        })
        .where(eq(user.id, context.user.id))
        .returning({ id: user.id }),
    ]);

    const jewerlyAssetId = insertedAsset[0].id;

    if (tags && tags.length > 0) {
      await db.insert(jewerlyAssetTags).values(
        tags.map((tagId: string) => ({
          jewerlyAssetId,
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

export const seedJewerlyTags = createServerFn({ method: "POST" })
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

export const deleteJewerlyAsset = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const res = await db
      .delete(jewerlyAssets)
      .where(eq(jewerlyAssets.id, data.id))
      .returning({ id: jewerlyAssets.id });

    return {
      success: true,
      data: res,
    };
  });

export const editJewerlyAsset = createServerFn({ method: "POST" })
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
      userId: z.string(),
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
      .update(jewerlyAssets)
      .set({
        name: data.name,
        description: data.description,
        price: data.price,
        thumbnailUrl: data.thumbnailUrl,
        previewUrl: data.previewUrl,
        assetUrl: data.assetUrl,
        typeAsset: data.typeAsset,
        userId: data.userId,
        boost: data.boost,
        categoryId: data.categoryId,
      })
      .where(eq(jewerlyAssets.id, data.id))
      .returning({ id: jewerlyAssets.id });

    return {
      success: true,
      data: res,
    };
  });
