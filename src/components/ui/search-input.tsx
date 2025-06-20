import React from "react";

import { SearchIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Input } from "./input";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputProps = SearchProps;

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "border-input ring-offset-background focus-within:ring-ring flex h-10 items-center rounded-md border pl-3 text-sm focus-within:ring-1 focus-within:ring-offset-2",
          className,
        )}
      >
        <SearchIcon className="h-[16px] w-[16px]" />
        <Input
          {...props}
          type="search"
          ref={ref}
          className="placeholder:text-muted-foreground w-full border-none p-2 focus-visible:border-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
