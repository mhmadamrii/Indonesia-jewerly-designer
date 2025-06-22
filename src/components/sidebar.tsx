import { Link, useLocation } from "@tanstack/react-router";
import { NAV_LINKS } from "~/constants";
import { cn } from "~/lib/utils";
import { useTheme } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";

export function Sidebar() {
  const location = useLocation();
  const { theme } = useTheme();
  console.log(theme);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen w-[250px] flex-col gap-4 border-r p-4 sm:flex",
      )}
    >
      <Link className="w-full" to="/">
        <img
          src={
            theme === "dark" || theme === "system" ? "/djiwaID-dark.svg" : "/djiwaID.svg"
          }
          alt="djiwaID"
          className="h-[100px] w-[120px] object-contain"
        />
      </Link>

      {NAV_LINKS.map(({ to, label, logo }) => (
        <Link
          className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100"
          key={to}
          to={to}
        >
          <img src={logo} alt="logo" className="h-[30px] w-[20px]" />
          <span className={cn("", { "text-[#FF3B30]": location.pathname === to })}>
            {label}
          </span>
        </Link>
      ))}
      <ThemeToggle />
    </aside>
  );
}
