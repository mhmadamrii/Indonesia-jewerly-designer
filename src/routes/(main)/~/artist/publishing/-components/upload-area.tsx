import { Check, Upload, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn, formatFileSize, getFileIcon } from "~/lib/utils";
import { UploadedFile } from "./hooks/use-file-upload";

interface UploadAreaProps {
  category: keyof {
    thumbnail: UploadedFile[];
    preview: UploadedFile[];
    asset: UploadedFile[];
  };
  title: string;
  description: string;
  acceptedTypes: string;
  uploadedFiles: UploadedFile[];
  uploading: string | null;
  onFileUpload: (files: FileList, category: string) => void;
  onDeleteFile: (fileId: string, category: string) => void;
}

export function UploadArea({
  category,
  title,
  description,
  acceptedTypes,
  uploadedFiles,
  uploading,
  onFileUpload,
  onDeleteFile,
}: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files, category);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = acceptedTypes;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) onFileUpload(files, category);
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200",
          dragOver
            ? "border-primary bg-primary/5 scale-105"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          uploading === category && "pointer-events-none opacity-50",
          {
            hidden: uploadedFiles.length > 0,
          },
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-muted rounded-full p-4">
            <Upload className="text-muted-foreground h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              type="button"
              onClick={handleFileSelect}
              disabled={uploading === category}
              className="min-w-[120px] cursor-pointer"
            >
              {uploading === category ? "Uploading..." : "Choose Files"}
            </Button>
            <span className="text-muted-foreground text-xs">
              or drag and drop files here
            </span>
          </div>
          <p className="text-muted-foreground text-xs">
            Accepted: {acceptedTypes.split(",").join(", ")}
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && category === "thumbnail" && (
        <div className="h-[300px] w-full">
          <img
            src={uploadedFiles[0].url}
            alt="thumbnail"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      )}

      {uploadedFiles.length > 0 && category === "preview" && (
        <div className="h-[300px] w-full">
          <ModelViewer src={uploadedFiles[0].url} />
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-medium">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-muted/50 flex items-center justify-between rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Uploaded
                  </Badge>
                  {file.id.startsWith("initial-") ? null : (
                    <Button
                      className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 cursor-pointer p-0"
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteFile(file.id, category)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

