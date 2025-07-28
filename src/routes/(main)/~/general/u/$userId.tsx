import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/~/general/u/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  return (
    <div>
      <h1>User with id: {userId}</h1>
    </div>
  );
}
