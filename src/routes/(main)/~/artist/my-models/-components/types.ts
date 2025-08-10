export interface JewelryAsset {
  id: string;
  name: string;
  description: string;
  price: number;
  previewUrl: string;
  thumbnailUrl: string;
  assetUrl: string;
  typeAsset: string;
  userId: string;
  boost: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  boostCredit: number;
  userStorageLimit: number;
  userStorageUsage: number;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface JewelryAssetWithRelations extends JewelryAsset {
  user: User;
  category: Category;
}
