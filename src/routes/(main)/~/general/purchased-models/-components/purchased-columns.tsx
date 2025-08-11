import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Calendar, DollarSign, Download, MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import type { PurchasedAsset } from "../types/purchased-asset";

interface PurchasedColumnsProps {
  onDownload: (asset: PurchasedAsset) => void;
  onChatArtist: (asset: PurchasedAsset) => void;
}

export const createPurchasedColumns = ({
  onDownload,
  onChatArtist,
}: PurchasedColumnsProps): ColumnDef<PurchasedAsset>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const asset = row.original;
      return (
        <div className="max-w-[200px] space-y-1">
          <div className="font-medium">{asset.name}</div>
          <div className="text-muted-foreground line-clamp-2 text-sm">
            {asset.description}
          </div>
          <Badge variant="outline" className="text-xs">
            {asset.typeAsset}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "artist",
    header: "Artist",
    cell: ({ row }) => {
      const artist = row.original.artist;
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={artist.image || "/placeholder.svg"} />
            <AvatarFallback>
              {artist.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{artist.name}</div>
            <Badge variant="secondary" className="text-xs">
              {artist.role}
            </Badge>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <Badge variant="outline">{category.name}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return (
        <div className="flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-green-600" />
          <span className="font-medium">{formatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "purchaseDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purchase Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("purchaseDate"));
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return (
        <div className="flex items-center text-sm">
          <Calendar className="text-muted-foreground mr-1 h-3 w-3" />
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const asset = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(asset);
            }}
            size="sm"
            className="h-8"
          >
            <Download className="mr-1 h-3 w-3" />
            Download
          </Button>
          <Button
            onClick={() => onChatArtist(asset)}
            variant="outline"
            size="sm"
            className="h-8"
          >
            <MessageCircle className="mr-1 h-3 w-3" />
            Chat
          </Button>
        </div>
      );
    },
  },
];
