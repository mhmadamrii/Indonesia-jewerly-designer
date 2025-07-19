import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/playground")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <section className="grid h-[60vh] w-full grid-cols-2 grid-rows-6 gap-2 border border-red-500 sm:grid-cols-3 sm:grid-rows-3">
        {Array.from({ length: 9 }).map((item, idx) => (
          <div className="h-full w-full bg-blue-400">{idx + 1}</div>
        ))}
      </section>
    </div>
  );
}
