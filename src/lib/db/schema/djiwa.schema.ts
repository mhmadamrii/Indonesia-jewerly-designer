import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const notificationTypeEnum = pgEnum("notification_type", [
  "new_review",
  "price_drop",
  "back_in_stock",
  "other",
]);

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const jewerlyAssets = pgTable("jewerly_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url"),
  userId: text("user_id").notNull(),
  categoryId: uuid("category_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const review = pgTable("review", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  userId: text("user_id").notNull(),
  jewerlyAssetId: text("jewerly_asset_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const notification = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  message: text("message").notNull(), // Notification content
  isRead: boolean("is_read") // Whether the user has read it
    .default(false)
    .notNull(),
  type: notificationTypeEnum("type"),
  createdAt: timestamp("created_at").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  jewerlyAssets: many(jewerlyAssets),
}));

export const jewerlyAssetsRelations = relations(jewerlyAssets, ({ many }) => ({
  reviews: many(review),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  jewerlyAssets: many(jewerlyAssets),
}));
