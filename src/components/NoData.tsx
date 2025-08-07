import { useNavigate } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { Button } from "~/components/ui/button";

export function NoData() {
  const navigate = useNavigate();
  return (
    <div className="flex h-[80vh] items-center justify-center p-4">
      <div className="mx-auto max-w-4xl">
        <div className="py-16 text-center">
          <Package className="mx-auto mb-6 h-24 w-24 text-slate-300" />
          <h2 className="mb-4 text-3xl font-bold">Your wishlist is empty</h2>
          <p className="mb-8">
            Discover amazing 3D assets to bring your projects to life
          </p>
          <Button
            onClick={() =>
              navigate({
                to: "/~/general/explore",
              })
            }
            size="lg"
            className="cursor-pointer"
          >
            Browse Assets
          </Button>
        </div>
      </div>
    </div>
  );
}
