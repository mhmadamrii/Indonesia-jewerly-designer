export interface Asset {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  modelUrl: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
  };
  downloads: number;
  rating: number;
  createdAt: string;
}

export interface CartItem {
  asset: Asset;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "buyer" | "seller";
  rating: number;
  joinDate: string;
}

export type UserRole = "buyer" | "seller";
