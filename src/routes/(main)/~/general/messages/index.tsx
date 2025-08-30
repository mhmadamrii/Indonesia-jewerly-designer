import * as Ably from "ably";

import { ChatClient } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import { createFileRoute } from "@tanstack/react-router";
import { AblyChat } from "./-components/ably-chat";

export const Route = createFileRoute("/(main)/~/general/messages/")({
  component: RouteComponent,
});

const ablyClient = new Ably.Realtime({
  clientId: "ably-chat",
  key: "wZhwjw.JNu2jQ:t8RVWiqkNRIcdLeaqwFlI7x4pa4G4UfpnIiCcB3Sy5Y",
});

function RouteComponent() {
  const chatClient = new ChatClient(ablyClient);

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider name="messages">
        <AblyChat />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
