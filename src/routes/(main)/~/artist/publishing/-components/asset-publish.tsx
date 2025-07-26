import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { MultipleSelector } from "~/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { FileUploadDirect } from "./file-upload-direct";

import {
  ChevronDown,
  Coins,
  DollarSign,
  LoaderIcon,
  Package,
  Tag,
  Zap,
} from "lucide-react";

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/animate-ui/radix/collapsible";

import { getUserBoostCredits } from "~/actions/user.action";
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
  boost: z.enum(["10", "50", "100"], {
    required_error: "Please select a boost percentage.",
  }),
});

const currencies = [
  {
    value: "USD",
    label: "USD ($)",
  },
  {
    value: "EUR",
    label: "EUR (€)",
  },
  {
    value: "GBP",
    label: "GBP (£)",
  },
  {
    value: "JPY",
    label: "JPY (¥)",
  },
  {
    value: "CAD",
    label: "CAD (C$)",
  },
  {
    value: "AUD",
    label: "AUD (A$)",
  },
];

export function AssetPublish() {
  const navigate = useNavigate();
  const [isUsingBoost, setIsUsingBoost] = useState(false);
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

  const { data: currentCredit } = useQuery({
    queryKey: ["current_credit"],
    queryFn: () => getUserBoostCredits(),
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

  const getTotalBoostToUpdate = (val: number): number => {
    if (!isUsingBoost) return 0;
    return currentCredit?.data?.boostCredit! - val;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      currency: "m@example.com",
      category: "arts",
      description: "",
      boost: "10",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (currentCredit?.data?.boostCredit! < parseInt(values.boost) && isUsingBoost) {
      return toast.error("You don't have enough credits to boost this product.");
    }
    console.log("values", values);

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
          totalBoostToUpdate: getTotalBoostToUpdate(parseInt(values.boost)),
          boost: isUsingBoost ? Number.parseFloat(values.boost) : 0,
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
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <Package className="h-4 w-4" />
                      Product Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a clear, descriptive name for your product.
                    </FormDescription>
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
                    <FormLabel className="flex items-center gap-2 text-base font-semibold">
                      <DollarSign className="h-4 w-4" />
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        className="h-12 text-base"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-base font-semibold">Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="min-h-12 w-full text-base">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <SelectTrigger className="min-h-12 w-full">
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

            <div className="flex flex-col gap-2">
              <FormLabel className="flex items-center gap-2 text-base font-semibold">
                <Tag className="h-4 w-4" />
                Tags
              </FormLabel>
              <MultipleSelector
                className="bg-accent flex h-12 items-center"
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

            <Collapsible className="w-full">
              <div className="mb-2 space-y-2">
                <div className="flex items-center justify-between space-x-4">
                  <FormLabel className="flex items-center gap-2 text-base font-semibold">
                    <Zap className="h-4 w-4" />
                    Boost Product
                  </FormLabel>
                  <CollapsibleTrigger asChild>
                    <Button className="cursor-pointer" variant="ghost" size="icon">
                      <ChevronDown />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <div className="flex items-center gap-2 rounded-md px-4 py-3 text-sm">
                  <Checkbox
                    id="isUsingBoost"
                    onCheckedChange={(e: boolean) => setIsUsingBoost(e)}
                    checked={isUsingBoost}
                  />
                  <Label
                    htmlFor="isUsingBoost"
                    className={cn("", {
                      "text-muted-foreground cursor-pointer": !isUsingBoost,
                    })}
                  >
                    Increase your visibility by 10% for 10 credits
                  </Label>
                </div>
              </div>
              <CollapsibleContent className="flex flex-col justify-between gap-3 rounded-lg">
                <div>
                  <div className="bg-accent rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5" />
                        <span className="font-semibold">Current Boost Credits</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {currentCredit?.data?.boostCredit ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-0 h-[130px] w-full">
                  <FormField
                    control={form.control}
                    name="boost"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-4 md:grid-cols-3"
                          >
                            {[
                              {
                                value: "10",
                                label: "10 Boost",
                                description: "Basic",
                              },
                              {
                                value: "50",
                                label: "50 Boost",
                                description: "Enhanced",
                              },
                              {
                                value: "100",
                                label: "100 Boost",
                                description: "Featured",
                              },
                            ].map((option) => {
                              return (
                                <div
                                  key={option.value}
                                  className={cn("flex items-center space-x-2", {
                                    "opacity-20": !isUsingBoost,
                                  })}
                                >
                                  <RadioGroupItem
                                    disabled={!isUsingBoost}
                                    value={option.value}
                                    id={option.value}
                                  />
                                  <Label
                                    htmlFor={option.value}
                                    className="hover:bg-muted/50 flex-1 cursor-pointer rounded-lg border p-3 transition-colors"
                                  >
                                    <div className="flex items-center justify-between font-medium">
                                      {option.label}
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                      {option.description}
                                    </div>
                                  </Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Choose how much of your credits to use for boosting this
                          product's visibility.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your future asset investment"
                      className="min-h-[80px] resize-none"
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
