// routes/hello.ts
import ImageKit from "imagekit";

import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/imagekit/upload").methods({
  GET: async ({ request }) => {
    try {
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
        urlEndpoint: "https://ik.imagekit.io/mhmadamrii",
      });

      const res = imagekit.getAuthenticationParameters();

      return Response.json(res);
    } catch (error) {
      console.log("error", error);
    }
  },
});
