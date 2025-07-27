import { useState } from "react";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import {
  Download,
  Eye,
  Heart,
  Mail,
  MoreHorizontal,
  Share2,
  Shield,
  User,
  Zap,
} from "lucide-react";

interface AssetData {
  jewerly_assets: {
    id: string;
    name: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    assetUrl: string;
    typeAsset: string;
    userId: string;
    boost: number;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    boostCredit: number;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface AssetDetailPageProps {
  data: AssetData;
}

export function AssetDetail({ data }: AssetDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [viewMode, setViewMode] = useState<"image" | "3d">("image");
  const { jewerly_assets: asset, user } = data;

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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Asset Preview */}
          <div className="space-y-4">
            <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
              {viewMode === "image" ? (
                <img
                  src={asset.thumbnailUrl || "/placeholder-img.jpg"}
                  alt={asset.name}
                  className="object-cover"
                />
              ) : (
                <ModelViewer src={asset.assetUrl} />
              )}

              {/* View Mode Toggle */}
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

              {/* Boost Badge */}
              {asset.boost > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Zap className="mr-1 h-3 w-3" />
                    {asset.boost} Boost
                  </Badge>
                </div>
              )}
            </div>

            {/* Asset Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "border-red-200 text-red-500" : ""}
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Preview
              </Button>
            </div>
          </div>

          <div className="space-y-6">
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

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.emailVerified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="capitalize">{user.role}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{user.boostCredit.toLocaleString()} Credits</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Actions */}
            <div className="space-y-3">
              <Button size="lg" className="w-full">
                Purchase for {formatPrice(asset.price)}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Zap className="mr-2 h-4 w-4" />
                  Boost Asset
                </Button>
                <Button variant="outline" size="lg">
                  Add to Cart
                </Button>
              </div>
            </div>

            <Separator />

            {/* Asset Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asset Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Asset ID:</span>
                  <p className="font-mono text-xs break-all">{asset.id}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-mono text-xs break-all">{asset.categoryId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p>{formatDate(asset.createdAt)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <p>{formatDate(asset.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Contact Creator */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Contact Creator</h4>
                    <p className="text-muted-foreground text-sm">
                      Have questions about this asset?
                    </p>
                  </div>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
