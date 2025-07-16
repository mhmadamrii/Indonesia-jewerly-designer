import { createFileRoute } from "@tanstack/react-router";
import { AssetGrid } from "./-components/asset-grid";
import { mockAssets } from "./-components/mock-assets";

export const Route = createFileRoute("/(main)/~/general/explore/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="container mx-auto p-4">
      <AssetGrid
        assets={mockAssets}
        onAddToCart={() => console.log("add to cart")}
        onViewDetails={() => console.log("view details")}
        cartItems={new Set()}
      />
    </section>
  );
}
