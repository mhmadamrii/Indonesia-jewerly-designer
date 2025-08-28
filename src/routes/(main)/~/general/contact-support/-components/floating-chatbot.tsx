import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { sendMessageToVAI } from "~/actions/ai.action";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

import {
  Bot,
  Clock,
  Maximize2,
  MessageCircle,
  Minimize2,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "admin";
  timestamp: Date;
  senderName?: string;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Selamat datang di Indonesia Jewelry Designer. Saya Sari, asisten virtual Anda. Ada yang bisa saya bantu hari ini?",
      sender: "bot",
      timestamp: new Date(),
      senderName: "Sari - AI Assistant",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnectedToAdmin, setIsConnectedToAdmin] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const botResponses = [
    "Terima kasih atas pertanyaan Anda! Untuk perhiasan custom, kami membutuhkan waktu 2-4 minggu. Apakah Anda ingin konsultasi dengan designer kami?",
    "Kami menggunakan emas 18K dan 22K berkualitas tinggi. Semua perhiasan dilengkapi sertifikat. Apakah ada desain khusus yang Anda inginkan?",
    "Harga perhiasan bervariasi tergantung material dan kompleksitas desain. Mulai dari Rp 2 juta untuk cincin sederhana. Ingin saya hubungkan dengan tim sales?",
    "Kami melayani pengiriman ke seluruh Indonesia dengan asuransi penuh. Gratis ongkir untuk pembelian di atas Rp 5 juta. Ada alamat khusus?",
    "Garansi kami mencakup 1 tahun untuk kerusakan manufaktur dan service gratis seumur hidup. Apakah ada perhiasan yang perlu diperbaiki?",
    "Untuk konsultasi lebih detail, saya akan menghubungkan Anda dengan customer service kami. Mohon tunggu sebentar...",
  ];

  const { mutate: sendToAI } = useMutation({
    mutationFn: sendMessageToVAI,
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const handleAIAssistant = () => {};

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendToAI({ data: { message: inputMessage } });

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
        senderName: "Sari - AI Assistant",
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // Sometimes connect to admin
      if (Math.random() > 0.7 && !isConnectedToAdmin) {
        setTimeout(() => {
          setIsConnectedToAdmin(true);
          const adminMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "Halo, saya Rina dari customer service. Saya akan membantu Anda lebih lanjut. Ada yang bisa saya bantu?",
            sender: "admin",
            timestamp: new Date(),
            senderName: "Rina - Customer Service",
          };
          setMessages((prev) => [...prev, adminMessage]);
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) {
    return (
      <div className="fixed right-6 bottom-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 cursor-pointer rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
        <div className="absolute -top-2 -left-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-6 bottom-20 z-50 w-[400px] max-w-full">
      <Card
        className={`gap-0 pt-0 shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-[500px]"}`}
      >
        <CardHeader className="my-0 rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
              </div>
              <div>
                <CardTitle className="text-sm">Customer Support</CardTitle>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <Clock className="h-3 w-3" />
                  <span>Online 24/7</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="mt-0 flex h-full flex-col p-0">
            <div className="border-b bg-gray-50 px-2 py-0 text-xs text-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isConnectedToAdmin ? (
                    <>
                      <User className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">Connected to Rina</span>
                    </>
                  ) : (
                    <>
                      <Bot className="h-3 w-3 text-blue-600" />
                      <span className="text-blue-600">AI Assistant Active</span>
                    </>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  <Phone className="mr-1 h-3 w-3" />
                  Call
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[280px] flex-1 pt-1 pr-2 pl-1">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}
                    >
                      {message.sender !== "user" && (
                        <div className="mb-1 flex items-center gap-2">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                              message.sender === "bot"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {message.sender === "bot" ? (
                              <Bot className="h-3 w-3" />
                            ) : (
                              <User className="h-3 w-3" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {message.senderName}
                          </span>
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 text-sm ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : message.sender === "bot"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-lg bg-gray-100 p-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="bg-card rounded-md border-t p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Harga perhiasan", "Custom design", "Garansi"].map((label) => (
                  <Badge
                    onClick={() => setInputMessage(label)}
                    key={label}
                    variant="outline"
                    className="cursor-pointer text-xs"
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
