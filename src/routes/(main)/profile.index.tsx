import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/profile/")({
  component: RouteComponent,
});

interface IPerson {
  sayHello(): string;
  sayGoodbye(): string;
}

function RouteComponent() {
  class Person implements IPerson {
    constructor(
      public name: string,
      public age: number,
    ) {
      this.name = name;
      this.age = age;
    }

    sayHello() {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }

    sayGoodbye() {
      return `Goodbye, my name is ${this.name} and I am ${this.age} years old.`;
    }
  }

  class Employee extends Person {
    constructor(
      public company: string,
      name: string,
      age: number,
    ) {
      super(name, age);
      this.company = company;
    }

    sayHello(): string {
      return `Hello, my name is ${this.name} and I am ${this.age} years old. I work for ${this.company}.`;
    }

    static create(task: string, amount: number): string {
      return `${this.name} creates ${task} for ${amount} dollars`;
    }
  }

  const employee = new Employee("Acme Inc.", "John Doe", 30);
  console.log(employee.sayHello());
  console.log(employee.sayGoodbye());
  console.log(Employee.create("Task", 100));

  return (
    <section>
      <h1>Profile</h1>
    </section>
  );
}
