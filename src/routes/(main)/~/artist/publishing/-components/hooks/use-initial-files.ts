import { useEffect, useState } from "react";
import { UploadedFile } from "./use-file-upload";

interface InitialImageUrl {
  thumbnail_url: string;
  preview_url: string;
  asset_url: string;
}

export function useInitialFiles(initialImageUrl?: InitialImageUrl) {
  const [uploadedFiles, setUploadedFiles] = useState<{
    thumbnail: UploadedFile[];
    preview: UploadedFile[];
    asset: UploadedFile[];
  }>({
    thumbnail: [],
    preview: [],
    asset: [],
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize with existing images when editing
  useEffect(() => {
    if (!initialImageUrl || isInitialized) return;

    setUploadedFiles((prev) => {
      // Prevent duplicating if already initialized
      if (prev.thumbnail.length + prev.preview.length + prev.asset.length > 0) {
        return prev;
      }

      const next = { ...prev };
      if (initialImageUrl.thumbnail_url) {
        next.thumbnail = [
          {
            id: "initial-thumbnail",
            name: "existing-thumbnail",
            size: 0,
            type: "image/*",
            url: initialImageUrl.thumbnail_url,
            uploadedAt: new Date(),
          },
        ];
      }
      if (initialImageUrl.preview_url) {
        next.preview = [
          {
            id: "initial-preview",
            name: "existing-preview",
            size: 0,
            type: "model/gltf-binary",
            url: initialImageUrl.preview_url,
            uploadedAt: new Date(),
          },
        ];
      }
      if (initialImageUrl.asset_url) {
        next.asset = [
          {
            id: "initial-asset",
            name: "existing-asset",
            size: 0,
            type: "application/zip",
            url: initialImageUrl.asset_url,
            uploadedAt: new Date(),
          },
        ];
      }

      return next;
    });

    setIsInitialized(true);
  }, [
    initialImageUrl?.thumbnail_url,
    initialImageUrl?.preview_url,
    initialImageUrl?.asset_url,
    isInitialized,
  ]);

  const addFiles = (category: keyof typeof uploadedFiles, files: UploadedFile[]) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [category]: [...prev[category], ...files],
    }));
  };

  const removeFile = (category: keyof typeof uploadedFiles, fileId: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [category]: prev[category].filter((file) => file.id !== fileId),
    }));
  };

  return {
    uploadedFiles,
    addFiles,
    removeFile,
  };
}
