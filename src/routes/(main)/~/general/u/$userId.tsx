import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getUserById } from "~/actions/user.action";
import { UserProfile } from "./-components/profile";

export const Route = createFileRoute("/(main)/~/general/u/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { data } = useQuery({
    queryKey: [`user_${userId}`],
    queryFn: () => getUserById({ data: { id: userId } }),
  });

  return <UserProfile userById={data?.data} />;
}
