import { IKImage } from "imagekitio-react";
import { Download, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { JewerlyWithUser } from "~/lib/db/types";

type TrendingsProps = {
  jewerlies: JewerlyWithUser[];
};

export function Trendings({ jewerlies }: TrendingsProps) {
  const [selected3D, setSelected3D] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  class Person {
    constructor() {}
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {jewerlies?.map((item, idx) => (
        <motion.div
          layoutId={`card-${idx + 1}`}
          className="group bg-card overflow-hidden rounded-md border shadow-md transition-all duration-300 hover:shadow-xl"
          key={item.jewerly_assets.id}
        >
          <div className="relative overflow-hidden">
            {item.jewerly_assets.thumbnailUrl && (
              <IKImage
                src={item.jewerly_assets.thumbnailUrl ?? ""}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt="Asset Image"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={() => {
                  setSelected3D(item.jewerly_assets.assetUrl);
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
                {item.category?.name}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-indigo-600 px-2 py-1 text-sm font-bold text-white">
                ${item.jewerly_assets.price}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="mb-2 line-clamp-1 font-semibold">
              {item.jewerly_assets.name}
            </h3>
            <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
              {item.jewerly_assets.description}
            </p>

            <div className="mb-3 flex flex-wrap gap-1">
              {Array.from({ length: 3 }).map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  Asset
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
                    src={item.user?.image ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{item.user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">{item.user?.name}</span>
              </div>

              <div className="ml-auto flex items-center">
                <Star className="h-3 w-3 fill-current text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{30}</span>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Download className="mr-1 h-4 w-4" />
                <span>300</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-current text-yellow-400" />
                <span>30</span>
              </div>
            </div>

            <button
              onClick={() => console.log("jfkla;d")}
              className={`flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${"bg-indigo-600 text-white hover:scale-105 hover:bg-indigo-700"}`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{"Add to Cart"}</span>
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
