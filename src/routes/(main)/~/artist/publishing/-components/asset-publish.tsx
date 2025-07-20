import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createJewerlyAsset } from "~/actions/jewerly.action";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultipleSelector, Option } from "~/components/ui/multi-select";
import { Textarea } from "~/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
import { FileUploadDirect } from "./file-upload-direct";

interface AssetUploadProps {
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1).min(3).max(20),
  price: z.number().min(1).max(500000),
  currency: z.string(),
  category: z.string().min(3).max(30),
  description: z.string().min(5).max(200),
});

const OPTIONS: Option[] = [
  {
    label: "Arts",
    value: "arts",
  },
  {
    label: "Music",
    value: "music",
  },
  {
    label: "Gaming",
    value: "gaming",
  },
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Food",
    value: "food",
  },
  {
    label: "Travel",
    value: "travel",
  },
];

export function AssetPublish({ onClose }: AssetUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createJewerlyAsset,
    onSuccess: (res) => {
      console.log("res", res);
      toast.success("Data saved successfully");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateAsync({
        data: {
          name: values.name,
          description: values.description,
          price: values.price,
          imageUrl: "",
          categoryId: values.category,
          typeAsset: "image",
        },
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl font-bold">Upload 3D Asset</h2>
        </CardTitle>
        <CardDescription>Upload & post your 3D models</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full space-y-8 py-10"
          >
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Miniatur"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>Your models title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full items-center gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="200"
                        type="number"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>Your models price</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select listed currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Your currency model</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Arts" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Your models category</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">Tags</label>
              <MultipleSelector
                defaultOptions={OPTIONS}
                placeholder="Select frameworks you like..."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your future asset investment"
                      className="resize-none"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>Provide clear description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-center">
              <FileUploadDirect />
            </div>

            <div className="flex w-full items-center justify-end">
              <Button
                className="w-[100px] cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
