import { useImageKit } from "imagekit-react-hook";
import { LoaderIcon, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { Badge } from "~/components/ui/badge";
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

type FileUploadDirectProps = {
  isUploadingImage: boolean;
  setIsUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  onSetImageUrl: React.Dispatch<
    React.SetStateAction<{ asset_url: string; thumbnail_url: string }>
  >;
};

export function FileUploadDirect({
  isUploadingImage,
  onSetImageUrl,
  setIsUploadingImage,
}: FileUploadDirectProps) {
  const [imageKitImageList, setImageKitImageList] = useState<
    {
      url: string;
      fileType: string;
    }[]
  >([]);

  const [thumbNailId, setThumbnailId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { upload } = useImageKit();

  console.log("imageKitImageList", imageKitImageList);
  console.log("files", files);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      const uploadPromises = files.map(async (file) => {
        setIsUploadingImage(true);
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
          if (res.fileType === "image") {
            setThumbnailId(res.fileId);
            onSetImageUrl((prev) => ({ ...prev, thumbnail_url: res.url }));
          } else {
            onSetImageUrl((prev) => ({ ...prev, asset_url: res.url }));
          }
          setImageKitImageList((prev) => [...prev, res]);
        } catch (error) {
          onError(file, error instanceof Error ? error : new Error("Upload failed"));
        } finally {
          setIsUploadingImage(false);
          toast.success("Image uploaded successfully");
        }
      });

      await Promise.all(uploadPromises);
    },
    [upload],
  );

  const onFileReject = useCallback((file: File, message: string) => {
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
      <FileUploadDropzone
        className={cn("flex items-center justify-center", {
          hidden: files.length === 2,
        })}
      >
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
            className={cn("cursor-pointer flex-col", {})}
          >
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              {isUploadingImage && <LoaderIcon className="animate-spin" />}
              {file.type.includes("image") && <Badge>Thumbnail</Badge>}
              <FileUploadItemDelete asChild>
                <Button
                  onClick={() => files.splice(index, 1)}
                  variant="ghost"
                  size="icon"
                  className="size-7"
                >
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
      <div
        className={cn("h-[400px] w-full", {
          hidden:
            imageKitImageList.filter((item) => item.fileType !== "image").length === 0,
        })}
      >
        {imageKitImageList
          .filter((item) => item.fileType !== "image")
          .map((item) => (
            <ModelViewer key={item.url} src={item.url} />
          ))}
      </div>
    </FileUpload>
  );
}
