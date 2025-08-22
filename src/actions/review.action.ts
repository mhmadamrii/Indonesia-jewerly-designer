import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { payments, review } from "~/lib/db/schema";

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
      await db.select().from(review).where(eq(review.jewelryAssetId, data.id)),
    ]);

    console.log("reviews", reviews);
    console.log("isUserOwnedProduct", isUserOwnedProduct);

    return {
      success: true,
      data: {
        reviews,
        isUserOwnedProduct: isUserOwnedProduct.length > 0,
      },
    };
  });
