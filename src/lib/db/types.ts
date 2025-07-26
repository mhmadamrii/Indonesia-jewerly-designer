import type { InferSelectModel } from "drizzle-orm";
import {
  category as categoryTable,
  jewerlyAssets as jewerlyAssetsTable,
  user as userTable,
} from "./schema";

export type Category = InferSelectModel<typeof categoryTable>;
export type JewerlyAsset = InferSelectModel<typeof jewerlyAssetsTable>;
export type User = InferSelectModel<typeof userTable>;
export type UserWithRole = User & {
  role: string;
};

export type JewerlyWithMeta = {
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
  tags: string; // comma-separated string
};

export type DashboardReturnType = {
  success: boolean;
  data: {
    categories: Category[];
    jewerlies: JewerlyWithMeta[];
    users: User[];
  };
};

export type JewerlyWithUser = {
  jewerly_assets: JewerlyAsset;
  user: User | null;
  category: Category | null;
};

export type DashboardData = {
  categories: Category[];
  jewerlies: JewerlyWithUser[];
  users: User[];
};
