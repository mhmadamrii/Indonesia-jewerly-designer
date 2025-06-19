import { createServerFn } from "@tanstack/react-start";
import * as z from "zod";
import { db } from "~/lib/db";
import { category } from "~/lib/db/schema";

const CategorySchema = z.object({
  name: z.string(),
});

export const getAllCategories = createServerFn({ method: "GET" }).handler(async () => {
  const res = await db.select().from(category);
  return {
    success: true,
    data: res,
  };
});

export const createCategory = createServerFn({ method: "POST" })
  .validator(CategorySchema)
  .handler(async ({ data }) => {
    console.log("data", data.name);
    const res = await db
      .insert(category)
      .values({
        name: data.name,
        description: "lorem ipsum",
      })
      .returning({ id: category.id });

    return {
      success: true,
      data: res[0],
    };
  });
