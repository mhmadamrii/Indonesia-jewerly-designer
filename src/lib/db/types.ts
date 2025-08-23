import type { InferSelectModel } from "drizzle-orm";
import {
  category as categoryTable,
  jewelryAssets as jewelryAssetsTable,
  user as userTable,
} from "./schema";

export type Category = InferSelectModel<typeof categoryTable>;
export type jewelryAsset = InferSelectModel<typeof jewelryAssetsTable>;
export type User = InferSelectModel<typeof userTable>;
export type UserWithRole = User & {
  role: string;
};

export type jewelryWithMeta = {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  asset_url: string;
  type_asset: string;
  user_id: string;
  category_id: string;
  created_at: Date;
  updated_at: Date;
  category_name: string;
  creator_name: string;
  creator_image: string;
  preview_url: string;
  tags: string; // comma-separated string
};

export type DashboardReturnType = {
  success: boolean;
  data: {
    categories: Category[];
    jewelries: jewelryWithMeta[];
    users: User[];
  };
};

export type jewelryWithUser = {
  jewelry_assets: jewelryAsset;
  user: User | null;
  category: Category | null;
};

export type DashboardData = {
  categories: Category[];
  jewelries: jewelryWithUser[];
  users: User[];
};
