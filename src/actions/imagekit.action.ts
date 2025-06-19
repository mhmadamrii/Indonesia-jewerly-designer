import ImageKit from "imagekit";

import { createServerFn } from "@tanstack/react-start";

export const imageKitAuthenticator = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
        urlEndpoint: "https://ik.imagekit.io/mhmadamrii",
      });
      const res = imagekit.getAuthenticationParameters();
      console.log("res", res);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },
);
