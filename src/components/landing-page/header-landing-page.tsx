import { ClientOnly, Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTheme } from "../theme-provider";
import { ThemeToggle } from "../theme-toggle";

export function HeaderLandingPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <ClientOnly fallback={<div>Loading...</div>}>
            <Link className="w-full" to="/">
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

          <div className="hidden items-center space-x-4 md:flex">
            <Button variant="ghost" size="sm" className="hover:text-amber-600">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-amber-600">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <ThemeToggle />
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
          </div>
        </div>
      </div>
    </header>
  );
}
