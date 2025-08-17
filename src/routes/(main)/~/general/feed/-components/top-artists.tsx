import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { followUser } from "~/actions/follows.action";
import { FlipButton } from "~/components/animate-ui/buttons/flip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { User } from "~/lib/db/types";

type TopArtistsProps = {
  users: User[];
};

export function TopArtists({ users }: TopArtistsProps) {
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  const { mutate: handleFollow } = useMutation({
    mutationFn: followUser,
    onSuccess: (res) => {
      setFollowingIds((prev) => [...prev, res.data.id]);
    },
    onError: () => toast.error("You are already following this user!"),
  });

  const memoizedUsers = useMemo(() => {
    return users.slice(0, 5).filter((item) => !followingIds.includes(item.id));
  }, [users, followingIds]);

  return (
    <Card className="flex flex-wrap gap-4">
      <CardTitle className="flex w-full items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Top Artist</h1>
        <h1 className="text-muted-foreground text-sm">See All</h1>
      </CardTitle>
      <CardContent className="px-3">
        {memoizedUsers.length === 0 && (
          <div className="text-muted-foreground flex min-h-10 flex-col items-center justify-center gap-2">
            <Button className="cursor-pointer" variant="link">
              See all artists
            </Button>
          </div>
        )}
        {memoizedUsers.map((item) => {
          return (
            <div className="mb-4 w-full max-w-[300px]" key={item.id}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.image ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Link
                      to="/~/general/u/$userId"
                      params={{
                        userId: item.id,
                      }}
                      className="truncate hover:cursor-pointer hover:underline"
                    >
                      {item.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {(Math.random() * 10).toFixed(1)}k Items sold
                    </span>
                  </div>
                </div>
                <div>
                  <FlipButton
                    onClick={() => handleFollow({ data: { userId: item.id } })}
                    frontText="Follow"
                    backText="😳"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
