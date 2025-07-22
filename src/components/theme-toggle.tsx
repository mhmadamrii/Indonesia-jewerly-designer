import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/components/theme-provider";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { Switch } from "./animate-ui/base/switch";

interface ThemeToggleProps {
  isSidebarCollapsed?: boolean;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center justify-between space-x-2",
        // !isSidebarCollapsed && "hidden",
      )}
    >
      <Switch
        leftIcon={<Moon className="h-[1.2rem] w-[1.2rem]" />}
        rightIcon={<Sun className="h-[1.2rem] w-[1.2rem]" />}
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Label htmlFor="theme-toggle" className="sr-only">
        Toggle theme
      </Label>
    </div>
  );
}
