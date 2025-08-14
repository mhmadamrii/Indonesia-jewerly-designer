import { useMutation } from "@tanstack/react-query";
import { Heart, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { addWishlistItem } from "~/actions/wishlist.action";

export function AddWishlist({
  imageUrl,
  jewelryAssetId,
}: {
  imageUrl: string;
  jewelryAssetId: string;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: addWishlistItem,
    onSuccess: () => {
      toast.success("Item added to wishlist successfully");
    },
  });

  return (
    <button
      disabled={isPending}
      onClick={() => mutate({ data: { imageUrl, jewelryAssetId } })}
      className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
    >
      {isPending ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <Heart className="h-4 w-4" />
      )}
    </button>
  );
}
