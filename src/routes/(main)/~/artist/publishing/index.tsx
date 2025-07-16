import { createFileRoute } from "@tanstack/react-router";
import { AssetPublish } from "./-components/asset-publish";

export const Route = createFileRoute("/(main)/~/artist/publishing/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <AssetPublish onClose={() => console.log("close")} />
    </section>
  );
}
