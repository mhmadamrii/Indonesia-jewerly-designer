import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { PasswordInput } from "~/components/ui/password-input";
import { authClient } from "~/lib/auth/auth-client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

interface IProps {
  onClickRegisterForm: Dispatch<SetStateAction<boolean>>;
}

export function RegisterForm({ onClickRegisterForm }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
        {
          onSuccess: (res) => {
            toast.success("Sign up successful");
            navigate({
              to: "/~/general/feed",
            });
          },
          onError: (error) => {
            console.log("error", error);
            toast.error(error.error.message);
          },
        },
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="w-full rounded-xl"
                    placeholder="John Doe"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="w-full rounded-xl"
                    placeholder="john@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isLoading}
                    className="w-full rounded-xl"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Button
              className="w-full cursor-pointer rounded-3xl bg-[#FF3B30] hover:bg-[#FF3B30]/80 dark:text-white"
              type="submit"
            >
              {isLoading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
            <Button
              onClick={() => onClickRegisterForm(true)}
              variant="outline"
              className="w-full cursor-pointer rounded-3xl"
              type="button"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
