import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { Slider } from "~/components/ui/slider";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function FilterCard() {
  const navigate = useNavigate({
    from: "/~/general/explore",
  });

  const [sortOption, setSortOption] = useState("latest");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleApply = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort: sortOption,
        priceFrom: priceRange[0],
        priceTo: priceRange[1],
      }),
    });
  };

  return (
    <div className="sticky top-37 h-[430px] w-[30%]">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium">Sort by</p>
            <RadioGroup
              value={sortOption}
              onValueChange={setSortOption}
              className="mb-5 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="latest" id="latest" />
                <Label htmlFor="latest">Latest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest">Oldest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="this-week" id="this-week" />
                <Label htmlFor="this-week">This Week</Label>
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

          {/* Price Range */}
          <div>
            <p className="mb-2 text-sm font-medium">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </p>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={1000}
              step={10}
              className="w-full"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={handleApply}>
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
