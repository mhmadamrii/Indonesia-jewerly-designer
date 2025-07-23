import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { authClient } from "~/lib/auth/auth-client";
import { LoginForm } from "./-components/login-form";
import { RegisterForm } from "./-components/register-form";

export const Route = createFileRoute("/(auth)/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme } = useTheme();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const redirectUrl = "/auth";

  const handleLoginWithGmail = () => {
    setIsLoading(true);
    authClient.signIn.social({
      provider: "google",
      callbackURL: redirectUrl,
    });
  };
  return (
    <Card className="mx-0 sm:mx-auto">
      <section className="flex w-full flex-col items-center justify-center">
        <img
          src={
            theme === "dark" || theme === "system" ? "/djiwaID-dark.svg" : "/djiwaID.svg"
          }
          alt="djiwaID"
          className="h-[80px] w-[120px]"
        />
        <h1 className="text-lg font-bold">Login</h1>
      </section>
      <section className="flex w-full flex-col gap-2 px-5 text-center">
        <Button
          variant="outline"
          className="w-full cursor-pointer rounded-3xl border-[#FF3B30]"
          onClick={handleLoginWithGmail}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Sign in with Google"}
        </Button>
        <Button
          onClick={() => toast.error("Not implemented")}
          variant="outline"
          className="w-full cursor-pointer rounded-3xl border-[#4E8FFF]"
        >
          Sign in with Facebook
        </Button>
        <span className="text-muted-foreground">or, use email address</span>
      </section>
      <section className="px-5 py-0">
        {isLoginForm ? (
          <LoginForm onClickLoginForm={setIsLoginForm} />
        ) : (
          <RegisterForm onClickRegisterForm={setIsLoginForm} />
        )}
      </section>
    </Card>
  );
}
