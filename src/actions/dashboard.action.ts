import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { category, jewerlyAssets, user } from "~/lib/db/schema";

export const getDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const [categories, jewerlies, users] = await Promise.all([
    db.select().from(category),
    db.select().from(jewerlyAssets).leftJoin(user, eq(user.id, jewerlyAssets.userId)),
    db.select().from(user),
  ]);

  return {
    success: true,
    data: {
      categories,
      jewerlies,
      users,
    },
  };
});
