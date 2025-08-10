import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { payWithMidtrans } from "~/actions/payment.action";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

export function PaymentButton({
  purchaseLabel,
  totalPrice,
  className = "",
  setIsOpenDrawer,
}: {
  purchaseLabel: string;
  totalPrice: number;
  className?: string;
  setIsOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate: checkout, isPending: isLoadingCheckout } = useMutation({
    mutationFn: payWithMidtrans,
    onSuccess: (res) => {
      if (setIsOpenDrawer) {
        setIsOpenDrawer(false);
      }

      window.snap.pay(res?.data.token, {
        onSuccess: () => {
          toast.success("Successfully", {
            description: "Payment successful",
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

  const usdToIdr = (usd: number): number => {
    if (usd === 0) {
      return 0;
    }
    return usd * 16000;
  };

  useEffect(() => {
    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");

    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", myMidtransClientKey!);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
