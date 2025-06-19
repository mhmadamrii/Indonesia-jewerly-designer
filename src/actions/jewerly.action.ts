import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { category } from "~/lib/db/schema";

export const getAllCategories = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(category);
  return {
    success: true,
    data: res,
  };
});
