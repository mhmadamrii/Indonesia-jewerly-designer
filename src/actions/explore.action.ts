import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { category, user } from "~/lib/db/schema";
import { DashboardReturnType, JewerlyWithMeta } from "~/lib/db/types";

export const getExploreAssetDatas = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardReturnType> => {
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

    console.log("jewerlies", jewerlies);

    return {
      success: true,
      data: {
        categories,
        jewerlies: jewerlies as unknown as JewerlyWithMeta[],
        users,
      },
    };
  },
);
