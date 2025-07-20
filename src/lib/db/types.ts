import type { InferSelectModel } from "drizzle-orm";
import {
  category as categoryTable,
  jewerlyAssets as jewerlyAssetsTable,
  user as userTable,
} from "./schema";

export type Category = InferSelectModel<typeof categoryTable>;
export type JewerlyAsset = InferSelectModel<typeof jewerlyAssetsTable>;
export type User = InferSelectModel<typeof userTable>;

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
