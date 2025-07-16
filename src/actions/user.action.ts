import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { user } from "~/lib/db/schema";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  console.log("Hello world");
  const { headers } = getWebRequest();
  const session = await auth.api.getSession({ headers });

  return session?.user || null;
});

export const getAllUsers = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(user);
  return {
    success: true,
    data: res,
  };
});

export const registerToArtist = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .update(user)
      .set({ role: "artist" })
      .where(eq(user.id, context.user.id))
      .returning({ id: user.id });

    return {
      success: true,
      data: res[0],
    };
  });
