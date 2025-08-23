import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { feedback, payments, review, user } from "~/lib/db/schema";

export const createReview = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(1).max(50),
      description: z.string().min(1).max(200),
      rating: z.number().min(1).max(5),
      productId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const { title, description, rating, productId } = data;

    const newReview = await db
      .insert(review)
      .values({
        title,
        description,
        rating,
        jewelryAssetId: productId,
        userId: context.user.id,
      })
      .returning({ id: review.id });

    return {
      success: true,
      data: newReview,
    };
  });

export const getReviewByAssetId = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data, context }) => {
    const [isUserOwnedProduct, reviews] = await Promise.all([
      await db
        .select()
        .from(payments)
        .where(
          and(eq(payments.jewelryAssetId, data.id), eq(payments.userId, context.user.id)),
        ),
      await db
        .select({
          id: review.id,
          user: user.name,
          userImage: user.image,
          description: review.description,
          rating: review.rating,
          reviewDate: review.createdAt,
        })
        .from(review)
        .innerJoin(user, eq(review.userId, user.id))
        .where(eq(review.jewelryAssetId, data.id)),
    ]);

    return {
      success: true,
      data: {
        reviews,
        isUserOwnedProduct: isUserOwnedProduct.length > 0,
      },
    };
  });

export const createFeedback = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string().min(1).max(200),
      emote: z.string().min(1).max(50),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const { message, emote } = data;

    const newFeedback = await db
      .insert(feedback)
      .values({
        message,
        emote,
      })
      .returning({ id: review.id });

    return {
      success: true,
      data: newFeedback[0],
    };
  });
