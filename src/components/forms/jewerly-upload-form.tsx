import * as React from "react";

import { IKImage, IKUpload } from "imagekitio-react";
import { LoaderIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth/auth-client";
import { useFormStorage } from "~/lib/store";
import { ModelViewer } from "../3D/model-viewer";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "~/components/ui/file-upload";

interface IProps {
  onStepClick: (stepNumber: number) => void;
}

export function JewerlyUploadForm({ onStepClick }: IProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const { data: session } = authClient.useSession();
  const { addJewerlyForm, jewerlyForm } = useFormStorage();
  console.log("jfkld;sa", jewerlyForm);

  const handleStartUpload = () => {
    setIsUploading(true);
  };

  const handleSuccessUpload = (res: any) => {
    if (res.url) {
      toast.success("Image uploaded successfully");
      setIsUploading(false);
      addJewerlyForm({
        ...jewerlyForm,
        image_url: res.url,
        type_asset: res.fileType,
      });
    }
  };

  const handleErrorUpload = (err: any) => {
    console.log("err", err);
  };

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (files.length >= 2) {
        return "You can only upload up to 2 files";
      }

      if (!file.type.startsWith("image/")) {
        return "Only image files are allowed";
      }

      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [files],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <section className="mx-10 flex flex-col items-center gap-4">
      <FileUpload
        value={files}
        onValueChange={setFiles}
        onFileValidate={onFileValidate}
        onFileReject={onFileReject}
        accept="image/*"
        maxFiles={2}
        className="w-full px-10"
        disabled={jewerlyForm.image_url !== ""}
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="text-muted-foreground size-6" />
            </div>
            <p className="text-sm font-medium">Drag & drop files here</p>
            <p className="text-muted-foreground text-xs">
              Or click to browse (max 2 files)
            </p>
            <IKUpload
              fileName={`${session?.user.name}-${new Date().getTime()}.png`}
              onError={handleErrorUpload}
              onSuccess={handleSuccessUpload}
              onUploadStart={handleStartUpload}
              onUploadProgress={(progress: any) => console.log("progress", progress)}
              className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center text-transparent"
            />
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {files.map((file) => (
            <FileUploadItem key={file.name} value={file}>
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
      <div className="min-h-[200px] w-full">
        {jewerlyForm.image_url && jewerlyForm.type_asset == "image" && (
          <IKImage
            src={jewerlyForm.image_url ?? ""}
            className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
            alt="Asset Image"
          />
        )}
        {jewerlyForm.image_url && jewerlyForm.type_asset !== "image" && (
          <ModelViewer src={jewerlyForm.image_url ?? ""} />
        )}
      </div>
      <div className="flex w-full items-center justify-end">
        <Button
          disabled={jewerlyForm.image_url == "" || isUploading}
          onClick={() => {
            if (jewerlyForm.image_url) {
              onStepClick(3);
            }
          }}
          className="w-full cursor-pointer bg-[#FF3B30] hover:bg-[#FF3B30]/80 sm:w-1/4"
          type="submit"
        >
          {isUploading ? <LoaderIcon className="animate-spin" /> : "Next Step"}
        </Button>
      </div>
    </section>
  );
}
