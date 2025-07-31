import B2 from "backblaze-b2";
import z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";

export const b2GetInfo = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const b2 = new B2({
      applicationKeyId: process.env.B2_KEY_ID as string,
      applicationKey: process.env.B2_APPLICATION_KEY as string,
    });

    try {
      await b2.authorize();
      const response = await b2.getBucket({ bucketName: "ijd-designer" });

      const uploadUrlResponse = await b2.getUploadUrl({
        bucketId: "ab4d4b916ede5d0b918f0619",
      });

      console.dir(uploadUrlResponse, {
        depth: null,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.log("error s3", error);
    }
  });

export const b2UploadFile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      file: z.any(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { file: base64String } = data;
    const buffer = Buffer.from(base64String, "base64");
    console.log("buffer", buffer);
    const b2 = new B2({
      applicationKeyId: process.env.B2_KEY_ID as string,
      applicationKey: process.env.B2_APPLICATION_KEY as string,
    });

    try {
      await b2.authorize();
      const uploadUrlResponse = await b2.getUploadUrl({
        bucketId: "bb9deb91fe1e5dfb918f0619",
      });
      const { uploadUrl, authorizationToken } = uploadUrlResponse.data;
      console.log("uploadUrl", uploadUrl);
      console.log("authorizationToken", authorizationToken);

      const response = await b2.uploadFile({
        uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: "myfilename",
        data: buffer,
      });

      console.log("response", response.data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.log("error s3", error.message);
      console.dir(error.response, { depth: null });
      return {
        success: false,
        data: error,
      };
    }
  });
