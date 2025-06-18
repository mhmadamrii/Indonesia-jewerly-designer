import { Link, useLocation } from "@tanstack/react-router";
import { NAV_LINKS } from "~/constants";
import { cn } from "~/lib/utils";

export function Sidebar() {
  const location = useLocation();
  return (
    <aside
      className={cn("sticky top-0 z-30 hidden w-1/5 flex-col gap-2.5 border p-4 sm:flex")}
    >
      <Link className="w-full" to="/">
        <img src="/djiwaID.svg" alt="djiwaID" className="h-[100px] w-[120px]" />
      </Link>
      {NAV_LINKS.map(({ to, label, logo }) => {
        return (
          <Link className="flex items-center gap-2 p-2" key={to} to={to}>
            <img src={logo} alt="logo" className="h-[30px] w-[20px] text-red-500" />
            <span
              className={cn("", {
                "text-[#FF3B30]": location.pathname == to,
              })}
            >
              {label}
            </span>
          </Link>
        );
      })}
      <h1 className="texl-xl font-semibold">Profile</h1>
    </aside>
  );
}
