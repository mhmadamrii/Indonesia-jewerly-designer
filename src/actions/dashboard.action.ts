import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, user } from "~/lib/db/schema";
import { DashboardReturnType, jewelryWithMeta } from "~/lib/db/types";
import { getClient } from "~/lib/redis/config";

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<DashboardReturnType> => {
    const redis = await getClient();
    const cacheKey = `dashboard_data:${context.user.id}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return {
        success: true,
        data: JSON.parse(cached),
      };
    }

    const [categories, jewerlies, users] = await Promise.all([
      db.select().from(category),
      db.execute(sql`
        SELECT ja.*, c.name AS category_name, u.name AS creator_name, u.image AS creator_image,
        string_agg(t.name, ', ') AS tags
        FROM jewelry_assets ja
        JOIN category c ON ja.category_id = c.id
        JOIN "user" u ON ja.user_id = u.id
        LEFT JOIN jewelry_asset_tags jat ON ja.id = jat.jewelry_asset_id
        LEFT JOIN tag t ON jat.tag_id = t.id
        WHERE ja.boost = 100
        GROUP BY ja.id, c.name, u.name, u.image
      `),
      db.select().from(user),
    ]);

    await redis.set(cacheKey, JSON.stringify({ categories, jewerlies, users }));

    return {
      success: true,
      data: {
        categories,
        jewerlies: jewerlies as unknown as jewelryWithMeta[],
        users,
      },
    };
  });
