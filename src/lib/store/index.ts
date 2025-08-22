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

type Draft = {
  id: string;
  formValues: string;
  tagsValue: string;
  imageUrl: string;
};

type FormState = {
  jewelryForm: Form;
  drafts: Draft[];
  removeDraft: (id: string) => void;
  addjewelryForm: (form: Form) => void;
  addDraft: (draft: Draft) => void;
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
      drafts: [],
      addjewelryForm: (form) => set(() => ({ jewelryForm: form })),
      addDraft: (draft) =>
        set((state) => ({
          drafts: [...state.drafts, draft],
        })),
      removeDraft: (id: string) =>
        set((state) => ({
          drafts: state.drafts.filter((draft) => draft.id !== id),
        })),
      resetjewelryForm: () => set(() => ({ jewelryForm: defaultForm })),
    }),
    {
      name: "form-djiwa-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
