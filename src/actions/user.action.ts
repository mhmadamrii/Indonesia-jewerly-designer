import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { count, eq, sql } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { feedback, follow, jewelryAssets, settings, user } from "~/lib/db/schema";

export type UserById = Awaited<ReturnType<(typeof getUserById)>>["data"]; // prettier-ignore

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest();
  const session = await auth.api.getSession({ headers });

  return session?.user || null;
});

export const getAllUsers = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(user);
  return {
    success: true,
    data: res,
  };
});

export const getAllArtist = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(user).where(eq(user.role, "artist"));
  return {
    success: true,
    data: res,
  };
});

export const getAllFeedbacks = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db
    .select({
      feedback,
      user,
    })
    .from(feedback)
    .leftJoin(user, eq(feedback.userId, user.id))
    .orderBy(sql`${feedback.createdAt} DESC`);
  return {
    success: true,
    data: res,
  };
});

export const createPayoutRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      amount: z.number().positive(),
      paymentMethod: z.string().min(2),
      accountDetails: z.string().min(3),
      notes: z.string().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const inserted = await db
      .insert(feedback)
      .values({
        userId: context.user.id,
        message: data.notes || "Payout request",
        emote: "payout",
        type: "payout",
        isPayoutRequest: true,
        payoutAmount: Math.round(data.amount),
        payoutStatus: "pending",
      })
      .returning({ id: feedback.id });

    return { success: true, data: inserted[0] };
  });

export const getUserBoostCredits = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select({
        boostCredit: user.boostCredit,
      })
      .from(user)
      .where(eq(user.id, context.user.id));

    return {
      success: true,
      data: res[0],
    };
  });

export const registerToArtist = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .update(user)
      .set({ role: "artist" })
      .where(eq(user.id, context.user.id))
      .returning({ id: user.id });

    return {
      success: true,
      data: res[0],
    };
  });

export const getUserById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const res = await db.select().from(user).where(eq(user.id, data.id));

    return {
      success: true,
      data: res[0],
    };
  });

export const getUserProfileStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const [followings, followers, totalProducts] = await Promise.allSettled([
      db
        .select({
          count: count(),
        })
        .from(follow)
        .where(eq(follow.followingId, context.user.id)),
      db
        .select({
          count: count(),
        })
        .from(follow)
        .where(eq(follow.followerId, context.user.id)),
      db
        .select({
          count: count(),
        })
        .from(jewelryAssets)
        .where(eq(jewelryAssets.userId, context.user.id)),
    ]);

    return {
      success: true,
      data: {
        followings,
        followers,
        totalProducts,
      },
    };
  });

export const getUserSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select()
      .from(user)
      .leftJoin(settings, eq(user.id, settings.userId))
      .where(eq(user.id, context.user.id));

    return {
      success: true,
      data: res[0],
    };
  });

export const updateUserSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z
      .object({
        // profile
        bio: z.string().optional(),
        location: z.string().optional(),
        site: z.string().optional(),
        // privacy
        market_visibility: z.boolean().optional(),
        show_email: z.boolean().optional(),
        show_location: z.boolean().optional(),
        profile_visibility: z.enum(["public", "followers", "private"]).optional(),
        // notifications
        receive_email: z.boolean().optional(),
        receive_push: z.boolean().optional(),
        receive_order: z.boolean().optional(),
        receive_review: z.boolean().optional(),
        receive_follower: z.boolean().optional(),
        receive_marketing_email: z.boolean().optional(),
      })
      .refine((obj) => Object.keys(obj).length > 0, {
        message: "At least one field must be provided",
      }),
  )
  .handler(async ({ context, data }) => {
    console.log("data from client", data);
    const res = await db
      .update(settings)
      .set(data)
      .where(eq(settings.userId, context.user.id))
      .returning({ id: settings.id });

    return { success: true, data: res[0] };
  });
