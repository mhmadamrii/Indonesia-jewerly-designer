import ImageKit from "imagekit";

import { createServerFn } from "@tanstack/react-start";

export const imageKitAuthenticator = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ expire: number; token: string; signature: string } | undefined> => {
    try {
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
        urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT as string,
      });

      const res = imagekit.getAuthenticationParameters();
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },
);
