"use client";

import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import * as React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Separator } from "~/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 249.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 79.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
];

export function CartDrawer() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="relative bg-transparent">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
          <span className="ml-2">Cart</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="ml-auto h-full w-full max-w-sm">
        <div className="flex h-full flex-col">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>3D Asset Cart</DrawerTitle>
                <DrawerDescription>
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingCart className="text-muted-foreground mb-4 h-12 w-12" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive h-8 w-8"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="space-y-4 border-t p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <DrawerFooter className="px-0 pb-0">
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
