import { Download, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { PurchasedAssetFilter } from "./purchased-asset-filter";
import { createPurchasedColumns } from "./purchased-columns";
import { PurchasedDataTable } from "./purchased-data-table";
import { PurchasedEmpty } from "./purchased-empty";
import type { PurchasedAsset } from "./types/purchased-asset";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const purchasedAssetsData: PurchasedAsset[] = [
  {
    id: "6b2f23bf-a879-409a-83c7-9582f04e9e35",
    name: "Fortnite 3D Model",
    description: "Get 3d asset for fortnite, collect and secure your next collections",
    price: 200,
    previewUrl: "https://example.com/preview1",
    thumbnailUrl: "https://example.com/thumb1",
    downloadUrl: "https://example.com/download1",
    typeAsset: "3d-model",
    purchaseDate: "2025-08-02T07:59:31.414Z",
    artist: {
      id: "6u5qfzquMWJN8GBVjKlIUc0T9atfiw3l",
      name: "Muhammad Amri",
      email: "interceptorghost4@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLlouf-XtUn7hKUzjYWVqLrsa5EYs1reM60UIu2e2H3P3HTYhQ=s96-c",
      role: "artist",
    },
    category: {
      id: "dcb1e5a2-caed-46b1-9e57-b3da86f13373",
      name: "Gaming",
      description: "Gaming related assets",
    },
  },
  {
    id: "7c3f34cf-b980-510b-94d8-0693f15f0f46",
    name: "Diamond Ring Collection",
    description: "Luxury diamond ring 3D models for jewelry visualization and e-commerce",
    price: 350,
    previewUrl: "https://example.com/preview2",
    thumbnailUrl: "https://example.com/thumb2",
    downloadUrl: "https://example.com/download2",
    typeAsset: "3d-model",
    purchaseDate: "2025-08-01T15:30:45.123Z",
    artist: {
      id: "7v6rgzrvNXKO9HCWkLmJVd1U0bugjx4m",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "designer",
    },
    category: {
      id: "edc2f6b3-dbfe-57c2-0f68-c4eb97g24484",
      name: "Luxury",
      description: "High-end luxury items",
    },
  },
  {
    id: "8d4g45dg-c091-621c-05e9-1704g26g1g57",
    name: "Vintage Watch Collection",
    description:
      "Classic vintage watch 3D models with intricate details and realistic materials",
    price: 275,
    previewUrl: "https://example.com/preview3",
    thumbnailUrl: "https://example.com/thumb3",
    downloadUrl: "https://example.com/download3",
    typeAsset: "3d-model",
    purchaseDate: "2025-07-28T09:15:22.789Z",
    artist: {
      id: "8w7shzswOYLP0IDXlNnKWe2V1cvhky5n",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "3d-artist",
    },
    category: {
      id: "fde3g7c4-ecgf-68d3-1g79-d5fc08h35595",
      name: "Vintage",
      description: "Classic and vintage items",
    },
  },
  {
    id: "9e5h56eh-d102-732d-16f0-2815h37h2h68",
    name: "Modern Bracelet Set",
    description:
      "Contemporary bracelet designs with geometric patterns and modern aesthetics",
    price: 180,
    previewUrl: "https://example.com/preview4",
    thumbnailUrl: "https://example.com/thumb4",
    downloadUrl: "https://example.com/download4",
    typeAsset: "3d-model",
    purchaseDate: "2025-07-25T14:22:18.456Z",
    artist: {
      id: "9x8tiztyPZMQ1JEYmOoLXf3W2dxily6o",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "jewelry-designer",
    },
    category: {
      id: "gef4h8d5-fdhi-79e4-2h80-e6gd19i46606",
      name: "Modern",
      description: "Contemporary and modern designs",
    },
  },
  {
    id: "0f6i67fi-e213-843e-27g1-3926i48i3i79",
    name: "Antique Necklace Collection",
    description:
      "Historical necklace replicas with authentic period details and craftsmanship",
    price: 420,
    previewUrl: "https://example.com/preview5",
    thumbnailUrl: "https://example.com/thumb5",
    downloadUrl: "https://example.com/download5",
    typeAsset: "3d-model",
    purchaseDate: "2025-07-20T11:45:33.789Z",
    artist: {
      id: "0y9ujzuzQANR2KFZnPpMYg4X3eyjmz7p",
      name: "David Kim",
      email: "david.kim@example.com",
      image: "/placeholder.svg?height=96&width=96",
      role: "historian-artist",
    },
    category: {
      id: "hfg5i9e6-gejk-80f5-3i91-f7he20j57717",
      name: "Antique",
      description: "Historical and antique pieces",
    },
  },
];

export function PurchasedAsset() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const assets = purchasedAssetsData;

  const categories = useMemo(() => {
    const categoryMap = new Map();
    assets.forEach((asset) => {
      const category = asset.category;
      if (categoryMap.has(category.id)) {
        categoryMap.get(category.id).count++;
      } else {
        categoryMap.set(category.id, {
          id: category.id,
          name: category.name,
          count: 1,
        });
      }
    });
    return Array.from(categoryMap.values());
  }, [assets]);

  const handleDownload = (asset: PurchasedAsset) => {
    // Simulate download
    toast.success(`Downloading ${asset.name}...`);
    console.log("Download asset:", asset.id);
    // In real implementation, trigger file download
    // window.open(asset.downloadUrl, '_blank')
  };

  const handleChatArtist = (asset: PurchasedAsset) => {
    // Navigate to chat or open chat modal
    toast.info(`Opening chat with ${asset.artist.name}`);
    console.log("Chat with artist:", asset.artist.id);
    // In real implementation, navigate to chat or open chat modal
  };

  const handleExplore = () => {
    console.log("explore");
  };

  const handleBulkDownload = (selectedRows: PurchasedAsset[]) => {
    if (selectedRows.length === 0) {
      toast.error("Please select assets to download");
      return;
    }
    toast.success(`Downloading ${selectedRows.length} assets...`);
    console.log(
      "Bulk download:",
      selectedRows.map((asset) => asset.id),
    );
  };

  const columns = createPurchasedColumns({
    onDownload: handleDownload,
    onChatArtist: handleChatArtist,
  });

  if (assets.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Purchased Assets</h1>
          <p className="text-muted-foreground">
            Your collection of purchased 3D jewelry assets
          </p>
        </div>
        <PurchasedEmpty onExplore={handleExplore} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Purchased Assets</h1>
          <p className="text-muted-foreground">
            Your collection of purchased 3D jewelry assets
          </p>
        </div>
        <Button onClick={handleExplore} variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Explore More
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Library ({assets.length} items)</CardTitle>
          <CardDescription>
            Download and manage your purchased 3D assets with advanced table features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PurchasedDataTable
            columns={columns}
            data={assets}
            additionalFilters={(table) => (
              <PurchasedAssetFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                table={table}
              />
            )}
            bulkActions={(selectedRows) => (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleBulkDownload(selectedRows)}
                  size="sm"
                  disabled={selectedRows.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Selected ({selectedRows.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedRows.length === 0}
                  onClick={() => {
                    toast.info(`Removing ${selectedRows.length} assets from library...`);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove from Library
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
