import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { OPTIONS } from "~/constants";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewerlyAssets, jewerlyAssetTags, tag, user } from "~/lib/db/schema";

const JewerlyAssetSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  categoryId: z.string(),
  typeAsset: z.string(),
  thumbnailUrl: z.string(),
  tags: z.array(z.string()).optional(),
  boost: z.number(),
  totalBoostToUpdate: z.number(),
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
      .where(eq(jewerlyAssets.id, data.id));

    return {
      success: true,
      data: res[0],
    };
  });

export const getJewerlyTagsAndCategories = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({}) => {
    const [tags, categories] = await Promise.all([
      db.select().from(tag),
      db.select().from(category),
    ]);

    return {
      success: true,
      data: {
        tags,
        categories,
      },
    };
  });

export const getMyJewerlyAssets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(jewerlyAssets)
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
    const {
      name,
      description,
      categoryId,
      imageUrl,
      price,
      typeAsset,
      thumbnailUrl,
      tags,
      boost,
      totalBoostToUpdate,
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
          assetUrl: imageUrl,
          thumbnailUrl,
          boost,
        })
        .returning({ id: jewerlyAssets.id }),
      await db
        .update(user)
        .set({ boostCredit: totalBoostToUpdate })
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
