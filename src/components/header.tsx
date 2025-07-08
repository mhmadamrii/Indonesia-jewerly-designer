import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/animate-ui/base/popover";
import { authClient } from "~/lib/auth/auth-client";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { SearchInput } from "./ui/search-input";

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
  ShoppingCart,
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
            className="bg-background min-w-[320px] rounded-full"
            placeholder="Search Item, Collections, and Accounts"
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
          <motion.div
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="hidden gap-2 rounded-full border p-1 sm:flex"
          >
            {roles.map((role, index) => {
              const isSelected = currentRole === role;
              return (
                <div key={role} className="relative">
                  {isSelected && (
                    <motion.div
                      layoutId="activeRoleHighlight"
                      className="absolute inset-0 rounded-full bg-[#EEEAFF]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <motion.div
                    onClick={() => setCurrentRole(role)}
                    className="relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      className={cn(
                        "cursor-pointer rounded-full px-4 py-2 text-gray-300 transition-colors",
                        isSelected && "text-[#FF3B30] hover:text-[#FF3B30]/80",
                      )}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <Button size="icon" variant="ghost" className="rounded-full border">
            <Bell />
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button size="icon" variant="ghost" className="rounded-full border">
                <ShoppingCart />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, odio
                incidunt voluptatem aperiam dolor nemo recusandae blanditiis maxime
                nesciunt, magni pariatur. Reprehenderit consequuntur inventore, itaque
                iste, nisi suscipit sint eos quaerat cumque nesciunt magni nemo molestiae
              </p>
            </PopoverContent>
          </Popover>
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>
      </div>
    </div>
  );
}
