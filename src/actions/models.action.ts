import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { jewerlyAssets } from "~/lib/db/schema";

export const getMyAssets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db.select().from(jewerlyAssets);

    return {
      success: true,
      data: res,
    };
  });
