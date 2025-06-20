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
  jewerlyForm: Form;
  addJewerlyForm: (form: Form) => void;
  resetJewerlyForm: () => void;
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
      jewerlyForm: defaultForm,
      addJewerlyForm: (form) => set(() => ({ jewerlyForm: form })),
      resetJewerlyForm: () => set(() => ({ jewerlyForm: defaultForm })),
    }),
    {
      name: "form-djiwa-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
