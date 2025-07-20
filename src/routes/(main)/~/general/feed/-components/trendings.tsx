import { IKImage } from "imagekitio-react";
import { AnimatePresence, motion } from "motion/react";
import { lazy, useState } from "react";
import { JewerlyWithUser } from "~/lib/db/types";

const ModelViewer = lazy(() =>
  import("~/components/3D/model-viewer").then((module) => ({
    default: module.ModelViewer,
  })),
);

type TrendingsProps = {
  jewerlies: JewerlyWithUser[];
};

export function Trendings({ jewerlies }: TrendingsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  class Person {
    constructor() {}
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {jewerlies?.map((item, idx) => (
        <motion.div
          layoutId={`card-${idx + 1}`}
          onClick={() => setSelectedId(idx + 1)}
          className="relative w-full rounded-sm"
          key={item.jewerly_assets.id}
        >
          <div className="dark:bg-card bg-card flex h-[400px] flex-col gap-5 rounded-md border p-4 shadow">
            {item.jewerly_assets.thumbnailUrl && (
              <IKImage
                src={item.jewerly_assets.thumbnailUrl ?? ""}
                className="h-full w-full rounded-lg"
                alt="Asset Image"
              />
            )}
            <div className="flex w-full items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">{item.jewerly_assets.name}</h1>
                <span>{item.jewerly_assets.description}</span>
              </div>
              <span className="text-muted-foreground">21.5K Views</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Price</span>
              <span className="uppercase">$ {item.jewerly_assets.price}</span>
            </div>
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
              className="bg-card fixed top-1/2 left-1/2 z-50 h-[80vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-xl"
            >
              <h2 className="mb-2 text-xl font-bold text-red-500">Item {selectedId}</h2>
              <p>This is the expanded view.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
