import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChatInterface } from "./-components/chat-interface";

export const Route = createFileRoute("/(main)/~/general/messages/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedArtist, setSelectedArtist] = useState<string | null>("");

  return <ChatInterface />;
}
