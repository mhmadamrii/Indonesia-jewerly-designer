import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useFormStorage } from "~/lib/store";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1),
  price: z.coerce.number().min(1).max(10000),
  currency: z.string(),
  category: z.string(),
  desc: z.string(),
  image_url: z.string().optional(),
});

interface IProps {
  onStepClick: (stepNumber: number) => void;
}

export function JewerlyForm({ onStepClick }: IProps) {
  const { addJewerlyForm, jewerlyForm } = useFormStorage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      currency: "",
      category: "",
      desc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      addJewerlyForm(values);
      onStepClick(2);
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (!jewerlyForm) return;

    const fields = [
      "title",
      "price",
      "currency",
      "category",
      "desc",
      "image_url",
    ] as const;

    fields.forEach((field) => {
      if (jewerlyForm[field]) {
        form.setValue(field, jewerlyForm[field]);
      }
    });

    const timeout = setTimeout(() => {
      form.setValue("category", jewerlyForm.category);
      form.setValue("currency", jewerlyForm.currency);
    }, 900);

    return () => clearTimeout(timeout); // 👈 clear timeout on unmount
  }, [jewerlyForm, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-10 py-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input placeholder="Ring" type="" {...field} />
              </FormControl>
              <FormDescription>Your asset name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select category to display"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* {categories?.data?.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
              <FormDescription>Select Your Asset Category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="3000" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Your Asset Price</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="idr">IDR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Your Currency Asset</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Placeholder" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Please Provide A Detailed Description of Your Asset.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-end">
          <Button
            className="w-full cursor-pointer bg-[#FF3B30] hover:bg-[#FF3B30]/80 sm:w-1/4"
            type="submit"
          >
            Next Step
          </Button>
        </div>
      </form>
    </Form>
  );
}
