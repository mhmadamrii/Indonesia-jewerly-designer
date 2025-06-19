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
      data: res,
    };
  });

export const createJewerlyAsset = createServerFn({ method: "POST" })
  .validator(JewerlyAssetSchema)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const { name, description, categoryId, imageUrl, price } = data;
    const res = await db
      .insert(jewerlyAssets)
      .values({
        userId: context.user.id,
        name,
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
