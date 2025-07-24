import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tag = pgTable("tag", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jewerlyAssets = pgTable("jewerly_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  assetUrl: text("asset_url").notNull(),
  typeAsset: text("type_asset").notNull(),
  userId: text("user_id").notNull(),
  categoryId: uuid("category_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jewerlyAssetTags = pgTable(
  "jewerly_asset_tags",
  {
    jewerlyAssetId: uuid("jewerly_asset_id")
      .notNull()
      .references(() => jewerlyAssets.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey(t.jewerlyAssetId, t.tagId),
  }),
);

export const review = pgTable("review", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  userId: text("user_id").notNull(),
  jewerlyAssetId: text("jewerly_asset_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  jewerlyAssets: many(jewerlyAssets),
}));

export const jewerlyAssetsRelations = relations(jewerlyAssets, ({ many }) => ({
  reviews: many(review),
  jewerlyAssetTags: many(jewerlyAssetTags),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  jewerlyAssetTags: many(jewerlyAssetTags),
}));

export const jewerlyAssetTagsRelations = relations(jewerlyAssetTags, ({ one }) => ({
  jewerlyAsset: one(jewerlyAssets, {
    fields: [jewerlyAssetTags.jewerlyAssetId],
    references: [jewerlyAssets.id],
  }),
  tag: one(tag, {
    fields: [jewerlyAssetTags.tagId],
    references: [tag.id],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  jewerlyAssets: many(jewerlyAssets),
}));

export const follow = pgTable(
  "follow",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.followerId, table.followingId] }),
  }),
);
