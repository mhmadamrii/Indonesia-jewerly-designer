import { createFileRoute } from "@tanstack/react-router";
import { AssetPublish } from "./-components/asset-publish";

export const Route = createFileRoute("/(main)/~/artist/publishing/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex items-center justify-center border px-4 py-2">
      <AssetPublish onClose={() => console.log("close")} />
    </section>
  );
}
