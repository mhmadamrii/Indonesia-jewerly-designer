import { useNavigate } from "@tanstack/react-router";
import { Download, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { MyPaymentTransactionsType } from "~/actions/payment.action";
import { Button } from "~/components/ui/button";
import { PurchasedAssetFilter } from "./purchased-asset-filter";
import { createPurchasedColumns } from "./purchased-columns";
import { PurchasedDataTable } from "./purchased-data-table";
import { PurchasedEmpty } from "./purchased-empty";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function PurchasedAsset({
  purchasedAssetsData,
}: {
  purchasedAssetsData: MyPaymentTransactionsType | undefined;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const assets = useMemo(() => {
    if (!purchasedAssetsData) return [];
    return purchasedAssetsData.map((item) => ({
      id: item.payment.id,
      name: item.jewelry.name,
      assetId: item.jewelry.id,
      description: item.jewelry.description,
      downloadUrl: item.jewelry.downloadUrl,
      amount: item.payment.amount,
      status: item.payment.status,
      purchasedAt: item.payment.purchasedAt,
      category: item.category,
      artist: item.artist,
    }));
  }, [purchasedAssetsData]);

  const categories = useMemo(() => {
    const categoryMap = new Map();
    assets.forEach((asset) => {
      const categoryName = asset.category;
      if (categoryMap.has(categoryName)) {
        categoryMap.get(categoryName).count++;
      } else {
        categoryMap.set(categoryName, {
          id: categoryName,
          name: categoryName,
          count: 1,
        });
      }
    });
    return Array.from(categoryMap.values());
  }, [assets]);

  const handleDownload = (asset: any) => {
    toast.success(`Downloading ${asset.name}...`);
    window.open(asset.downloadUrl, "_blank");
  };

  const handleChatArtist = (asset: any) => {
    toast.info(`Opening chat with ${asset.artist.name}`);
    console.log("Chat with artist:", asset.artist.id);
  };

  const handleExplore = () => {
    navigate({
      to: "/~/general/explore",
    });
  };

  const handleBulkDownload = (selectedRows: any[]) => {
    if (selectedRows.length === 0) {
      toast.error("Please select assets to download");
      return;
    }
    toast.success(`Downloading ${selectedRows.length} assets...`);
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
    <div className="space-y-6 p-6 pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("my_purchase_asset")}</h1>
          <p className="text-muted-foreground">{t("your_collection_desc")}</p>
        </div>
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
