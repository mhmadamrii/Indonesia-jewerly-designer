import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, Coins, DollarSign, Package, Plus, Tag, X, Zap } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
  { value: "CAD", label: "CAD (C$)" },
  { value: "AUD", label: "AUD (A$)" },
];

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing & Fashion" },
  { value: "home", label: "Home & Garden" },
  { value: "books", label: "Books & Media" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
  { value: "automotive", label: "Automotive" },
  { value: "health", label: "Health & Beauty" },
  { value: "food", label: "Food & Beverages" },
  { value: "other", label: "Other" },
];

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(100, {
      message: "Product name must not exceed 100 characters.",
    }),
  price: z
    .number()
    .min(0.01, {
      message: "Price must be greater than 0.",
    })
    .max(999999.99, {
      message: "Price must not exceed 999,999.99.",
    }),
  currency: z.string().min(1, {
    message: "Please select a currency.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  tags: z
    .array(z.string())
    .min(1, {
      message: "Please add at least one tag.",
    })
    .max(10, {
      message: "Maximum 10 tags allowed.",
    }),
  boost: z.enum(["10", "50", "100"], {
    required_error: "Please select a boost percentage.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
});

export default function ProductForm() {
  const [tagInput, setTagInput] = useState("");
  const [userCredits, setUserCredits] = useState(20);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
      currency: "",
      category: "",
      tags: [],
      boost: "10",
      description: "",
    },
  });

  const watchedTags = form.watch("tags");

  const calculateCreditCost = (boostPercentage: string, basePrice: number) => {
    const percentage = Number.parseInt(boostPercentage);
    return Math.ceil((basePrice * percentage) / 100);
  };

  const watchedBoost = form.watch("boost");
  const watchedPrice = form.watch("price");
  const creditCost = calculateCreditCost(watchedBoost, watchedPrice || 0);
  const remainingCredits = userCredits - creditCost;
  const hasInsufficientCredits = remainingCredits < 0;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (hasInsufficientCredits) {
      toast.error("Insufficient credits!", {
        description: "You don't have enough credits to boost this product.",
      });
      return;
    }

    // Deduct credits
    setUserCredits((prev) => prev - creditCost);

    toast.success("Product submitted successfully!", {
      description: (
        <div className="space-y-2">
          <p>Product listed with {data.boost}% boost</p>
          <p>Credits used: {creditCost}</p>
          <p>Remaining credits: {remainingCredits}</p>
        </div>
      ),
    });
  }

  const addTag = () => {
    if (
      tagInput.trim() &&
      !watchedTags.includes(tagInput.trim()) &&
      watchedTags.length < 10
    ) {
      form.setValue("tags", [...watchedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto max-w-2xl"
      >
        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-8 text-center">
            <motion.div variants={itemVariants}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Package className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                Add New Product
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2 text-lg">
                Fill in the details to list your product
              </CardDescription>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-4">
              <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Current Credits</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{userCredits}</span>
                </div>
              </div>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <motion.div variants={itemVariants} className="grid gap-6">
                  {/* Product Name */}
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

                  {/* Price and Currency */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-base font-semibold">
                            <DollarSign className="h-4 w-4" />
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
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
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Currency
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 text-base">
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

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Category
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the most relevant category for your product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tags */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-base font-semibold">
                          <Tag className="h-4 w-4" />
                          Tags
                        </FormLabel>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a tag"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyPress={handleTagKeyPress}
                              className="h-12 flex-1 text-base"
                            />
                            <Button
                              type="button"
                              onClick={addTag}
                              disabled={
                                !tagInput.trim() ||
                                watchedTags.includes(tagInput.trim()) ||
                                watchedTags.length >= 10
                              }
                              className="h-12 px-4"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {watchedTags.length > 0 && (
                            <motion.div
                              className="flex flex-wrap gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {watchedTags.map((tag, index) => (
                                <motion.div
                                  key={tag}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                  className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="rounded-full p-0.5 transition-colors hover:bg-blue-200"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                        <FormDescription>
                          Add relevant tags to help customers find your product. (
                          {watchedTags.length}/10)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Boost Product */}
                  <FormField
                    control={form.control}
                    name="boost"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2 text-base font-semibold">
                          <Zap className="h-4 w-4" />
                          Boost Product
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-4 md:grid-cols-3"
                          >
                            {[
                              {
                                value: "10",
                                label: "10% Boost",
                                description: "Basic visibility",
                              },
                              {
                                value: "50",
                                label: "50% Boost",
                                description: "Enhanced visibility",
                              },
                              {
                                value: "100",
                                label: "100% Boost",
                                description: "Maximum visibility",
                              },
                            ].map((option) => {
                              const optionCreditCost = calculateCreditCost(
                                option.value,
                                watchedPrice || 0,
                              );
                              return (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                  />
                                  <Label
                                    htmlFor={option.value}
                                    className="hover:bg-muted/50 flex-1 cursor-pointer rounded-lg border p-3 transition-colors"
                                  >
                                    <div className="flex items-center justify-between font-medium">
                                      {option.label}
                                      {watchedPrice > 0 && (
                                        <span className="text-muted-foreground text-sm">
                                          {optionCreditCost} credits
                                        </span>
                                      )}
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
                  {watchedPrice > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert
                        className={`mt-4 ${hasInsufficientCredits ? "border-red-200 bg-red-50" : "border-blue-200 bg-blue-50"}`}
                      >
                        <AlertCircle
                          className={`h-4 w-4 ${hasInsufficientCredits ? "text-red-600" : "text-blue-600"}`}
                        />
                        <AlertDescription
                          className={
                            hasInsufficientCredits ? "text-red-800" : "text-blue-800"
                          }
                        >
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Credits needed for {watchedBoost}% boost:</span>
                              <span className="font-semibold">{creditCost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Remaining credits after boost:</span>
                              <span
                                className={`font-semibold ${hasInsufficientCredits ? "text-red-600" : "text-green-600"}`}
                              >
                                {remainingCredits}
                              </span>
                            </div>
                            {hasInsufficientCredits && (
                              <div className="mt-2 text-sm text-red-600">
                                ⚠️ Insufficient credits! You need{" "}
                                {Math.abs(remainingCredits)} more credits.
                              </div>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product in detail..."
                            className="min-h-[120px] resize-none text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your product. (
                          {field.value?.length || 0}/1000)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 flex-1 bg-transparent text-base"
                    onClick={() => form.reset()}
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={hasInsufficientCredits}
                    className="h-12 flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-base hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {hasInsufficientCredits ? "Insufficient Credits" : "Submit Product"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
