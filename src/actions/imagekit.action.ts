import ImageKit from "imagekit";

import * as z from "zod";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";

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

export const deleteImageServer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fileId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data }): Promise<{ success: boolean; data: number }> => {
    const res = await fetch(`https://api.imagekit.io/v1/files/${data.fileId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.VITE_BASIC_AUTH}`,
      },
    });

    return {
      success: true,
      data: res.status,
    };
  });

export const getDetailImageServer = createServerFn({ method: "GET" })
  .validator(
    z.object({
      fileId: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data }): Promise<{ success: boolean; data: string }> => {
    const res = await fetch(`https://api.imagekit.io/v1/files/${data.fileId}/details`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.VITE_BASIC_AUTH}`,
      },
    });
    console.log("res", res);

    return {
      success: true,
      data: "something",
    };
  });
