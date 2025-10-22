import { create } from "zustand";

type CartSyncStoreType = {
  cartItems: string[];
  setCartItems: (cartItems: string[]) => void;
};

export const cartSyncStore = create<CartSyncStoreType>((set) => ({
  cartItems: [],
  setCartItems: (cartItems) => set({ cartItems }),
}));
