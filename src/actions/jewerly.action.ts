import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewerlyAssets } from "~/lib/db/schema";

const JewerlyAssetSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  categoryId: z.string(),
  typeAsset: z.string(),
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
    const { name, description, categoryId, imageUrl, price, typeAsset } = data;
    const res = await db
      .insert(jewerlyAssets)
      .values({
        userId: context.user.id,
        name,
        typeAsset,
        price,
        description,
        categoryId,
        imageUrl,
      })
      .returning({ id: jewerlyAssets.id });

    return {
      success: true,
      data: res[0],
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
