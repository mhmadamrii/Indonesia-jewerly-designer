import { createFileRoute } from "@tanstack/react-router";
import { ModelViewer } from "~/components/3D/model-viewer";

export const Route = createFileRoute("/(main)/~/artist/lah/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-10 py-8">
      <ModelViewer src="https://ik.imagekit.io/mhmadamrii/jewelry_SXMHTiP6m.glb" />
    </div>
  );
}
