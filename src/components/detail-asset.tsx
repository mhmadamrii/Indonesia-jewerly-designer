import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { createCartItem } from "~/actions/cart.action";
import { TypejewelryAssetById } from "~/actions/jewelry.action";
import { ModelViewer } from "~/components/3D/model-viewer";
import { PaymentButton } from "~/components/payment-button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { IconButton } from "./animate-ui/buttons/icon";
import { ReviewSection } from "./review-section";

import {
  Download,
  Eye,
  Mail,
  MoreHorizontal,
  Share2,
  Shield,
  Star,
  User,
  Zap,
} from "lucide-react";

export function AssetDetail({ data }: { data: TypejewelryAssetById }) {
  console.log("data detail", data);
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(false);
  const [viewMode, setViewMode] = useState<"image" | "3d">("image");
  const { jewelry_assets: asset, user, category } = data;

  const { mutate } = useMutation({
    mutationFn: createCartItem,
    onSuccess: () => {
      toast.success("Item added to cart successfully");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddToCart = (id: string) => {
    mutate({
      data: {
        jewelryAssetId: id,
        quantity: 1,
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto h-full px-4 py-8">
        <div className="relative flex h-full flex-col gap-8 md:flex-row">
          <div className="w-full space-y-4 sm:w-[60%]">
            <div className="bg-muted relative overflow-hidden rounded-lg">
              {viewMode === "image" ? (
                <img
                  src={asset.thumbnailUrl || "/placeholder-img.jpg"}
                  alt={asset.name}
                  className="h-[400px]"
                />
              ) : (
                <div className="h-[400px]">
                  <ModelViewer src={asset.previewUrl} />
                </div>
              )}

              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  className="cursor-pointer"
                  variant={viewMode === "image" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setViewMode("image")}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Image
                </Button>
                <Button
                  className="cursor-pointer"
                  variant={viewMode === "3d" ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setViewMode("3d")}
                >
                  3D
                </Button>
              </div>

              {asset?.boost! > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Zap className="mr-1 h-3 w-3" />
                    {asset.boost} Boost
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex gap-2 px-3">
              <IconButton
                icon={Star}
                active={isLiked}
                onClick={() => setIsLiked(!isLiked)}
              />
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Preview
              </Button>
            </div>

            <div>
              <ReviewSection
                jewelryAssetId={asset.id}
                averageRating={4.8}
                totalReviews={24}
              />
            </div>
          </div>

          <div className="top-5 w-full space-y-6 sm:w-[40%]">
            <div className="flex justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold">{asset.name}</h1>
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-primary text-3xl font-bold">
                    {formatPrice(asset.price)}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {asset.typeAsset}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">{asset.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user?.image || "/placeholder-img.jpg"}
                      alt={user?.name}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to="/~/general/u/$userId"
                        params={{ userId: user!.id }}
                        className="font-semibold"
                      >
                        {user?.name}
                      </Link>
                      {user?.emailVerified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="capitalize">{user?.role}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{user?.boostCredit?.toLocaleString()} Credits</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Mail />
                    </Button>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <PaymentButton
                assetId={asset.id}
                totalPrice={asset.price}
                purchaseLabel={`Purchase for ${formatPrice(asset.price)}`}
              />
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Zap className="mr-2 h-4 w-4" />
                  Boost Asset
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => handleAddToCart(asset.id)}
                  variant="outline"
                  size="lg"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asset Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Creator:</span>
                  <p className="font-mono text-xs break-all">{user?.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-mono text-xs break-all">{category.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p>{formatDate(asset?.createdAt as unknown as string)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <p>{formatDate(asset.updatedAt as unknown as string)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
