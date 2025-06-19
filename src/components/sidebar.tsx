import { Link, useLocation } from "@tanstack/react-router";
import { NAV_LINKS } from "~/constants";
import { cn } from "~/lib/utils";

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen w-[250px] flex-col gap-4 border-r p-4 sm:flex",
        // If you want it visible on all screen sizes, remove `hidden` and `sm:flex`
      )}
    >
      <Link className="w-full" to="/">
        <img
          src="/djiwaID.svg"
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

      <h1 className="mt-auto text-xl font-semibold">Profile</h1>
    </aside>
  );
}
