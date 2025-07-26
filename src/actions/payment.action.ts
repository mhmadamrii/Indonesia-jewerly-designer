import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";

export const payWithMidtrans = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    console.log("MIDTRANS_SERVER_KEY", process.env.MIDTRANS_SERVER_KEY);
    try {
      const response = await fetch(
        "https://app.sandbox.midtrans.com/snap/v1/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Basic " +
              Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}`).toString("base64"),
          },
          body: JSON.stringify({
            transaction_details: {
              order_id: "order-csb-" + Math.random().toString(36).substr(2, 9),
              gross_amount: 100000,
            },
            credit_card: {
              secure: true,
            },
            customer_details: {
              first_name: "John",
              last_name: "Doe",
              email: "john@doe.com",
              phone: "08111222333",
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const requestPaymentToken = await response.json();
      console.log(requestPaymentToken);

      if (requestPaymentToken?.token) {
        return {
          success: true,
          data: {
            token: requestPaymentToken.token,
          },
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  });
