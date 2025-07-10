import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FuckingGood } from "~/components/temp";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/(main)/mikail-learn")({
  component: RouteComponent,
});

// components
function Navbar() {
  const [name, setName] = useState("John");
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1 className="text-4xl">My Name is {name}</h1>
      <h1 className="text-4xl">I have clicked {count} times</h1>

      <Button onClick={() => setName("Mikail")}>Change Name</Button>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}

function RouteComponent() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <FuckingGood />
    </ClientOnly>
  );
}
