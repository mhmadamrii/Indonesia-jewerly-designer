import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { authClient } from "~/lib/auth/auth-client";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { SearchInput } from "./ui/search-input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";

import {
  BanknoteArrowUp,
  Bell,
  CreditCard,
  Images,
  Settings,
  User,
  Wallet,
} from "lucide-react";

type Role = "user" | "artist";

export function Header() {
  const navigate = useNavigate();
  const roles: Role[] = ["user", "artist"];
  const [currentRole, setCurrentRole] = useState<Role>("user");

  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="px-2 py-1">
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <div>
          <SearchInput
            onFocus={() => setOpen(true)}
            className="bg-background rounded-full"
          />
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Images />
                  <span>My Assets</span>
                </CommandItem>
                <CommandItem>
                  <BanknoteArrowUp />
                  <span>Profit</span>
                </CommandItem>
                <CommandItem>
                  <Wallet />
                  <span>My Wallet</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-full border sm:flex">
            {roles.map((role) => (
              <Button
                key={role}
                onClick={() => setCurrentRole(role)}
                variant="ghost"
                className={cn(
                  "cursor-pointer rounded-full text-gray-300",
                  currentRole === role &&
                    "bg-background text-[#FF3B30] hover:text-[#FF3B30]/80",
                )}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>

          <Button size="icon" variant="ghost" className="rounded-full border">
            <Bell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session?.user.image ?? "https://github.com/shadcn.png"}
                />
                <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{session?.user.name}</DropdownMenuItem>
              <DropdownMenuItem>{session?.user.email}</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant="destructive"
                  className="w-full cursor-pointer"
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          navigate({
                            to: "/auth",
                          });
                        },
                      },
                    });
                  }}
                >
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
