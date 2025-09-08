import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Search, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createConversation } from "~/actions/message.action";
import { getAllArtist } from "~/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

interface UserSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export function DialogSelectUser({ open, onOpenChange }: UserSelectionDialogProps) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const { data: allArtists } = useQuery({
    queryKey: ["chat_list_artists"],
    queryFn: getAllArtist,
  });

  const { mutate: createNewConversation } = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["chat_list_conversations"],
      });
      toast.success("Conversation created successfully");
      onOpenChange(false);
      setSelectedUser(null);
      setSearchQuery("");
    },
  });

  const filteredUsers = allArtists?.data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStartChat = () => {
    createNewConversation({
      data: {
        type: "private",
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Select User to Chat With
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* User List */}
          <div className="max-h-[300px] space-y-2 overflow-y-auto">
            {filteredUsers?.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                No users found matching your search.
              </div>
            ) : (
              filteredUsers?.map((user) => (
                <div
                  key={user.id}
                  className={`hover:bg-accent cursor-pointer rounded-lg border p-3 transition-colors ${
                    selectedUser?.id.toString() === user.id
                      ? "bg-accent border-primary"
                      : "border-border"
                  }`}
                  onClick={() =>
                    setSelectedUser({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      image: user.image ?? "",
                    })
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.image || "/placeholder-img.jpg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 ${getStatusColor("online")}`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate text-sm font-medium">{user.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground truncate text-xs">
                        {user.email}
                      </p>
                      <p className="text-muted-foreground text-xs">last seen</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedUser && (
            <div className="bg-muted rounded-lg p-3">
              <div className="mb-3 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={selectedUser.image || "/placeholder.svg"}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Selected: {selectedUser.name}</p>
                  <p className="text-muted-foreground text-xs">{selectedUser.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setSelectedUser(null);
                setSearchQuery("");
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleStartChat} disabled={!selectedUser} className="flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
