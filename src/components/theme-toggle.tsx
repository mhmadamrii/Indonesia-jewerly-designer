import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/components/theme-provider";
import { Label } from "~/components/ui/label";
import { Switch } from "./animate-ui/base/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between space-x-2">
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
