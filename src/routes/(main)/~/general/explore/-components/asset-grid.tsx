import { JewerlyWithMeta } from "~/lib/db/types";
import { AssetCard } from "./asset-card";
import { Asset } from "./types";

interface AssetGridProps {
  assets: JewerlyWithMeta[];
  onAddToCart: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
  cartItems: Set<string>;
}

export function AssetGrid({
  assets,
  onAddToCart,
  onViewDetails,
  cartItems,
}: AssetGridProps) {
  if (assets.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl text-gray-400">🔍</div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">No assets found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isInCart={cartItems.has(asset.id)}
        />
      ))}
    </div>
  );
}
