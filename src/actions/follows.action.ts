import { createServerFn } from "@tanstack/react-start";
import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { follow } from "~/lib/db/schema";

export const getFollows = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const [followings, followers] = await Promise.allSettled([
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
    ]);

    return {
      success: true,
      data: {
        followings,
        followers,
      },
    };
  });

export const followUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const res = await db
      .insert(follow)
      .values({
        followerId: context.user.id,
        followingId: data.userId,
      })
      .returning({ id: follow.followingId });

    return {
      success: true,
      data: res[0],
    };
  });
