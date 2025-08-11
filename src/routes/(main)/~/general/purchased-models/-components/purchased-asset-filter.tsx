"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryFilterTableProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  table: any; // React Table instance
}

export function PurchasedAssetFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  table,
}: CategoryFilterTableProps) {
  const selectedCategoryName = categories.find(
    (cat) => cat.id === selectedCategory,
  )?.name;

  const handleCategoryChange = (categoryId: string | null) => {
    onCategoryChange(categoryId);
    // Update table filter
    if (categoryId) {
      const category = categories.find((cat) => cat.id === categoryId);
      table.getColumn("category")?.setFilterValue(category?.name);
    } else {
      table.getColumn("category")?.setFilterValue("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Category
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => handleCategoryChange(null)}>
            <span className="font-medium">All Categories</span>
            <Badge variant="secondary" className="ml-auto">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </Badge>
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-auto">
                {category.count}
              </Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedCategory && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {selectedCategoryName}
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => handleCategoryChange(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
}
