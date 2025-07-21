import { motion } from "motion/react";
import { useState } from "react";
import { authClient } from "~/lib/auth/auth-client";
import { useRoleStore } from "~/lib/store/role.store";
import { cn } from "~/lib/utils";
import { DialogConfirmArtist } from "./dialog-confirm-artist";

type Role = "user" | "artist";
const roles: Role[] = ["user", "artist"];

export function SwitchRole() {
  const { data: session } = authClient.useSession();
  const [isOpenConfirmArtist, setIsOpenConfirmArtist] = useState(false);

  const {
    role: currentRole,
    setRole: setCurrentRole,
    setIsRoleChanging,
  } = useRoleStore();

  const handleRoleChange = async (newRole: Role) => {
    if (newRole === currentRole) return;

    setIsRoleChanging(true);
    try {
      // @ts-expect-error
      if (newRole === "artist" && session?.user?.role === "user") {
        setIsOpenConfirmArtist(true);
      } else {
        setCurrentRole(newRole);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <motion.div
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="hidden gap-2 rounded-full border p-1 sm:flex"
      >
        {roles.map((role, index) => {
          const isSelected = currentRole === role;
          return (
            <div key={role} className="relative">
              {isSelected && (
                <motion.div
                  layoutId="activeRoleHighlight"
                  className="absolute inset-0 rounded-full bg-[#EEEAFF]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                onClick={() => handleRoleChange(role)}
                className="relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="button"
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-2 text-gray-300 transition-colors",
                    isSelected && "text-[#FF3B30] hover:text-[#FF3B30]/80",
                  )}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
      <DialogConfirmArtist
        open={isOpenConfirmArtist}
        onClose={() => {
          setIsOpenConfirmArtist(false);
        }}
      />
    </>
  );
}
