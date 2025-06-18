import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { LoginForm } from "./-components/login-form";
import { RegisterForm } from "./-components/register-form";

export const Route = createFileRoute("/(auth)/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <Card>
        <section className="flex w-full flex-col items-center justify-center">
          <img src="/djiwaID.svg" alt="djiwaID" className="h-[100px] w-[120px]" />
          <h1 className="text-lg font-bold">Login</h1>
        </section>
        <CardContent>
          {isLoginForm ? <LoginForm /> : <RegisterForm />}
          <Button onClick={() => setIsLoginForm((prev) => !prev)}>
            {isLoginForm ? "Register" : "Login"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
