import * as Ably from "ably";

import { ChatClient } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChatInterface } from "./-components/chat-interface";

export const Route = createFileRoute("/(main)/~/general/messages/")({
  component: RouteComponent,
});

const ablyClient = new Ably.Realtime({
  clientId: "ably-chat",
  key: import.meta.env.VITE_ABLY_API_KEY,
});

function RouteComponent() {
  const chatClient = new ChatClient(ablyClient);
  const [selectedArtist, setSelectedArtist] = useState<string | null>("");

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider name={selectedArtist ?? "Lobby"}>
        <ChatInterface
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
        />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
