import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { category, jewerlyAssets, user } from "~/lib/db/schema";

export const getDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const [categories, jewerlies, users] = await Promise.all([
    db.select().from(category),
    db.select().from(jewerlyAssets),
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
