import { useImageKit } from "imagekit-react-hook";
import { IKContext } from "imagekitio-react";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { imageKitAuthenticator } from "~/actions/imagekit.action";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
  type FileUploadProps,
} from "~/components/ui/file-upload";

function FileUploadComponent() {
  const [thumbnailIdx, setThumbnailIdx] = React.useState(0);
  const [files, setFiles] = React.useState<File[]>([]);
  const { upload } = useImageKit();

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      const uploadPromises = files.map(async (file) => {
        const totalChunks = 10;
        let uploadedChunks = 0;

        for (let i = 0; i < totalChunks; i++) {
          await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));
          uploadedChunks++;
          const progress = (uploadedChunks / totalChunks) * 100;
          onProgress(file, progress);
        }

        try {
          const res = await upload({
            file,
            fileName: file.name,
          });
          console.log("res", res);
        } catch (error) {
          onError(file, error instanceof Error ? error : new Error("Upload failed"));
        }
      });

      await Promise.all(uploadPromises);
    },
    [upload],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onUpload={onUpload}
      onFileReject={onFileReject}
      maxFiles={2}
      className="w-full"
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="text-muted-foreground size-6" />
          </div>
          <p className="text-sm font-medium">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 2 files)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem
            key={index}
            value={file}
            onClick={() => setThumbnailIdx(index)}
            className={cn("cursor-pointer flex-col", {
              "border border-blue-500": index === thumbnailIdx,
            })}
          >
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              {thumbnailIdx === index && <span>Set as thumbnail</span>}
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}

export function FileUploadDirect() {
  return (
    <IKContext
      urlEndpoint="https://ik.imagekit.io/mhmadamrii"
      authenticator={imageKitAuthenticator}
    >
      <FileUploadComponent />
    </IKContext>
  );
}
