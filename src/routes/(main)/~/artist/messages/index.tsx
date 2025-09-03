import * as Ably from "ably";

import { ChatClient } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChatInterface } from "./-components/chat-interface";
import { ChatList } from "./-components/chat-list";

export const Route = createFileRoute("/(main)/~/artist/messages/")({
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
      <ChatRoomProvider name={"Lobby"}>
        <div className="mx-2 grid h-[calc(100vh-4.5rem)] grid-cols-[350px_1fr] overflow-hidden rounded-sm border">
          <ChatList />
          <ChatInterface />
        </div>
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
