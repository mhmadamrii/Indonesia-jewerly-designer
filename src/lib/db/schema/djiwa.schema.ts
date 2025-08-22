import { relations } from "drizzle-orm";
import { user } from "./auth.schema";

import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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

export const jewelryAssets = pgTable("jewelry_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  previewUrl: text("preview_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  assetUrl: text("asset_url").notNull(),
  typeAsset: text("type_asset").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  boost: integer("boost").default(0),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jewelryAssetTags = pgTable(
  "jewelry_asset_tags",
  {
    jewelryAssetId: uuid("jewelry_asset_id")
      .notNull()
      .references(() => jewelryAssets.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey(t.jewelryAssetId, t.tagId),
  }),
);

export const review = pgTable("review", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  rating: integer("rating").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  jewelryAssetId: uuid("jewelry_asset_id")
    .notNull()
    .references(() => jewelryAssets.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notification = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  type: text("type"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItem = pgTable("cart_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  jewelryAssetId: uuid("jewelry_asset_id")
    .notNull()
    .references(() => jewelryAssets.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wishlistItem = pgTable("wishlist_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  jewelryAssetId: uuid("jewelry_asset_id")
    .notNull()
    .references(() => jewelryAssets.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  jewelryAssetId: uuid("jewelry_asset_id")
    .notNull()
    .references(() => jewelryAssets.id, { onDelete: "cascade" }),
  amount: text("amount").notNull(),
  status: text("status").notNull(),
  currency: varchar("currency", { length: 100 }).notNull(),
  provider: varchar("provider", { length: 100 }).notNull(),
  providerId: varchar("provider_id", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

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

/**
 * Relations
 */

export const userRelations = relations(user, ({ many }) => ({
  jewelryAssets: many(jewelryAssets),
  cartItems: many(cartItem),
  wishlistItems: many(wishlistItem),
  reviews: many(review),
  notifications: many(notification),
  payments: many(payments),
  followers: many(follow, { relationName: "followers" }),
  followings: many(follow, { relationName: "followings" }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  jewelryAssets: many(jewelryAssets),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  jewelryAssetTags: many(jewelryAssetTags),
}));

export const jewelryAssetsRelations = relations(jewelryAssets, ({ one, many }) => ({
  user: one(user, {
    fields: [jewelryAssets.userId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [jewelryAssets.categoryId],
    references: [category.id],
  }),
  reviews: many(review),
  jewelryAssetTags: many(jewelryAssetTags),
  cartItems: many(cartItem),
  wishlistItems: many(wishlistItem),
  payments: many(payments),
}));

export const jewelryAssetTagsRelations = relations(jewelryAssetTags, ({ one }) => ({
  jewelryAsset: one(jewelryAssets, {
    fields: [jewelryAssetTags.jewelryAssetId],
    references: [jewelryAssets.id],
  }),
  tag: one(tag, {
    fields: [jewelryAssetTags.tagId],
    references: [tag.id],
  }),
}));

export const reviewRelations = relations(review, ({ one }) => ({
  user: one(user, {
    fields: [review.userId],
    references: [user.id],
  }),
  jewelryAsset: one(jewelryAssets, {
    fields: [review.jewelryAssetId],
    references: [jewelryAssets.id],
  }),
}));

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id],
  }),
}));

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  user: one(user, {
    fields: [cartItem.userId],
    references: [user.id],
  }),
  jewelryAsset: one(jewelryAssets, {
    fields: [cartItem.jewelryAssetId],
    references: [jewelryAssets.id],
  }),
}));

export const wishlistItemRelations = relations(wishlistItem, ({ one }) => ({
  user: one(user, {
    fields: [wishlistItem.userId],
    references: [user.id],
  }),
  jewelryAsset: one(jewelryAssets, {
    fields: [wishlistItem.jewelryAssetId],
    references: [jewelryAssets.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(user, {
    fields: [payments.userId],
    references: [user.id],
  }),
  jewelryAsset: one(jewelryAssets, {
    fields: [payments.jewelryAssetId],
    references: [jewelryAssets.id],
  }),
}));

export const followRelations = relations(follow, ({ one }) => ({
  follower: one(user, {
    fields: [follow.followerId],
    references: [user.id],
    relationName: "followers",
  }),
  following: one(user, {
    fields: [follow.followingId],
    references: [user.id],
    relationName: "followings",
  }),
}));
