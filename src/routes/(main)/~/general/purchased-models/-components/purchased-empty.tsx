"use client";

import { Search, ShoppingBag } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface EmptyStateProps {
  onExplore: () => void;
}

export function PurchasedEmpty({ onExplore }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-muted mb-4 rounded-full p-4">
          <ShoppingBag className="text-muted-foreground h-8 w-8" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No purchased assets yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You haven't purchased any 3D assets yet. Explore our marketplace to discover
          amazing digital jewelry collections.
        </p>
        <Button onClick={onExplore} size="lg">
          <Search className="mr-2 h-4 w-4" />
          Explore Marketplace
        </Button>
      </CardContent>
    </Card>
  );
}
