import { ClientOnly, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth/auth-client";
import { useRoleStore } from "~/lib/store/role.store";
import { useTheme } from "../theme-provider";
import { ThemeToggle } from "../theme-toggle";
import { Skeleton } from "../ui/skeleton";
import { UserAvatar } from "../user-avatar";

const menuItems = [
  {
    label: "Beranda",
    to: "/",
  },
  {
    label: "Koleksi",
    to: "/collections",
  },
  {
    label: "Designer",
    to: "/designers",
  },
  {
    label: "Tentang Kami",
    to: "#",
  },
];

export function HeaderLandingPage() {
  const navigate = useNavigate();
  const { setIsRoleChanging, setRole } = useRoleStore();
  const { theme } = useTheme();
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  useEffect(() => {
    setIsRoleChanging(false);
    setRole("user");
  }, []);

  return (
    <header className="border-border/40 bg-background/80 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <ClientOnly fallback={<div>Loading...</div>}>
            <Link className="" to="/">
              <img
                src={
                  theme === "dark" || theme === "system"
                    ? "/djiwaID-dark.svg"
                    : "/djiwaID.svg"
                }
                alt="djiwaID"
                className="h-[90px] w-[100px] object-contain"
              />
            </Link>
          </ClientOnly>

          <div className="flex items-baseline space-x-8">
            {menuItems.map((item, idx) => (
              <Link key={idx} to={`${item.to}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <ThemeToggle />
            {isSessionPending ? (
              <Skeleton className="h-8 w-8" />
            ) : session?.user ? (
              <UserAvatar user={session?.user} />
            ) : (
              <>
                <Button
                  onClick={() =>
                    navigate({
                      to: "/auth",
                    })
                  }
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-amber-600 bg-transparent text-amber-600 hover:bg-amber-50"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() =>
                    navigate({
                      to: "/auth",
                    })
                  }
                  size="sm"
                  className="cursor-pointer bg-amber-600 text-white hover:bg-amber-700"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
