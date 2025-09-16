import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getFilterExploreAsset } from "~/actions/explore.action";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function FilterCard() {
  const { t } = useTranslation();
  const navigate = useNavigate({
    from: "/~/general/explore",
  });

  const search = useSearch({
    from: "/(main)/~/general/explore/",
  });

  const [sortOption, setSortOption] = useState("latest");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const [filters, setFilters] = useState({
    category: "All",
    artist: "All",
  });

  const { data, refetch } = useQuery({
    queryKey: ["explore_data_filter"],
    queryFn: () => getFilterExploreAsset(),
    enabled: false,
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
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleArtistChange = (value: string) => {
    setFilters((prev) => ({ ...prev, artist: value }));
  };

  const handleApply = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort: sortOption,
        priceFrom: priceRange[0],
        priceTo: priceRange[1],
        category: filters.category !== "All" ? filters.category : undefined,
        artist: filters.artist !== "All" ? filters.artist : undefined,
      }),
    });
  };

  return (
    <div className="sticky top-20 h-[550px] w-[30%]">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t("filters")}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <p className="mb-2 text-sm font-medium">Sort by</p>
            <RadioGroup
              value={sortOption}
              onValueChange={setSortOption}
              className="mb-5 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="latest" id="latest" />
                <Label htmlFor="latest">{t("latest")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest">{t("oldest")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="this-week" id="this-week" />
                <Label htmlFor="this-week">{t("this_week")}</Label>
              </div>
            </RadioGroup>
            <Separator />
            <RadioGroup
              value={sortOption}
              onValueChange={setSortOption}
              className="mt-4 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="trending" id="trending" />
                <Label htmlFor="trending">Trending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular" />
                <Label htmlFor="popular">Popular</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">
              {t("price_range")}: ${priceRange[0]} - ${priceRange[1]}
            </p>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={10000}
              step={10}
              className="w-full"
            />
          </div>

          <div className="flex w-full flex-col space-y-1">
            <label className="text-sm font-medium">{t("category")}</label>
            <Select
              onOpenChange={() => refetch()}
              onValueChange={handleCategoryChange}
              value={filters.category}
            >
              <SelectTrigger onClick={() => refetch()} className="w-full">
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
            <Select
              onOpenChange={() => refetch()}
              onValueChange={handleArtistChange}
              value={filters.artist}
            >
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
        </CardContent>

        <CardFooter className="flex justify-center gap-2 px-2">
          <Button
            className={cn("w-[90%] cursor-pointer", {
              "w-[76%]": Object.keys(search).length > 0,
            })}
            onClick={handleApply}
          >
            {t("apply")}
          </Button>
          <Button
            onClick={resetFilters}
            variant="destructive"
            className={cn("flex cursor-pointer", {
              hidden: Object.keys(search).length == 0,
            })}
            size="icon"
          >
            <Trash2 />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
