import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ChatInterface } from "./-components/chat-interface";

export const Route = createFileRoute("/(main)/~/general/messages/")({
  component: RouteComponent,
  validateSearch: z.object({ conv: z.string().optional() }),
});

function RouteComponent() {
  const { conv } = Route.useSearch();

  return <ChatInterface convId={conv as string} />;
}
