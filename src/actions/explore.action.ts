import { createServerFn } from "@tanstack/react-start";
import { eq, InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewerlyAssets, user } from "~/lib/db/schema";

export const searchParamSchema = z.object({
  artist: z.string().optional(),
  category: z.string().optional(),
});

export type JewerlyWithJoins = {
  jewerly_assets: InferSelectModel<typeof jewerlyAssets>;
  category: InferSelectModel<typeof category>;
  user: InferSelectModel<typeof user>;
};

export interface IExploreProps {
  assets: InferSelectModel<typeof jewerlyAssets>[];
}

export const getExploreAssetDatas = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(searchParamSchema)
  .handler(async ({ context, data }) => {
    const [categories, jewerlies, users] = await Promise.all([
      db.select().from(category),
      db
        .select()
        .from(jewerlyAssets)
        .innerJoin(category, eq(jewerlyAssets.categoryId, category.id))
        .innerJoin(user, eq(jewerlyAssets.userId, user.id))
        .where(
          data?.category
            ? eq(jewerlyAssets.categoryId, data.category)
            : data.artist
              ? eq(jewerlyAssets.userId, data.artist)
              : undefined,
        ),
      db.select().from(user),
    ]);

    return {
      success: true,
      data: {
        categories,
        jewerlies: jewerlies,
        users,
      },
    };
  });

export const getFilterExploreAsset = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const [categories, artists] = await Promise.all([
      db.select().from(category),
      db.select().from(user).where(eq(user.role, "artist")),
    ]);

    return {
      success: true,
      data: {
        categories,
        artists,
      },
    };
  });
