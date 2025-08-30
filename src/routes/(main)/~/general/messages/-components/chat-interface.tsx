"use client";

import { Message } from "@ably/chat";
import { useMessages } from "@ably/chat/react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getAllArtist } from "~/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { authClient } from "~/lib/auth/auth-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  AlertTriangle,
  Clock,
  FileText,
  ImageIcon,
  MessageCircle,
  Package,
  Paperclip,
  Percent,
  Send,
  Sparkles,
} from "lucide-react";

const messageSuggestions = [
  {
    icon: Package,
    text: "Custom product request",
    category: "product",
  },
  {
    icon: Percent,
    text: "Discount inquiry",
    category: "pricing",
  },
  {
    icon: Clock,
    text: "Delivery timeline",
    category: "shipping",
  },
  {
    icon: Sparkles,
    text: "Product customization",
    category: "product",
  },
];

export function ChatInterface({
  selectedArtist,
  setSelectedArtist,
}: {
  selectedArtist: string | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = authClient.useSession();

  const [userRole, setUserRole] = useState<"customer" | "seller">("customer");
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

  const handleSendMessage = async () => {
    if (selectedArtist === "") {
      return toast.error("Please select an artist first");
    }

    if (!newMessage.trim()) return;

    try {
      await send({
        text: newMessage,
        metadata: {
          userId: session?.user.id,
          role: userRole,
          type: "text",
        },
      });
      setNewMessage("");
    } catch (error) {
      console.error("error sending message", error);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-2 border p-3">
      <div className="bg-card rounded-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-primary h-6 w-6" />
            <h1 className="text-xl font-semibold text-balance">Chat Center</h1>
          </div>
          <div className="flex items-center gap-2 rounded-lg p-1">
            <Select onValueChange={setSelectedArtist}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Artist" />
              </SelectTrigger>
              <SelectContent>
                {allArtists?.data.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id}>
                    {artist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ScrollArea className="relative h-[500px] rounded-sm border">
        <div className="border-accent/20 absolute -top-4 right-0 left-0 z-50 mt-4 border bg-yellow-100 p-3 dark:bg-yellow-900">
          <div className="flex items-start gap-2 text-yellow-700 dark:text-yellow-300">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-yellow-500 dark:text-yellow-300" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Safety Notice:</strong> Transactions or communications outside this
              platform are not our responsibility. Please keep all business within the app
              for your protection.
            </p>
          </div>
        </div>

        <div className="mt-20 px-3">
          <AnimatePresence initial={false}>
            {messages.map((message, idx) => {
              const messageRole = message.metadata?.role || "customer";
              const isCurrentUser = messageRole === userRole;

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

      <div className="bg-muted/30 border-t px-4 py-2">
        <div className="flex flex-wrap gap-2">
          <span className="text-muted-foreground text-xs font-medium">
            Quick suggestions:
          </span>
          {messageSuggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="hover:bg-secondary/80 cursor-pointer transition-colors"
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <suggestion.icon className="mr-1 h-3 w-3" />
              {suggestion.text}
            </Badge>
          ))}
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Type your message as ${userRole}...`}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
              onClick={handleFileUpload}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={handleSendMessage} className="cursor-pointer px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex gap-2">
          <Button variant="outline" size="sm" onClick={handleFileUpload}>
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
          </Button>
          <Button variant="outline" size="sm" onClick={handleFileUpload}>
            <FileText className="mr-2 h-4 w-4" />
            Document
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log("File selected:", file.name);
            }
          }}
        />
      </div>
    </div>
  );
}
