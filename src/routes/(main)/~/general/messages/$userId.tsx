import { createFileRoute } from "@tanstack/react-router";
import { ChatInterface } from "./-components/chat-interface";

export const Route = createFileRoute("/(main)/~/general/messages/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatInterface />;
}
