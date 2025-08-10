import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRoleStore } from "~/lib/store/role.store";

export function RoleRedirectProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { location } = useRouterState(); // get current path
  const { role: currentRole, isRoleChanging } = useRoleStore();

  const prevRoleRef = useRef<string | null>(null);

  useEffect(() => {
    if (!currentRole) return;

    const targetPath = currentRole === "artist" ? "/~/artist/dashboard" : "/~/general/feed"; // prettier-ignore

    if (prevRoleRef.current !== currentRole && location.pathname !== targetPath) {
      navigate({ to: targetPath });
    }

    prevRoleRef.current = currentRole;
  }, [currentRole, location.pathname, navigate]);

  return (
    <>
      {isRoleChanging && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full cursor-not-allowed flex-col items-center justify-center bg-black/50">
          <Loader className="animate-spin" />
        </div>
      )}
      {children}
    </>
  );
}
