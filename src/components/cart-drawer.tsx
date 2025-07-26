import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LoaderIcon, ShoppingCart, Trash2, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { deleteCartItem, getCartItems } from "~/actions/cart.action";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { PaymentButton } from "./payment-button";

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

declare global {
  interface Window {
    snap: any;
  }
}

export function CartDrawer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentId, setCurrentId] = React.useState<string | null>(null);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const {
    data: cartItemsData,
    isLoading: isLoadingCart,
    refetch,
  } = useQuery({
    queryKey: ["cart_items"],
    queryFn: () => getCartItems(),
    enabled: !isOpenDrawer,
  });

  const { mutate: deleteItem, isPending: isDeletingItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (res) => {
      toast.success("Successfully", {
        description: "Item removed from cart successfully",
      });
      refetch();
    },
  });

  const handleRemoveItem = (id: string) => {
    setCurrentId(id);
    deleteItem({
      data: {
        id,
      },
    });
  };

  const totalPrice = cartItemsData?.data?.reduce(
    (sum, item) => sum + item.jewerly_assets?.price!,
    0,
  );

  if (location.pathname.includes("artist")) {
    return;
  }

  return (
    <Drawer onOpenChange={setIsOpenDrawer} open={isOpenDrawer} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="relative cursor-pointer bg-transparent"
          onClick={() => {
            setIsOpenDrawer(!isOpenDrawer);
            if (!isOpenDrawer) {
              refetch();
            }
          }}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsData?.data?.length! > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs"
            >
              {cartItemsData?.data?.length}
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
                  {cartItemsData?.data?.length}{" "}
                  {cartItemsData?.data?.length === 1 ? "item" : "items"} in your cart
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button
                  onClick={() => setIsOpenDrawer(false)}
                  variant="ghost"
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-auto p-4">
            {isLoadingCart && (
              <LoaderIcon className="text-muted-foreground mb-4 h-12 w-12 animate-spin" />
            )}
            {cartItemsData?.data?.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingCart className="text-muted-foreground mb-4 h-12 w-12" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-auto">
                {cartItemsData?.data?.map((item) => (
                  <div
                    key={item.cart_item.id}
                    className={cn("flex items-center space-x-3", {
                      "bg-accent opacity-20":
                        isDeletingItem && currentId === item.cart_item.id,
                    })}
                  >
                    <img
                      src={item.jewerly_assets?.thumbnailUrl || "/placeholder-img.jpg"}
                      alt="Asset Image"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium">
                        {item.jewerly_assets?.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        ${item.jewerly_assets?.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-sm font-medium">
                        ${(item.jewerly_assets?.price ?? 0 * 1).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive h-8 w-8 cursor-pointer"
                        onClick={() => handleRemoveItem(item.cart_item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItemsData?.data!?.length > 0 && (
            <div className="space-y-4 border-t p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${totalPrice!.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice!.toFixed(2)}</span>
                </div>
              </div>
              <DrawerFooter className="px-0 pb-0">
                <PaymentButton setIsOpenDrawer={setIsOpenDrawer} />
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer bg-transparent"
                    onClick={() =>
                      navigate({
                        to: "/~/general/explore",
                      })
                    }
                  >
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
