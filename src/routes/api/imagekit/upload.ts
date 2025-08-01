// routes/hello.ts
import ImageKit from "imagekit";

import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/imagekit/upload").methods({
  GET: async ({ request }) => {
    try {
      const imagekit = new ImageKit({
        publicKey: process.env.VITE_IMAGE_KIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
        urlEndpoint: "https://ik.imagekit.io/idnijd",
      });

      const res = imagekit.getAuthenticationParameters();
      console.log("response", res);

      return Response.json(res);
    } catch (error) {
      console.log("error", error);
    }
  },
});
