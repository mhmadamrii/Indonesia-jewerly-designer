import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { CollectionList } from "../-components/collection-list";

import {
  exploreSearchParamSchema,
  getExploreAssetDatas,
  getFilterExploreAsset,
} from "~/actions/explore.action";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const Route = createFileRoute("/(public)/collections/")({
  validateSearch: (search: Record<string, unknown>) => exploreSearchParamSchema.parse(search), // prettier-ignore
  component: RouteComponent,
});

function RouteComponent() {
  const filterSearch = Route.useSearch();

  const navigate = useNavigate({
    from: "/collections",
  });

  const [filters, setFilters] = useState({
    category: "All",
    artist: "All",
  });

  const { data: filterLists, refetch } = useQuery({
    queryKey: ["explore_data_filter"],
    queryFn: () => getFilterExploreAsset(),
    enabled: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["explore_data", filterSearch],
    queryFn: () =>
      getExploreAssetDatas({
        data: filterSearch,
      }),
  });

  const resetFilters = () => {
    navigate({
      to: "/collections",
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
    <div className="container mx-auto flex min-h-screen flex-col gap-2 pt-20">
      <div className="flex w-full justify-end gap-2">
        <Select
          onOpenChange={() => refetch()}
          onValueChange={handleCategoryChange}
          value={filters.category}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {filterLists?.data?.categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onOpenChange={() => refetch()}
          onValueChange={handleArtistChange}
          value={filters.artist}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Artist" />
          </SelectTrigger>
          <SelectContent>
            {filterLists?.data?.artists.map((artist) => (
              <SelectItem key={artist.id} value={artist.id}>
                {artist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(filters.category !== "All" || filters.artist !== "All") && (
          <Button onClick={resetFilters} variant="outline" size="icon">
            <Trash />
          </Button>
        )}
      </div>
      <div>
        <CollectionList collections={data?.data?.jewelries} />
      </div>
    </div>
  );
}
