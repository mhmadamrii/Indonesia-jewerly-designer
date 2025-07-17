import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRoleStore } from "~/lib/store/role.store";

export function RoleRedirectProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { role: currentRole, isRoleChanging } = useRoleStore();
  console.log("current role provider", currentRole);

  useEffect(() => {
    if (currentRole === "artist") {
      navigate({
        to: "/~/artist/dashboard",
      });
    } else {
      navigate({
        to: "/~/general/feed",
      });
    }
  }, [currentRole]);

  return (
    <>
      {isRoleChanging && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/50">
          <Loader className="animate-spin" />
        </div>
      )}
      {children}
    </>
  );
}
