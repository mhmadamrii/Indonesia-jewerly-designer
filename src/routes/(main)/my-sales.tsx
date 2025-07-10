import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/(main)/my-sales")({
  component: RouteComponent,
});

type TPerson = {
  name: string;
  age: number;
  introduce(): string;
  sayGoodBye(): string;
};

function SayHello() {
  return <h1>Hello, world!</h1>;
}

function RouteComponent() {
  const [isShowHello, setIsShowHello] = useState(true);
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  class Person implements TPerson {
    constructor(
      public name: string,
      public age: number,
    ) {
      this.name = name;
      this.age = age;
    }

    public introduce() {
      return `Hi, my name is ${this.name} and I'm ${this.age} years old.`;
    }

    public sayGoodBye() {
      return `Good bye, ${this.name}!`;
    }
  }

  class Employee extends Person {
    constructor(
      name: string,
      role: string,
      public company: string,
    ) {
      super(name, 0);
      this.company = company;
    }
  }
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      console.log("hello", event);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section>
      <Button onClick={() => setIsShowHello(!isShowHello)}>Show Hello</Button>
      {isShowHello && <SayHello />}

      {/* <h1>My Sales</h1>
      <div className="mb-1 flex space-x-1">
        {[1, 2, 3, 4, 5].map((ratingValue) => (
          <Star
            key={ratingValue}
            className={`h-6 w-6 cursor-pointer ${
              (
                hoveredRating !== null
                  ? hoveredRating >= ratingValue
                  : rating !== null && rating >= ratingValue
              )
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onMouseEnter={() => setHoveredRating(ratingValue)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => setRating(ratingValue === rating ? null : ratingValue)}
          />
        ))}
      </div> */}
    </section>
  );
}
