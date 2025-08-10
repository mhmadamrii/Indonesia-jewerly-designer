import { Loader } from "lucide-react";
import { useRoleStore } from "~/lib/store/role.store";

export function RoleRedirectProvider({ children }: { children: React.ReactNode }) {
  const { isRoleChanging } = useRoleStore();

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
