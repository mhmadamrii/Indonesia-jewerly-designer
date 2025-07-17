import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <section className="flex h-[80vh] items-center justify-center">
      <div className="bg-background flex items-center justify-center">
        <div className="space-y-6 p-8 text-center">
          <div className="flex justify-center">
            <Construction className="text-muted-foreground h-24 w-24" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Under Development</h1>
            <p className="text-muted-foreground mx-auto max-w-md text-lg">
              This page is currently being built. Please check back later for updates.
            </p>
          </div>

          <Button asChild size="lg">
            <Link to="/~/general/feed">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
