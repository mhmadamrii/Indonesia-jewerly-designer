import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  youtube: z.string().min(1),
  dribble: z.string().min(1),
  other: z.string().min(1),
});

interface IProps {
  onStepClick: (stepNumber: number) => void;
}

export function JewerlyLinkForm({ onStepClick }: IProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-col gap-4 px-10"
      >
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube</FormLabel>
              <FormControl>
                <Input placeholder="https://youtube.com/" type="text" {...field} />
              </FormControl>
              <FormDescription>Your youtube link for your asset</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dribble"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your dribble link</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormDescription>Your Dribble link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other</FormLabel>
              <FormControl>
                <Input placeholder="https://something.com" type="" {...field} />
              </FormControl>
              <FormDescription>another available links</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-end">
          <Button
            onClick={() => onStepClick(4)}
            className="w-full cursor-pointer bg-[#FF3B30] hover:bg-[#FF3B30]/80 sm:w-1/4"
            type="button"
          >
            Next Step
          </Button>
        </div>
      </form>
    </Form>
  );
}
