import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { PlusCircle, Search } from "lucide-react";
import { useContext, useState } from "react";
import { getAllConversations } from "~/actions/message.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { DialogSelectUser } from "./dialog-select-user";
import { SelectUserContext } from "./select-user-provider";

export function ChatList() {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setSelectedUser } = useContext(SelectUserContext);

  const { data: allConversations } = useQuery({
    queryKey: ["chat_list_conversations"],
    queryFn: getAllConversations,
  });

  return (
    <div className="text-card-foreground flex h-screen flex-col border-r">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chats</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="Chats search..." className="pl-10" />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4.5rem)]">
        <div className="flex flex-col">
          {allConversations?.data.map((chat, index) => (
            <div
              onClick={() => {
                setSelectedUser({
                  id: chat.receiver.id,
                  name: chat.receiver.name,
                  image: chat.receiver.image,
                });
                navigate({
                  to: "/~/general/messages",
                  search: { conv: chat.conversationId },
                });
              }}
              key={index}
              className={cn(
                "bg-background hover:bg-card flex cursor-pointer items-center gap-4 border-l p-4",
                index !== 0 && "border-t",
              )}
            >
              <Avatar className="h-12 w-12 border-2 border-transparent">
                <AvatarImage
                  src={chat?.receiver?.image ?? "/placeholder-img.jpg"}
                  alt={chat?.receiver?.name ?? ""}
                />
                <AvatarFallback>{chat.receiver?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{chat?.receiver.name}</h2>
                  <span className="text-muted-foreground text-xs">{30}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground truncate text-sm">
                    {chat.lastMessage?.content}
                  </p>
                  <div className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                    30
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <DialogSelectUser open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
