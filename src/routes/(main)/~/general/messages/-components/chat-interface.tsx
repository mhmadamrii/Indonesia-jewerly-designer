"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

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
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "customer" | "seller";
  timestamp: Date;
  type: "text" | "file";
  fileName?: string;
}

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

export function ChatInterface() {
  const [userRole, setUserRole] = useState<"customer" | "seller">("customer");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm interested in your products. Could you tell me more about customization options?",
      sender: "customer",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      content:
        "Hi there! Absolutely, we offer various customization options. What specific product are you looking at?",
      sender: "seller",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: userRole,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
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
          <div className="bg-muted flex items-center gap-2 rounded-lg p-1">
            <Button
              variant={userRole === "customer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setUserRole("customer")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Customer
            </Button>
            <Button
              variant={userRole === "seller" ? "default" : "ghost"}
              size="sm"
              onClick={() => setUserRole("seller")}
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Seller
            </Button>
          </div>
        </div>
        {/* Safety Banner */}
      </div>

      {/* Chat Messages */}
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === userRole ? "flex-row-reverse" : "flex-row"}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className={
                    message.sender === "seller"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }
                >
                  {message.sender === "seller" ? "S" : "C"}
                </AvatarFallback>
              </Avatar>

              <div
                className={`flex max-w-xs flex-col lg:max-w-md ${
                  message.sender === userRole ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.sender === userRole
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-muted-foreground mt-1 text-xs">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Suggestions */}
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

      {/* Message Input */}
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

          <Button onClick={handleSendMessage} className="px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* File Upload Options */}
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
              // Handle file upload logic here
              console.log("File selected:", file.name);
            }
          }}
        />
      </div>
    </div>
  );
}
