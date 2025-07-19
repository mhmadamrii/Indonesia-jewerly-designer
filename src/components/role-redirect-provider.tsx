import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRoleStore } from "~/lib/store/role.store";

export function RoleRedirectProvider({
  children,
  sessionRole,
}: {
  children: React.ReactNode;
  sessionRole: string;
}) {
  const navigate = useNavigate();

  const { role: currentRole, isRoleChanging } = useRoleStore();

  useEffect(() => {
    if (currentRole === "artist" && sessionRole === "artist") {
      navigate({
        to: "/~/artist/dashboard",
      });
    } else {
      navigate({
        to: "/~/general/feed",
      });
    }
  }, [currentRole, sessionRole]);

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
