import { useMessages } from "@ably/chat/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mic, Paperclip, Phone, Send, Smile, Video } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { createMessage, getMessagesByConversationId } from "~/actions/message.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { authClient } from "~/lib/auth/auth-client";
import { SelectUserContext } from "./select-user-provider";

type MessageType = {
  content: string;
  createdAt: Date;
  imageUrl?: string;
};

export function ChatInterface({ convId }: { convId: string }) {
  const { data: session } = authClient.useSession();
  const { selectedUser } = useContext(SelectUserContext);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { data: conversationDataById } = useQuery({
    queryKey: ["chat_interface_conversation", convId],
    queryFn: () => getMessagesByConversationId({ data: { conversationId: convId } }),
    enabled: !!convId,
  });
  console.log("conversationDataById", conversationDataById);
  console.log("selectedUser", selectedUser);

  const { mutate: createMessageFn } = useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const { sendMessage: send } = useMessages({
    listener: (event) => {
      console.log("received message", event.message);
      createMessageFn({
        data: {
          content: event.message.text,
          conversationId: convId,
        },
      });
      const newMessages = {
        content: event.message.text,
        createdAt: event.message.createdAt,
      };
      setMessages((prev) => [...prev, newMessages]);
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
    if (!selectedUser || !newMessage.trim()) {
      return toast.error("Please select a user and enter a message");
    }

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

  const handleSetPrevMessages = () => {
    const prevMessages = conversationDataById?.data?.map((m) => ({
      content: m.message.content,
      createdAt: m.message.createdAt,
      imageUrl: m.user.image,
    }));
    setMessages(prevMessages as MessageType[]);
  };
  console.log("messages", messages);

  useEffect(() => {
    if (convId) {
      handleSetPrevMessages();
    }
  }, [convId, conversationDataById]);

  return (
    <div className="bg-background text-foreground flex h-[calc(100vh-4.5rem)] flex-col">
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={selectedUser?.image ?? "/placeholder-img.jpg"}
                alt="User"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{selectedUser?.name}</h2>
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
            {messages?.map((message, idx) => {
              return (
                <motion.div
                  key={idx} // Prefer stable unique ID if available
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={message.imageUrl ?? "/placeholder-img.jpg"}
                      alt={session?.user?.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      X
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex max-w-xs flex-col lg:max-w-md">
                    <div className="rounded-lg px-3 py-2">
                      <p className="text-sm">{message.content}</p>
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
