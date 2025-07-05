import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { category, jewerlyAssets, user } from "~/lib/db/schema";
import { DashboardData } from "~/lib/db/types";
import { client } from "~/lib/redis/config";

type DashboardReturnType = {
  success: boolean;
  data: DashboardData;
};

export const getDashboard = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardReturnType> => {
    const cached = await client.get("dashboard_data");
    console.log("cc", cached);

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

    await client.set("dashboard_data", JSON.stringify({ categories, jewerlies, users }));

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
