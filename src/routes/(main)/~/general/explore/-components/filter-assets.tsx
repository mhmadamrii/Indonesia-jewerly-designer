import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const categories = ["All", "Featured", "Recommended"];
const artists = ["All", "Alice", "Bob", "Charlie", "Diana"];

export function FilterAssets() {
  const [filters, setFilters] = useState({
    category: "All",
    artist: "All",
  });

  const resetFilters = () => {
    setFilters({
      category: "All",
      artist: "All",
    });
  };

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleArtistChange = (value: string) => {
    setFilters((prev) => ({ ...prev, artist: value }));
  };

  return (
    <Card className="sticky top-5 z-50">
      <CardContent className="flex justify-end gap-2">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Name</label>
          <Input />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Category</label>
          <Select onValueChange={handleCategoryChange} value={filters.category}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Artist</label>
          <Select onValueChange={handleArtistChange} value={filters.artist}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Artist" />
            </SelectTrigger>
            <SelectContent>
              {artists.map((artist) => (
                <SelectItem key={artist} value={artist}>
                  {artist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={resetFilters} size="icon" className="mt-6">
          <Trash />
        </Button>
      </CardContent>
    </Card>
  );
}
