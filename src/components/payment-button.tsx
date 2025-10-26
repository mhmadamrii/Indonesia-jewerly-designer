import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { createPaymentTransaction, payWithMidtrans } from "~/actions/payment.action";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

export function PaymentButton({
  purchaseLabel,
  totalPrice,
  assetId,
  className = "",
  setIsOpenDrawer,
}: {
  purchaseLabel: string;
  totalPrice: number;
  assetId: string;
  className?: string;
  setIsOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const usdToIdr = (usd: number): number => {
    if (usd === 0) {
      return 0;
    }
    return usd * 16000;
  };

  const { mutate: createDbTransaction } = useMutation({
    mutationFn: createPaymentTransaction,
    onSuccess: (res) => {
      toast.success("Successfully", {
        description: "Payment successful",
      });
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Error", {
        description: "Payment error",
      });
    },
  });

  const { mutate: checkout, isPending: isLoadingCheckout } = useMutation({
    mutationFn: payWithMidtrans,
    onSuccess: (res) => {
      console.log("response", res);
      if (setIsOpenDrawer) {
        setIsOpenDrawer(false);
      }

      window.snap.pay(res?.data.token, {
        onSuccess: (r: any) => {
          createDbTransaction({
            data: {
              midtransResponse: JSON.stringify(r),
              assetId,
            },
          });
        },
        onPending: (result: any) => {
          toast.warning("Pending", {
            description: "Payment pending",
          });
        },
        onError: (result: any) => {
          toast.error("Error", {
            description: "Payment error",
          });
        },
        onClose: () => {
          toast.error("Pembayaran Dibatalkan!", {
            description: "Anda akan dikenai denda sebesar: Rp. 1.000.000",
          });
        },
      });
    },
  });

  return (
    <Button
      onClick={() =>
        checkout({
          data: {
            amount: usdToIdr(totalPrice),
          },
        })
      }
      className={cn("w-full cursor-pointer", className)}
    >
      {isLoadingCheckout ? <LoaderIcon className="animate-spin" /> : purchaseLabel}
    </Button>
  );
}
