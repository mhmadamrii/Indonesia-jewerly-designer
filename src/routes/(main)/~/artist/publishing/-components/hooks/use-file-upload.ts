import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { upload } from "@imagekit/react";
import { deleteImageServer, imageKitAuthenticator } from "~/actions/imagekit.action";
import { authClient } from "~/lib/auth/auth-client";
import { formatFileSize, getCategoryFolder } from "~/lib/utils";
import { CheckCircle } from "lucide-react";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface FileUploadState {
  thumbnail: UploadedFile[];
  preview: UploadedFile[];
  asset: UploadedFile[];
}

export function useFileUpload(
  totalStorage: number,
  usedStorage: number,
  onSetAssetStorageUrl: React.Dispatch<
    React.SetStateAction<{
      thumbnail_url: string;
      preview_url: string;
      asset_url: string;
    }>
  >,
) {
  const { data: session } = authClient.useSession();
  const [uploading, setUploading] = useState<string | null>(null);

  const { mutate: deleteImage } = useMutation({
    mutationFn: async (data: {
      fileId: string;
      category: keyof FileUploadState;
    }) => {
      const { fileId, category } = data;
      try {
        const res = await deleteImageServer({ data: { fileId } });

        if (res.data === 204) {
          toast.success("File deleted successfully");
          return { fileId, category };
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  const handleFileUpload = async (
    files: FileList,
    category: keyof FileUploadState,
  ) => {
    const file = files[0];
    if (!file) return;

    const remainingStorage = totalStorage - usedStorage;
    if (file.size > remainingStorage) {
      toast.error(
        `File size (${formatFileSize(
          file.size,
        )}) exceeds remaining storage (${formatFileSize(remainingStorage)}).`,
      );
      return;
    }

    setUploading(category);

    try {
      const { expire, token, signature } = (await imageKitAuthenticator()) as {
        expire: number;
        token: string;
        signature: string;
      };

      let currentProgress = 0;

      const toastId = toast(`Uploading file...`, {
        description: `${currentProgress}%`,
        duration: Infinity,
      });

      const res = (await upload({
        expire,
        token,
        signature,
        publicKey: import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY,
        file,
        fileName: `${session?.user?.email.split("@")[0]}_c=${category}_f=${files[0].name}_size=${files[0].size}`,
        folder: getCategoryFolder(category),
        onProgress: (event) => {
          currentProgress = Math.round((event.loaded / event.total) * 100);
          toast(`Uploading file...`, {
            id: toastId,
            description: `${currentProgress}%`,
          });
        },
      })) as { url: string; fileId: string };

      toast.success("Upload complete!", {
        id: toastId,
        description: "Your file uploaded successfully.",
        action: {
          label: "Close",
          onClick: () => {
            console.log("Closed toast");
          },
        },
      });

      if (res.url) {
        switch (category) {
          case "thumbnail":
            onSetAssetStorageUrl((prev) => ({
              ...prev,
              thumbnail_url: res.url,
            }));
            break;

          case "preview":
            onSetAssetStorageUrl((prev) => ({
              ...prev,
              preview_url: res.url,
            }));
            break;

          case "asset":
            onSetAssetStorageUrl((prev) => ({
              ...prev,
              asset_url: res.url,
            }));
            break;

          default:
            break;
        }
      }

      const newFiles: UploadedFile[] = Array.from(files).map((file) => {
        return {
          id: res.fileId,
          name: `${file.name}-${session?.user?.email.split("@")[0]}`,
          size: file.size,
          type: file.type,
          url: res.url ?? "",
          uploadedAt: new Date(),
        };
      });

      return { category, newFiles };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setUploading(null);
    }
  };

  return {
    uploading,
    handleFileUpload,
    deleteImage,
  };
}
