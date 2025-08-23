import { createServerFn } from "@tanstack/react-start";
import { and, count, eq, sql } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import {
  cartItem,
  category,
  follow,
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
export type ArtistDashboardAndAnalyticsType = Awaited<ReturnType<typeof getArtistDashboardAndAnalytics>>["data"] // prettier-ignore

export const getFeeds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({}) => {
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

export const getArtistDashboardAndAnalytics = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    // get current user amount payments where is paid to user is true (total revenues)
    // get current user products where in cart
    // get user average rating from all products
    // get user followers count

    const [totalRevenue, productsInCart, followers, artistProducts, assetReviews] =
      await Promise.all([
        await db
          .select({
            amount: payments.amount,
          })
          .from(payments)
          .where(
            and(eq(payments.userId, context.user.id), eq(payments.isPaidToUser, true)),
          ),
        await db
          .select({
            count: count(),
          })
          .from(cartItem)
          .innerJoin(jewelryAssets, eq(cartItem.jewelryAssetId, jewelryAssets.id))
          .where(eq(jewelryAssets.userId, context.user.id)),
        await db
          .select({
            count: count(),
          })
          .from(follow)
          .where(eq(follow.followingId, context.user.id)),
        await db
          .select()
          .from(jewelryAssets)
          .innerJoin(category, eq(category.id, jewelryAssets.categoryId))
          .where(eq(jewelryAssets.userId, context.user.id)),
        await db
          .select()
          .from(review)
          .innerJoin(user, eq(review.userId, user.id))
          .innerJoin(jewelryAssets, eq(review.jewelryAssetId, jewelryAssets.id))
          .where(eq(jewelryAssets.userId, context.user.id)),
      ]);

    return {
      success: true,
      data: {
        totalRevenue,
        productsInCart: productsInCart[0].count,
        averageRatings: 5,
        followers: followers[0].count,
        artistProducts,
        assetReviews,
      },
    };
  });

/**
 * todo: earnings and payouts
 */
// get current user amount payments where is paid to user is true (total earnings)
// get current user amount payments where is paid to user is false (pending earnings)
// get current user total payments length (confirmed sales)
