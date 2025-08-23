import { createServerFn } from "@tanstack/react-start";
import { count, eq, sql } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import {
  category,
  jewelryAssets,
  jewelryAssetTags,
  payments,
  review,
  tag,
  user,
} from "~/lib/db/schema";

export type FeedsDataType = Awaited<ReturnType<(typeof getFeeds)>>["data"]; // prettier-ignore
export type TrendingJewelriesType = Awaited<ReturnType<typeof getFeeds>>["data"]["trendingJewelries"]; // prettier-ignore
export type TopArtistType = Awaited<ReturnType<typeof getFeeds>>["data"]["topArtists"]; // prettier-ignore

export const getFeeds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const [categories, jewelries, users] = await Promise.all([
      db.select().from(category),
      db
        .select({
          jewelry_assets: jewelryAssets,
          category: category,
          user: user,
          tags: sql<
            string[]
          >`array_agg(${tag.name}) FILTER (WHERE ${tag.name} IS NOT NULL)`,
          reviewCount: sql<number>`COUNT(${review.id})::int`,
        })
        .from(jewelryAssets)
        .innerJoin(category, eq(jewelryAssets.categoryId, category.id))
        .innerJoin(user, eq(jewelryAssets.userId, user.id))
        .leftJoin(jewelryAssetTags, eq(jewelryAssets.id, jewelryAssetTags.jewelryAssetId))
        .leftJoin(tag, eq(jewelryAssetTags.tagId, tag.id))
        .where(eq(jewelryAssets.boost, 100))
        .leftJoin(review, eq(review.jewelryAssetId, jewelryAssets.id))
        .groupBy(jewelryAssets.id, category.id, user.id),
      db
        .select({
          user: user, // all user info
          soldCount: sql<number>`COUNT(${payments.id})::int`,
        })
        .from(payments)
        .innerJoin(jewelryAssets, eq(payments.jewelryAssetId, jewelryAssets.id))
        .innerJoin(user, eq(jewelryAssets.userId, user.id)) // link payment → jewelry → artist
        .where(eq(payments.status, "capture")) // only count successful payments
        .groupBy(user.id)
        .orderBy(sql`COUNT(${payments.id}) DESC`)
        .limit(5),
    ]);

    console.log("jewelries", jewelries);

    return {
      success: true,
      data: {
        categories,
        trendingJewelries: jewelries,
        topArtists: users,
      },
    };
  });

export const getFeedSummary = createServerFn({ method: "GET" }).handler(async () => {
  const [totalAssets, totalArtists] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(jewelryAssets),
    await db
      .select({
        count: count(),
      })
      .from(user)
      .where(sql`role = 'user'`),
  ]);

  return {
    success: true,
    data: {
      totalAssets: totalAssets[0].count,
      totalArtists: totalArtists[0].count,
    },
  };
});

export const getArtistDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const [totalAssets, totalArtists] = await Promise.all([
    await db
      .select({
        count: count(),
      })
      .from(jewelryAssets),
    await db
      .select({
        count: count(),
      })
      .from(user)
      .where(sql`role = 'user'`),
  ]);

  return {
    success: true,
    data: {
      totalAssets: totalAssets[0].count,
      totalArtists: totalArtists[0].count,
    },
  };
});
