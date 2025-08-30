import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { count, eq } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { follow, jewelryAssets, user } from "~/lib/db/schema";

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
