import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";

export const payWithMidtrans = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ amount: z.number().min(1) }))
  .handler(async ({ context, data }) => {
    // 4411 1111 1111 1118
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
              gross_amount: data.amount,
            },
            credit_card: {
              secure: true,
            },
            customer_details: {
              first_name: context.user.name,
              last_name: "",
              email: context.user.email,
              phone: "",
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
