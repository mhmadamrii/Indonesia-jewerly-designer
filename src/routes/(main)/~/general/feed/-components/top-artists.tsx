import { Link } from "@tanstack/react-router";
import { FlipButton } from "~/components/animate-ui/buttons/flip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { User } from "~/lib/db/types";

type TopArtistsProps = {
  users: User[];
};

export function TopArtists({ users }: TopArtistsProps) {
  return (
    <Card className="flex flex-wrap gap-4">
      <CardTitle className="flex w-full items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Top Artist</h1>
        <h1 className="text-muted-foreground text-sm">See All</h1>
      </CardTitle>
      <CardContent className="px-3">
        {users?.slice(0, 5).map((item) => {
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
                      @{item.email.split("@")[0]}
                    </span>
                  </div>
                </div>
                <div className="">
                  <FlipButton frontText="Follow" backText="😳" />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
