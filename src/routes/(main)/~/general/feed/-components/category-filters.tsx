import { motion } from "motion/react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Category } from "~/lib/db/types";
import { cn } from "~/lib/utils";

type CategoryFiltersProps = {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
};

export function CategoryFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFiltersProps) {
  return (
    <ScrollArea className="relative w-[600px]">
      <div className="relative flex w-full justify-end gap-2">
        {[
          {
            id: "",
            name: "all",
          },
          ...categories,
        ].map((item, index) => {
          const isSelected = selectedCategory === item.id;
          return (
            <div key={item.id} className="relative">
              {isSelected && (
                <motion.div
                  layoutId="activeTabHighlight"
                  className="absolute inset-0 rounded-full bg-[#EEEAFF]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                onClick={() => setSelectedCategory(item.id)}
                className={cn("relative cursor-pointer rounded-full px-3 py-2", {
                  "z-10": true,
                })}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h1
                  className={cn("font-[500] whitespace-nowrap", {
                    "text-[#5429FF]": isSelected,
                    "text-muted-foreground": !isSelected,
                  })}
                >
                  {item.name}
                </h1>
              </motion.div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
