import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IKImage } from "imagekitio-react";
import { getJewerlyById } from "~/actions/jewerly.action";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/(main)/assets/$assetId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { assetId } = Route.useParams();
  const {
    data: jewerly,
    isError,
    isLoading,
  } = useSuspenseQuery({
    queryKey: ["jewerly", assetId],
    queryFn: () => getJewerlyById({ data: { id: assetId } }),
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-2xl font-light text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            {jewerly.data.typeAsset == "image" ? (
              <IKImage
                src={jewerly.data.imageUrl ?? ""}
                className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
                alt="Asset Image"
              />
            ) : (
              <ModelViewer src={jewerly.data.imageUrl ?? ""} />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-4xl font-bold text-gray-900 lg:text-5xl">
              {jewerly.data.name}
            </h1>
            <p className="mt-4 font-sans text-2xl text-gray-700">
              ${jewerly.data.price?.toLocaleString()}
            </p>
            <Separator className="my-6" />
            <p className="font-sans text-base leading-relaxed text-gray-600">
              {jewerly.data.description}
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="w-full bg-gray-900 text-white hover:bg-gray-800"
              >
                Add to Cart
              </Button>
            </div>
            <div className="mt-8 border-t pt-6">
              <h3 className="font-sans text-lg font-semibold text-gray-800">
                Specifications
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">Asset Type</p>
                  <p>{jewerly.data.typeAsset}</p>
                </div>
                <div>
                  <p className="font-medium">Category ID</p>
                  <p>{jewerly.data.categoryId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
