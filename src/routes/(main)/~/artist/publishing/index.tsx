import { createFileRoute } from "@tanstack/react-router";
import { AssetPublish } from "./-components/asset-publish";
import { UploadTermsConditions } from "./-components/upload-terms-conditions";

export const Route = createFileRoute("/(main)/~/artist/publishing/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex justify-center gap-3 border px-4 py-2">
      <AssetPublish />
      <UploadTermsConditions />
    </section>
  );
}
