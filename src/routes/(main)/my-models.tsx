import { createFileRoute } from "@tanstack/react-router";
import { ModelViewer } from "~/components/3D/model-viewer";

export const Route = createFileRoute("/(main)/my-models")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ModelViewer src="https://ik.imagekit.io/mhmadamrii/Muhammad_Amri-1750390215514_7E23nhqYS.png" />
  );
}
