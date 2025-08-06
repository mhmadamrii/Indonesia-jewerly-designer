import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, user } from "~/lib/db/schema";
import { DashboardReturnType, JewerlyWithMeta } from "~/lib/db/types";
import { getClient } from "~/lib/redis/config";

export const getExploreAssetDatas = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      theme: z.enum(["light", "dark", "system"]).optional(),
    }),
  )
  .handler(async ({ context, data }): Promise<DashboardReturnType> => {
    console.log("data", data.theme);
    const redis = await getClient();
    const cachedKey = `explore_data:${context.user.id}`;
    const cached = await redis.get(cachedKey);

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
          FROM jewerly_assets ja
          JOIN category c ON ja.category_id = c.id
          JOIN "user" u ON ja.user_id = u.id
          LEFT JOIN jewerly_asset_tags jat ON ja.id = jat.jewerly_asset_id
          LEFT JOIN tag t ON jat.tag_id = t.id
          GROUP BY ja.id, c.name, u.name, u.image
        `),

      db.select().from(user),
    ]);

    await redis.set(cachedKey, JSON.stringify({ categories, jewerlies, users }));

    return {
      success: true,
      data: {
        categories,
        jewerlies: jewerlies as unknown as JewerlyWithMeta[],
        users,
      },
    };
  });
