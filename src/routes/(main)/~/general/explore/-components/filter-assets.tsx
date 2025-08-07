import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { useState } from "react";
import { getFilterExploreAsset } from "~/actions/explore.action";
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

export function FilterAssets() {
  const navigate = useNavigate({
    from: "/~/general/explore",
  });

  const { data } = useQuery({
    queryKey: ["explore_data_filter"],
    queryFn: () => getFilterExploreAsset(),
  });

  const [filters, setFilters] = useState({
    category: "All",
    artist: "All",
  });

  const resetFilters = () => {
    navigate({
      to: "/~/general/explore",
    });
    setFilters({
      category: "All",
      artist: "All",
    });
  };

  const handleCategoryChange = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: value,
      }),
    });
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleArtistChange = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        artist: value,
      }),
    });
    setFilters((prev) => ({ ...prev, artist: value }));
  };

  return (
    <Card className="sticky top-5 z-50">
      <CardContent className="flex justify-between gap-2">
        <div className="flex w-full flex-col space-y-1">
          <label className="text-sm font-medium">Name</label>
          <Input />
        </div>

        <div className="flex w-full flex-col space-y-1">
          <label className="text-sm font-medium">Category</label>
          <Select onValueChange={handleCategoryChange} value={filters.category}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {data?.data?.categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full flex-col space-y-1">
          <label className="text-sm font-medium">Artist</label>
          <Select onValueChange={handleArtistChange} value={filters.artist}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Artist" />
            </SelectTrigger>
            <SelectContent>
              {data?.data?.artists?.map((artist) => (
                <SelectItem key={artist.id} value={artist.id}>
                  {artist.name}
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
