import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";
import { db } from "~/lib/db";
import { category, jewelryAssets, payments, user } from "~/lib/db/schema";

export type MyPaymentTransactionsType = Awaited<ReturnType<typeof getMyPaymentTransactions>>["data"]; // prettier-ignore

// 4411 1111 1111 1118
export const payWithMidtrans = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ amount: z.number().min(1) }))
  .handler(async ({ context, data }) => {
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
              name: "Order",
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
            callbacks: {
              finish: "#",
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
            redirect_url: "",
          },
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  });

export const createPaymentTransaction = createServerFn({ method: "POST" })
  .validator(
    z.object({
      midtransResponse: z.string(),
      assetId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const midtransResponse = JSON.parse(data.midtransResponse);
    console.log("midtransResponse", midtransResponse);
    console.log("JSON.parse(data.res)", JSON.parse(data.midtransResponse));
    const res = await db
      .insert(payments)
      .values({
        userId: context.user.id,
        jewelryAssetId: data.assetId,
        amount: midtransResponse.gross_amount,
        status: midtransResponse.transaction_status,
        currency: "IDR or USD",
        provider: `${midtransResponse.card_type} - ${midtransResponse.bank}`,
        providerId: `order-${midtransResponse.order_id}`,
        description:
          midtransResponse.transaction_status === "capture"
            ? "Payment Successful"
            : "Payment Failed",
      })
      .returning({ id: payments.id });

    return {
      success: true,
      data: res[0],
    };
  });

export const getMyPaymentTransactions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await db
      .select({
        jewelry: {
          id: jewelryAssets.id,
          name: jewelryAssets.name,
          description: jewelryAssets.description,
          downloadUrl: jewelryAssets.assetUrl,
        },
        payment: {
          id: payments.id,
          amount: payments.amount,
          status: payments.status,
          isPaidToUser: payments.isPaidToUser,
          purchasedAt: payments.createdAt,
        },
        category: category.name,
        artist: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      .from(payments)
      .innerJoin(jewelryAssets, eq(jewelryAssets.id, payments.jewelryAssetId))
      .innerJoin(category, eq(category.id, jewelryAssets.categoryId))
      .innerJoin(user, eq(user.id, jewelryAssets.userId))
      .where(eq(payments.userId, context.user.id));

    return {
      success: true,
      data: res,
    };
  });
