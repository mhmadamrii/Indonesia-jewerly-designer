import { Message } from "@ably/chat";
import { useMessages } from "@ably/chat/react";
import { useQuery } from "@tanstack/react-query";
import { Mic, Paperclip, Phone, Send, Smile, Video } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getAllArtist } from "~/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { authClient } from "~/lib/auth/auth-client";

export function ChatInterface() {
  const { data: session } = authClient.useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { data: allArtists } = useQuery({
    queryKey: ["all_artists"],
    queryFn: getAllArtist,
  });

  const { sendMessage: send } = useMessages({
    listener: (event) => {
      console.log("received message", event.message);
      setMessages((prev) => [...prev, event.message]);
    },
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await send({
        text: newMessage,
        metadata: {
          userId: session?.user.id,
          role: "customer",
          type: "text",
        },
      });
      setNewMessage("");
    } catch (error) {
      console.error("error sending message", error);
    }
  };

  return (
    <div className="bg-background text-foreground flex h-[calc(100vh-4.5rem)] flex-col">
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-img.jpg" alt="Jacquenetta Slowgrave" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Jacquenetta Slowgrave</h2>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-500">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((message, idx) => {
              const messageRole = message.metadata?.role || "customer";
              const isCurrentUser = messageRole === "seller";

              return (
                <motion.div
                  key={idx} // Prefer stable unique ID if available
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex gap-3 ${
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      // @ts-expect-error
                      src={
                        messageRole !== "seller"
                          ? session?.user?.image
                          : "/placeholder-img.jpg"
                      }
                      alt={session?.user?.name}
                    />
                    <AvatarFallback
                      className={
                        messageRole === "seller"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {messageRole === "seller" ? "S" : "C"}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex max-w-xs flex-col lg:max-w-md ${
                      isCurrentUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className="text-muted-foreground mt-1 text-xs">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <footer className="border-t p-4">
        <div className="bg-muted flex items-center gap-2 rounded-lg px-3 py-2">
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Enter message..."
            className="bg-transparent focus:ring-0"
          />
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            className="bg-primary text-primary-foreground rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
