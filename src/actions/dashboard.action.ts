import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import { db } from "~/lib/db";
import { category, user } from "~/lib/db/schema";
import { Category, User } from "~/lib/db/types";

export type JewerlyWithMeta = {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  asset_url: string;
  type_asset: string;
  user_id: string;
  category_id: string;
  created_at: Date;
  updated_at: Date;
  category_name: string;
  creator_name: string;
  creator_image: string;
  tags: string; // comma-separated string
};

type DashboardReturnType = {
  success: boolean;
  data: {
    categories: Category[];
    jewerlies: JewerlyWithMeta[];
    users: User[];
  };
};

export const getDashboard = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardReturnType> => {
    // const redis = await getClient();
    // const cached = await redis.get("dashboard_data");

    // if (cached) {
    //   return {
    //     success: true,
    //     data: JSON.parse(cached),
    //   };
    // }

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

    // await redis.set("dashboard_data", JSON.stringify({ categories, jewerlies, users }));

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
