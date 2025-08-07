import { useNavigate } from "@tanstack/react-router";
import { Eye, Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { JewerlyWithJoins } from "~/actions/explore.action";
import { AddWishlist } from "~/components/add-wishlist";
import { Button } from "~/components/ui/button";

export function AssetGrid({ jewerly_assets, category, user }: JewerlyWithJoins) {
  const navigate = useNavigate();

  return (
    <div className="group bg-card h-[300px] overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="relative z-10 h-[300px] md:w-[40%]">
          <img
            src={jewerly_assets.thumbnailUrl ?? "/placeholder-img.jpg"}
            alt={jewerly_assets.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Buttons */}
          <div className="absolute inset-0 z-50 flex items-center justify-center space-x-2 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
              onClick={() =>
                navigate({
                  to: `/~/general/assets/$assetId`,
                  params: { assetId: jewerly_assets.id },
                })
              }
            >
              <Eye className="h-4 w-4" />
            </button>
            <AddWishlist
              imageUrl={jewerly_assets.thumbnailUrl}
              jewerlyAssetId={jewerly_assets.id}
            />
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
              {category.name}
            </span>
          </div>

          {/* Price Tag */}
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-indigo-600 px-2 py-1 text-sm font-bold text-white">
              ${jewerly_assets.price}
            </span>
          </div>
        </div>

        {/* Right Content Section */}

        <div className="bg-card z-20 flex flex-col justify-between border-t p-4 md:w-1/2 md:border-t-0 md:border-l">
          <div>
            {/* Name & Description */}
            <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
              {jewerly_assets.name}
            </h3>
            <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
              {jewerly_assets.description}
            </p>

            {/* Tags / Badges */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
              {["tag1", "tag2", "tag3"].map((tag, idx) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
              {user.name === "ijd.id" && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                  🌟 Top Seller
                </span>
              )}
            </div>

            {/* Creator Info */}
            <div className="mb-3 flex items-center">
              <img
                src={user.image ?? ""}
                alt={user.name}
                className="mr-2 h-6 w-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>

            {/* Stats Row */}
            <div className="text-muted-foreground mb-4 grid grid-cols-3 gap-2 text-sm">
              <button className="hover:text-primary flex items-center transition-colors">
                <Eye className="mr-1 h-4 w-4" />
                <span>{jewerly_assets.impressions ?? 0} views</span>
              </button>
              <button className="hover:text-primary flex items-center transition-colors">
                <Heart className="mr-1 h-4 w-4 text-red-500" />
                <span>{jewerly_assets.likes ?? 0} likes</span>
              </button>
              <button className="hover:text-primary flex items-center transition-colors">
                <MessageCircle className="mr-1 h-4 w-4" />
                <span>{jewerly_assets.commentsCount ?? 0} comments</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <Button className="w-full" variant="default">
              Purchase
            </Button>

            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
