import { useQuery } from "@tanstack/react-query";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { getJewerlyById } from "~/actions/jewerly.action";
import { AssetEdit } from "../-components/asset-edit";
import { UploadTermsConditions } from "../-components/upload-terms-conditions";

export const Route = createFileRoute("/(main)/~/artist/publishing/edit/$assetId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { assetId } = Route.useParams();

  const { data } = useQuery({
    queryKey: ["jewelry_asset", assetId],
    queryFn: () => getJewerlyById({ data: { id: assetId } }),
  });
  console.log("data", data);

  if (!data) return <div>Loading...</div>;

  return (
    <section className="flex justify-center gap-3 px-4 py-2">
      <AssetEdit initialData={data?.data} />
      <ClientOnly fallback={<div>Loading...</div>}>
        <UploadTermsConditions />
      </ClientOnly>
    </section>
  );
}
