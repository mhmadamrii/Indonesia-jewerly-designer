import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/profile/")({
  component: RouteComponent,
});

interface IDictionary {
  reverseString(): string;
  logger(): string;
}

function RouteComponent() {
  class Dictionary implements IDictionary {
    private s: string;

    constructor(something: string) {
      this.s = something;
    }

    reverseString() {
      if (typeof this.s !== "string") {
        throw new Error("Not a string");
      }

      const splt = this.s.split("");
      return splt.reverse().join("");
    }

    logger() {
      return this.s;
    }

    sayHello() {}
  }

  const test = new Dictionary("This is just a test");
  console.log(test.logger());
  console.log(test.reverseString());

  return (
    <section>
      <h1>Profile</h1>
    </section>
  );
}
