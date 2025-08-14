import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Form = {
  title: string;
  price: number;
  currency: string;
  category: string;
  desc: string;
  image_url?: string | undefined;
  type_asset: string;
};

type FormState = {
  jewelryForm: Form;
  addjewelryForm: (form: Form) => void;
  resetjewelryForm: () => void;
};

const defaultForm: Form = {
  title: "",
  price: 0,
  currency: "",
  category: "",
  desc: "",
  image_url: "",
  type_asset: "",
};

export const useFormStorage = create<FormState>()(
  persist(
    (set) => ({
      jewelryForm: defaultForm,
      addjewelryForm: (form) => set(() => ({ jewelryForm: form })),
      resetjewelryForm: () => set(() => ({ jewelryForm: defaultForm })),
    }),
    {
      name: "form-djiwa-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
