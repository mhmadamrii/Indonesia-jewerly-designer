import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { jewelryWithJoins } from "~/actions/explore.action";
import { AddWishlist } from "~/components/add-wishlist";
import { PaymentButton } from "~/components/payment-button";
import { Badge } from "~/components/ui/badge";

export function AssetGrid({
  jewelry_assets,
  category,
  user,
  reviewCount,
  tags,
}: jewelryWithJoins) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="group bg-card h-[480px] max-w-4xl overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex h-full flex-col justify-between">
        <div className="relative z-10 h-[40%]">
          <img
            src={
              jewelry_assets.thumbnailUrl !== ""
                ? jewelry_assets.thumbnailUrl
                : "/placeholder-img.jpg"
            }
            alt={jewelry_assets.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 z-50 flex items-center justify-center space-x-2 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
              onClick={() =>
                navigate({
                  to: `/~/general/assets/$assetId`,
                  params: { assetId: jewelry_assets.id },
                })
              }
            >
              <Eye className="h-4 w-4" />
            </button>
            <AddWishlist
              imageUrl={jewelry_assets.thumbnailUrl}
              jewelryAssetId={jewelry_assets.id}
            />
          </div>

          <div className="absolute top-3 left-3">
            <Link
              to="/~/general/u/$userId"
              params={{
                userId: user.id,
              }}
              className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm"
            >
              {category.name}
            </Link>
          </div>

          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-indigo-600 px-2 py-1 text-sm font-bold text-white">
              ${jewelry_assets.price}
            </span>
          </div>
        </div>

        <div className="bg-card z-20 flex flex-col justify-between p-4">
          <div>
            <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
              {jewelry_assets.name}
            </h3>
            <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
              {jewelry_assets.description}
            </p>

            <div className="h-[60px]">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                {(tags ?? []).map((tag, idx) => (
                  <Badge key={idx}>{tag}</Badge>
                ))}
                {user.name === "ijd.id" && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                    🌟 Top Seller
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <img
                src={user.image ?? "placeholder-img.jpg"}
                alt={user.name}
                className="mr-2 h-6 w-6 rounded-full"
              />
              <Link
                to="/~/general/u/$userId"
                params={{
                  userId: user.id,
                }}
                className="text-sm text-gray-600"
              >
                {user.name}
              </Link>
            </div>

            <div className="text-muted-foreground mb-4 flex justify-between gap-2 text-sm">
              <button className="hover:text-primary flex items-center transition-colors">
                <Heart className="mr-1 h-4 w-4 text-red-500" />
                <span>{jewelry_assets.likes} likes</span>
              </button>
              <button className="hover:text-primary flex items-center transition-colors">
                <MessageCircle className="mr-1 h-4 w-4" />
                <span>{reviewCount > 0 ? `${reviewCount} reviews` : "No reviews"}</span>
              </button>
            </div>
          </div>

          <PaymentButton
            assetId={jewelry_assets.id}
            purchaseLabel={t("purchase")}
            totalPrice={jewelry_assets.price}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white hover:from-blue-700 hover:to-purple-700"
          />
        </div>
      </div>
    </div>
  );
}
