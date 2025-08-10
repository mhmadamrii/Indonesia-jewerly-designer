"use no memo";

import { Archive, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import type { JewelryAssetWithRelations } from "./types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

// const jewelryAssetData: JewelryAssetWithRelations[] = [
//   {
//     id: "6b2f23bf-a879-409a-83c7-9582f04e9e35",
//     name: "Fortnite 3D Model",
//     description: "Get 3d asset for fortnite, collect and secure your next collections",
//     price: 200,
//     previewUrl:
//       "https://ik.imagekit.io/idnijd/previews/game_guard__games_manager__fortnite.glb-interceptorghost4-preview_xSfA5ETnA",
//     thumbnailUrl:
//       "https://ik.imagekit.io/idnijd/thumbnails/Screenshot_2025-08-02_at_14.47.37.png-interceptorghost4-thumbnail_vYrq9rtEJ",
//     assetUrl:
//       "https://ik.imagekit.io/idnijd/assets/IJD_Dashboard_Web_3.0__Community_.zip-interceptorghost4-asset_6xST8LiLL",
//     typeAsset: "image",
//     userId: "6u5qfzquMWJN8GBVjKlIUc0T9atfiw3l",
//     boost: 100,
//     categoryId: "dcb1e5a2-caed-46b1-9e57-b3da86f13373",
//     createdAt: "2025-08-02T07:59:31.414Z",
//     updatedAt: "2025-08-02T07:59:31.414Z",
//     user: {
//       id: "6u5qfzquMWJN8GBVjKlIUc0T9atfiw3l",
//       name: "Muhammad Amri",
//       email: "interceptorghost4@gmail.com",
//       role: "artist",
//       boostCredit: 59800,
//       userStorageLimit: 9486380,
//       userStorageUsage: 0,
//       emailVerified: true,
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocLlouf-XtUn7hKUzjYWVqLrsa5EYs1reM60UIu2e2H3P3HTYhQ=s96-c",
//       createdAt: "2025-08-02T07:39:22.786Z",
//       updatedAt: "2025-08-02T07:39:22.786Z",
//     },
//     category: {
//       id: "dcb1e5a2-caed-46b1-9e57-b3da86f13373",
//       name: "Gaming",
//       description: "lorem ipsum",
//       createdAt: "2025-08-02T07:45:35.884Z",
//       updatedAt: "2025-08-02T07:45:35.884Z",
//     },
//   },
//   // Add more sample data for demonstration
//   {
//     id: "7c3f34cf-b980-510b-94d8-0693f15f0f46",
//     name: "Diamond Ring Collection",
//     description: "Luxury diamond ring 3D models for jewelry visualization and e-commerce",
//     price: 350,
//     previewUrl: "https://example.com/preview2",
//     thumbnailUrl: "https://example.com/thumb2",
//     assetUrl: "https://example.com/asset2",
//     typeAsset: "3d-model",
//     userId: "7v6rgzrvNXKO9HCWkLmJVd1U0bugjx4m",
//     boost: 150,
//     categoryId: "edc2f6b3-dbfe-57c2-0f68-c4eb97g24484",
//     createdAt: "2025-08-01T15:30:45.123Z",
//     updatedAt: "2025-08-01T15:30:45.123Z",
//     user: {
//       id: "7v6rgzrvNXKO9HCWkLmJVd1U0bugjx4m",
//       name: "Sarah Johnson",
//       email: "sarah.johnson@example.com",
//       role: "designer",
//       boostCredit: 42000,
//       userStorageLimit: 8500000,
//       userStorageUsage: 1200000,
//       emailVerified: true,
//       image: "/placeholder.svg?height=96&width=96",
//       createdAt: "2025-07-28T10:15:30.456Z",
//       updatedAt: "2025-07-28T10:15:30.456Z",
//     },
//     category: {
//       id: "edc2f6b3-dbfe-57c2-0f68-c4eb97g24484",
//       name: "Luxury",
//       description: "High-end luxury items",
//       createdAt: "2025-07-25T08:20:15.789Z",
//       updatedAt: "2025-07-25T08:20:15.789Z",
//     },
//   },
// ];

export function JewelryAssetTable({
  jewelryAssetData,
}: {
  jewelryAssetData: JewelryAssetWithRelations[];
}) {
  console.log("jewelryAssetData", jewelryAssetData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<JewelryAssetWithRelations | null>(
    null,
  );

  const handleEdit = (asset: JewelryAssetWithRelations) => {
    console.log("Edit asset:", asset.id);
    // Implement edit functionality
  };

  const handleDelete = (asset: JewelryAssetWithRelations) => {
    setSelectedAsset(asset);
    setDeleteModalOpen(true);
  };

  const handleArchive = (asset: JewelryAssetWithRelations) => {
    setSelectedAsset(asset);
    setArchiveModalOpen(true);
  };

  const handleDetail = (asset: JewelryAssetWithRelations) => {
    setSelectedAsset(asset);
    setDetailModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAsset) {
      console.log("Delete asset:", selectedAsset.id);
      // Implement delete functionality
    }
    setDeleteModalOpen(false);
    setSelectedAsset(null);
  };

  const confirmArchive = () => {
    if (selectedAsset) {
      console.log("Archive asset:", selectedAsset.id);
      // Implement archive functionality
    }
    setArchiveModalOpen(false);
    setSelectedAsset(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onArchive: handleArchive,
    onDetail: handleDetail,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Asset Collection</CardTitle>
          <CardDescription>
            Advanced data table with sorting, filtering, and pagination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <DataTable columns={columns} data={jewelryAssetData} />
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Asset</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedAsset?.name}"? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Asset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={archiveModalOpen} onOpenChange={setArchiveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Asset</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive "{selectedAsset?.name}"? You can restore it
              later from the archived items.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setArchiveModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmArchive}>
              <Archive className="mr-2 h-4 w-4" />
              Archive Asset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
