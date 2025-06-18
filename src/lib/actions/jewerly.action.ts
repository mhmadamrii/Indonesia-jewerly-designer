import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import { category } from "../db/schema";

export const getAllCategories = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(category);
  return {
    success: true,
    data: res,
  };
});
