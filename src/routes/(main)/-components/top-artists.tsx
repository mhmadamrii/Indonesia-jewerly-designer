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
        {users?.map((item) => {
          return (
            <div className="mb-4 w-full max-w-[300px]" key={item.id}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.image ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">@user</span>
                  </div>
                </div>
                <div className="">
                  <FlipButton
                    frontText="Follow"
                    backText="😳"
                    className="rounded-full text-[#5429FF] hover:bg-[EEEAFF]/80"
                  />
                  {/* <Button
                    className={cn(
                      "cursor-pointer rounded-full bg-[#EEEAFF] text-[#5429FF] hover:bg-[EEEAFF]/80",
                    )}
                  >
                    Follow
                  </Button> */}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
