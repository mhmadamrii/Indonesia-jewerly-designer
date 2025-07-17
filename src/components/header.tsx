import { useEffect, useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { SwitchRole } from "./switch-role";
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
  User,
  Wallet,
} from "lucide-react";

function InputCommandDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
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
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

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
          <InputCommandDialog open={open} setOpen={setOpen} />
        </div>
        <div className="flex items-center gap-4">
          <SwitchRole />
          <Button size="icon" variant="ghost" className="rounded-full border">
            <Bell />
          </Button>
          <CartDrawer />
        </div>
      </div>
    </div>
  );
}
