import { Message } from "@ably/chat";
import { useMessages } from "@ably/chat/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function AblyChat() {
  const [message, setMessage] = useState("My first message with Ably Chat!");
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage: send } = useMessages({
    listener: (event) => {
      console.log("received message", event.message);
      setMessages((prev) => [...prev, event.message]);
    },
  });

  const handleSend = async () => {
    try {
      await send({
        text: message,
        metadata: { userId: "current user 123", role: "seller" },
      });
      setMessage("");
    } catch (error) {
      console.error("error sending message", error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col gap-2">
      <h1>Ably Chat</h1>
      <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>

      <div>
        {messages.map((message, idx) => (
          <div key={idx}>
            <p>{message.text}</p>
            <p>{JSON.stringify(message.metadata)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
