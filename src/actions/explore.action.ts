import { createServerFn } from "@tanstack/react-start";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { and, eq, gte, InferSelectModel, lte } from "drizzle-orm";
import { z } from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewelryAssets, user } from "~/lib/db/schema";

export const exploreSearchParamSchema = z.object({
  artist: z.string().optional(),
  category: z.string().optional(),
  sort: z.string().optional(),
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
});

export type jewelryWithJoins = {
  jewelry_assets: InferSelectModel<typeof jewelryAssets>;
  category: InferSelectModel<typeof category>;
  user: InferSelectModel<typeof user>;
};

export interface IExploreProps {
  assets: InferSelectModel<typeof jewelryAssets>[];
}

export const getExploreAssetDatas = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(exploreSearchParamSchema)
  .handler(async ({ context, data }) => {
    const filters = [];

    // Category filter
    if (data.category) {
      filters.push(eq(jewelryAssets.categoryId, data.category));
    }

    // Artist filter
    if (data.artist) {
      filters.push(eq(jewelryAssets.userId, data.artist));
    }

    // Price range
    if (data.priceFrom !== undefined) {
      filters.push(gte(jewelryAssets.price, data.priceFrom));
    }
    if (data.priceTo !== undefined) {
      filters.push(lte(jewelryAssets.price, data.priceTo));
    }

    // Sorting / special filters
    if (data.sort) {
      const now = new Date();

      if (data.sort === "popular") {
        // filters.push(gt(jewelryAssets.sold, 10));
      }

      if (data.sort === "trending") {
        // filters.push(gt(jewelryAssets.likes, 20));
      }

      if (data.sort === "latest") {
        filters.push(gte(jewelryAssets.createdAt, startOfMonth(now)));
      }

      if (data.sort === "oldest") {
        const prevMonthStart = startOfMonth(subMonths(now, 1));
        const prevMonthEnd = endOfMonth(subMonths(now, 1));
        filters.push(
          gte(jewelryAssets.createdAt, prevMonthStart),
          lte(jewelryAssets.createdAt, prevMonthEnd),
        );
      }
    }

    const [categories, jewelries, users] = await Promise.all([
      db.select().from(category),
      db
        .select()
        .from(jewelryAssets)
        .innerJoin(category, eq(jewelryAssets.categoryId, category.id))
        .innerJoin(user, eq(jewelryAssets.userId, user.id))
        .where(filters.length > 0 ? and(...filters) : undefined),
      db.select().from(user),
    ]);

    return {
      success: true,
      data: {
        categories,
        jewelries: jewelries,
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
