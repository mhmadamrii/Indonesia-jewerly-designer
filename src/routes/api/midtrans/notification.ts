import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/midtrans/notification").methods({
  GET: ({ request }) => {
    console.log("request", request);
    return Response.json({
      message: "Notification received successfully",
    });
  },
});
