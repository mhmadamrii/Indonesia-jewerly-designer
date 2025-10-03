"use no memo";

import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Archive, LoaderIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deletejewelryAsset } from "~/actions/jewelry.action";
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

export function JewelryAssetTable({
  jewelryAssetData,
}: {
  jewelryAssetData: JewelryAssetWithRelations[];
}) {
  const navigate = useNavigate();
  const router = useRouter();

  const { mutate: deleteAsset, isPending: isDeleting } = useMutation({
    mutationFn: deletejewelryAsset,
    onSuccess: () => {
      toast.success("Asset deleted successfully");
      router.invalidate();
    },
  });
  console.log("jewelryAssetData", jewelryAssetData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<JewelryAssetWithRelations | null>(
    null,
  );

  const handleEdit = (asset: JewelryAssetWithRelations) => {
    navigate({
      to: "/~/artist/publishing/edit/$assetId",
      params: { assetId: asset.id },
    });
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
    navigate({
      to: "/~/artist/assets/$assetId",
      params: { assetId: asset.id },
    });
  };

  const confirmDelete = () => {
    if (selectedAsset) {
      deleteAsset({
        data: {
          id: selectedAsset.id,
        },
      });
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
              {isDeleting ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Asset
                </>
              )}
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
