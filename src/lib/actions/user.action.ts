import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";
import { db } from "../db";
import { something, user } from "../db/schema";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
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

export const createSomething = createServerFn({ method: "POST" }).handler(
  async (): Promise<any> => {
    const res = await db
      .insert(something)
      .values({
        id: Math.random().toString(),
        name: "something",
      })
      .returning({ id: something.id });

    return {
      success: true,
      data: res,
    };
  },
);
