import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "user" | "artist";

type RoleStore = {
  role: Role;
  isRoleChanging: boolean;
  setRole: (role: Role) => void;
  setIsRoleChanging: (isRoleChanging: boolean) => void;
};

export const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: "user",
      isRoleChanging: false,
      setRole: (role) => set({ role }),
      setIsRoleChanging: (isRoleChanging) => set({ isRoleChanging }),
    }),
    {
      name: "role-storage",
    },
  ),
);
