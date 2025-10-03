import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, LoaderIcon, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createCartItem } from "~/actions/cart.action";
import { TrendingJewelriesType } from "~/actions/dashboard.action";
import { ModelViewer } from "~/components/3D/model-viewer";
import { AddWishlist } from "~/components/add-wishlist";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";

type TrendingsProps = {
  jewelries: TrendingJewelriesType;
};

export function Trendings({ jewelries }: TrendingsProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selected3D, setSelected3D] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { mutate, isPending } = useMutation({
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
    setSelected3D(id);
    mutate({
      data: {
        jewelryAssetId: id,
        quantity: 1,
      },
    });
  };

  class Person {
    constructor() {}
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {jewelries?.map((item, idx) => (
        <motion.div
          layoutId={`card-${idx + 1}`}
          className="group bg-card overflow-hidden rounded-md border shadow-md transition-all duration-300 hover:shadow-xl"
          key={idx}
        >
          <div className="relative overflow-hidden">
            <img
              src={item.jewelry_assets.thumbnailUrl}
              className="h-50 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt="Asset Image"
            />

            <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={() => {
                  setSelected3D(item.jewelry_assets.previewUrl);
                  setSelectedId(idx + 1);
                }}
                className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
              >
                <Eye className="h-4 w-4" />
              </button>
              <AddWishlist
                imageUrl={item.jewelry_assets.thumbnailUrl}
                jewelryAssetId={item.jewelry_assets.id}
              />
            </div>

            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                {item.category.name}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-indigo-600 px-2 py-1 text-sm font-bold text-white">
                ${item.jewelry_assets.price}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="mb-2 line-clamp-1 font-semibold">
              {item.jewelry_assets.name}
            </h3>
            <p className="text-muted-foreground mb-3 line-clamp-2 truncate text-sm">
              {item.jewelry_assets.description}
            </p>
            <div className="h-[60px]">
              <div className="mb-3 flex flex-wrap gap-1">
                {item.tags.map((tag, idx) => (
                  <Badge key={idx}>{tag}</Badge>
                ))}
                <Badge>+30</Badge>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.user.image ?? "https://github.com/shadcn.png"} />
                  <AvatarFallback>{item?.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">{item.user.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">
                  {item.reviewCount} Reviews
                </span>
              </div>
            </div>

            <button
              disabled={isPending && selected3D === item.jewelry_assets.id}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-700"
              onClick={() => handleAddToCart(item.jewelry_assets.id)}
            >
              {isPending && selected3D === item.jewelry_assets.id ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>{t("add_to_cart")}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              className="bg-card fixed top-1/2 left-1/2 z-50 h-[80vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-xl"
            >
              <ModelViewer src={selected3D} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
