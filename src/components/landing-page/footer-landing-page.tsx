import { Link } from "@tanstack/react-router";
import { DribbbleIcon, TwitterIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { useTheme } from "../theme-provider";

const footerLinks = [
  {
    title: "Overview",
    to: "#",
  },
  {
    title: "Features",
    to: "#",
  },
  {
    title: "Pricing",
    to: "#",
  },
  {
    title: "Careers",
    to: "#",
  },
  {
    title: "Help",
    to: "#",
  },
  {
    title: "Privacy",
    to: "#",
  },
];

export function FooterLandingPage() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col">
      <div className="bg-muted grow" />
      <footer>
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-6 py-12 sm:flex-row xl:px-0">
            <div>
              <img
                src={
                  theme === "dark" || theme === "system"
                    ? "/djiwaID-dark.svg"
                    : "/djiwaID.svg"
                }
                alt="djiwaID"
                className="h-[90px] w-[100px] object-contain"
              />

              <ul className="mt-6 flex flex-wrap items-center gap-4">
                {footerLinks.map(({ title, to }) => (
                  <li key={title}>
                    <Link to={to} className="text-muted-foreground hover:text-foreground">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Newsletter */}
            <div className="w-full max-w-xs">
              <h6 className="font-semibold">Stay up to date</h6>
              <form className="mt-6 flex items-center gap-2">
                <Input type="email" placeholder="Enter your email" />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" target="_blank">
                Indonesia Jewerly Designer
              </Link>
              . All rights reserved.
            </span>

            <div className="text-muted-foreground flex items-center gap-5">
              <Link to="/" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link to="/" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
