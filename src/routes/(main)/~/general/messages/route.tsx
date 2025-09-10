import * as Ably from "ably";

import { ChatClient } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ChatList } from "./-components/chat-list";
import { SelectUserProvider } from "./-components/select-user-provider";

export const Route = createFileRoute("/(main)/~/general/messages")({
  component: RouteComponent,
});

const ablyClient = new Ably.Realtime({
  clientId: "ably-chat",
  key: import.meta.env.VITE_ABLY_API_KEY,
});

function RouteComponent() {
  const chatClient = new ChatClient(ablyClient);
  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider name={"Lobby"}>
        <SelectUserProvider>
          <div className="mx-2 grid h-[calc(100vh-4.5rem)] grid-cols-[350px_1fr] overflow-hidden rounded-sm border">
            <ChatList />
            <Outlet />
          </div>
        </SelectUserProvider>
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
