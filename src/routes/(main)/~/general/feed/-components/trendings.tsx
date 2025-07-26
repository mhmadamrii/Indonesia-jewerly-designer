import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IKImage } from "imagekitio-react";
import { Eye, Heart, LoaderIcon, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createCartItem } from "~/actions/cart.action";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { JewerlyWithMeta } from "~/lib/db/types";

type TrendingsProps = {
  jewerlies: JewerlyWithMeta[];
};

export function Trendings({ jewerlies }: TrendingsProps) {
  const queryClient = useQueryClient();
  const [selected3D, setSelected3D] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createCartItem,
    onSuccess: () => {
      toast.success("Item added to cart successfully");
      queryClient.invalidateQueries();
    },
  });

  const handleAddToCart = (id: string) => {
    setSelected3D(id);
    mutate({
      data: {
        jewerlyAssetId: id,
        quantity: 1,
      },
    });
  };

  class Person {
    constructor() {}
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {jewerlies?.map((item, idx) => (
        <motion.div
          layoutId={`card-${idx + 1}`}
          className="group bg-card overflow-hidden rounded-md border shadow-md transition-all duration-300 hover:shadow-xl"
          key={item?.id}
        >
          <div className="relative overflow-hidden">
            {item.thumbnail_url && (
              <IKImage
                src={item.thumbnail_url ?? ""}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt="Asset Image"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={() => {
                  setSelected3D(item.asset_url);
                  setSelectedId(idx + 1);
                }}
                className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/30">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                {item.category_name}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-indigo-600 px-2 py-1 text-sm font-bold text-white">
                ${item.price}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="mb-2 line-clamp-1 font-semibold">{item.name}</h3>
            <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
              {item.description}
            </p>

            <div className="mb-3 flex flex-wrap gap-1">
              {item.tags
                .split(",")
                .map((tag) => tag.trim())
                .map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +30
              </span>
            </div>

            <div className="mb-3 flex items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={item.creator_image ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{item.creator_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">{item.creator_name}</span>
              </div>

              <div className="ml-auto flex items-center">
                <Star className="h-3 w-3 fill-current text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{30}</span>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Badge className="bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#193cb8"
                      strokeMiterlimit="10"
                      strokeWidth="0"
                      d="M203.136 98.672a4.15 4.15 0 0 0-4.251-1.77l-51.454 9.913L157.88 6.001a4.16 4.16 0 0 0-2.751-4.356 4.16 4.16 0 0 0-4.884 1.644l-97.69 149.144a4.155 4.155 0 0 0 .023 4.605 4.18 4.18 0 0 0 4.251 1.776l51.457-9.916-10.448 100.811a4.155 4.155 0 0 0 2.751 4.359 4.164 4.164 0 0 0 4.881-1.644l97.69-149.144a4.165 4.165 0 0 0-.023-4.608"
                    ></path>
                  </svg>
                  <span>Featured</span>
                </Badge>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-current text-yellow-400" />
                <span>30</span>
              </div>
            </div>

            <button
              disabled={isPending && selected3D === item.id}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-700"
              onClick={() => handleAddToCart(item.id)}
            >
              {isPending && selected3D === item.id ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>{"Add to Cart"}</span>
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
