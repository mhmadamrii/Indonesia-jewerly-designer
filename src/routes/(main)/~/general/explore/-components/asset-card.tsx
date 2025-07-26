import { Download, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { JewerlyWithMeta } from "~/lib/db/types";
import { Asset } from "./types";

interface AssetCardProps {
  asset: JewerlyWithMeta;
  onAddToCart: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
  isInCart?: boolean;
}

export function AssetCard({
  asset,
  onAddToCart,
  onViewDetails,
  isInCart,
}: AssetCardProps) {
  console.log(asset.thumbnail_url);
  return (
    <div className="group bg-card overflow-hidden rounded-md border shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={asset.thumbnail_url !== "" ? asset.thumbnail_url : "/placeholder-img.jpg"}
          alt={asset.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            // onClick={() => onViewDetails(asset)}
            className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
            {asset.category_name}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-indigo-600 px-2 py-1 text-sm font-bold text-white">
            ${asset.price}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-1 font-semibold">{asset.name}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{asset.description}</p>

        <div className="mb-3 flex flex-wrap gap-1">
          {asset.tags
            .split(",")
            .map((tag) => tag.trim())
            .map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            +30
          </span>
        </div>

        <div className="mb-3 flex items-center">
          <img
            src={asset.creator_image}
            alt={asset.creator_name}
            className="mr-2 h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{asset.creator_name}</span>
          <div className="ml-auto flex items-center">
            <Star className="h-3 w-3 fill-current text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{10}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Download className="mr-1 h-4 w-4" />
            <span>{10}</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-current text-yellow-400" />
            <span>{3}</span>
          </div>
        </div>

        <button
          // onClick={() => onAddToCart(asset)}
          disabled={isInCart}
          className={`flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
            isInCart
              ? "cursor-not-allowed bg-gray-100 text-gray-500"
              : "bg-indigo-600 text-white hover:scale-105 hover:bg-indigo-700"
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
}
