import { useEffect } from "react";

export function PaymentWrapper({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}
