import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { category, jewerlyAssets, user } from "~/lib/db/schema";
import { DashboardData } from "~/lib/db/types";
import { getClient } from "~/lib/redis/config";

type DashboardReturnType = {
  success: boolean;
  data: DashboardData;
};

export const getDashboard = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardReturnType> => {
    const redis = await getClient();
    const cached = await redis.get("dashboard_data");

    if (cached) {
      return {
        success: true,
        data: JSON.parse(cached),
      };
    }

    const [categories, jewerlies, users] = await Promise.all([
      db.select().from(category),
      db.select().from(jewerlyAssets).leftJoin(user, eq(user.id, jewerlyAssets.userId)),
      db.select().from(user),
    ]);

    await redis.set("dashboard_data", JSON.stringify({ categories, jewerlies, users }));

    return {
      success: true,
      data: {
        categories,
        jewerlies,
        users,
      },
    };
  },
);
