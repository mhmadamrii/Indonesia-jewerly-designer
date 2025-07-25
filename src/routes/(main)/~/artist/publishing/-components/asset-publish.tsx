import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultipleSelector } from "~/components/ui/multi-select";
import { Textarea } from "~/components/ui/textarea";
import { FileUploadDirect } from "./file-upload-direct";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  createJewerlyAsset,
  getJewerlyTagsAndCategories,
} from "~/actions/jewerly.action";

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
  name: z.string().min(1).min(3).max(20),
  price: z.coerce.number().min(1).max(500000),
  currency: z.string(),
  category: z.string().min(3).max(500),
  description: z.string().min(5).max(200),
});

export function AssetPublish() {
  const navigate = useNavigate();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [tagsValue, setTagsValue] = useState<{ value: string; label: string }[]>([]);
  const [imageUrl, setImageUrl] = useState({
    asset_url: "",
    thumbnail_url: "",
  });

  const { data: tagsAndCategories } = useQuery({
    queryKey: ["tags_and_categories"],
    queryFn: () => getJewerlyTagsAndCategories(),
  });

  console.log("tagsAndCategories", tagsAndCategories);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      currency: "m@example.com",
      category: "arts",
      description: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createJewerlyAsset,
    onSuccess: (res) => {
      toast.success("Data saved successfully");
      navigate({
        to: "/~/artist/my-models",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateAsync({
        data: {
          name: values.name,
          description: values.description,
          price: values.price,
          imageUrl: imageUrl.asset_url,
          thumbnailUrl: imageUrl.thumbnail_url,
          categoryId: values.category,
          typeAsset: "image",
          tags: tagsValue.map((item) => item.value),
        },
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  console.log("tags value", tagsValue);

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
                        disabled={isPending || isUploadingImage}
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
                        disabled={isPending || isUploadingImage}
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
                      disabled={isPending || isUploadingImage}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select listed currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="idr">IDR</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
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
                    disabled={isPending || isUploadingImage}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Arts" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tagsAndCategories?.data.categories?.map((item) => (
                        <SelectItem key={item.id} id={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
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
                onChange={(e) => setTagsValue(e)}
                options={tagsAndCategories?.data?.tags?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                placeholder="Select tags you like..."
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
                      disabled={isPending || isUploadingImage}
                    />
                  </FormControl>
                  <FormDescription>Provide clear description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-center">
              <FileUploadDirect
                isUploadingImage={isUploadingImage}
                setIsUploadingImage={setIsUploadingImage}
                onSetImageUrl={setImageUrl}
              />
            </div>

            <div className="flex w-full items-center justify-end">
              <Button
                className="w-[100px] cursor-pointer"
                type="submit"
                disabled={
                  isPending ||
                  isUploadingImage ||
                  imageUrl.asset_url === "" ||
                  tagsValue.length === 0
                }
              >
                {isPending ? <LoaderIcon className="animate-spin" /> : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
