import { ClientOnly, Link } from "@tanstack/react-router";
import { IKImage } from "imagekitio-react";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Card, CardContent } from "~/components/ui/card";
import { JewerlyWithUser } from "~/lib/db/types";

type TrendingsProps = {
  jewerlies: JewerlyWithUser[];
};

export function Trendings({ jewerlies }: TrendingsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {jewerlies?.map((item) => (
        <Card className="relative w-full rounded-sm" key={item.jewerly_assets.id}>
          <CardContent className="flex h-[300px] flex-col gap-5">
            {item.jewerly_assets.imageUrl && item.jewerly_assets.typeAsset == "image" && (
              <IKImage
                src={item.jewerly_assets.imageUrl ?? ""}
                className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
                alt="Asset Image"
              />
            )}
            {item.jewerly_assets.imageUrl &&
              item.jewerly_assets.typeAsset == "non-image" && (
                <ClientOnly fallback={<div>Loading...</div>}>
                  <ModelViewer src={item.jewerly_assets.imageUrl ?? ""} />
                </ClientOnly>
              )}
            <div className="flex w-full items-center justify-between">
              <Link
                to="/assets/$assetId"
                params={{
                  assetId: item.jewerly_assets.id,
                }}
              >
                <h1 className="text-2xl font-semibold">{item.jewerly_assets.name}</h1>
              </Link>
              <span className="text-muted-foreground">21.5K Views</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Price</span>
              <span className="uppercase">$ {item.jewerly_assets.price}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
