import { createFileRoute } from "@tanstack/react-router";
import { ChatInterface } from "./-components/chat-interface";

export const Route = createFileRoute("/(main)/~/artist/messages/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatInterface />;
}
