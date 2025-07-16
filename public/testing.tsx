import { useState } from "react";
import { Button } from "~/components/ui/button";

export function Testing() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <Button onClick={() => setCount(c => c + 1)}>Increment {count}</Button>
    </section>
  )
}
