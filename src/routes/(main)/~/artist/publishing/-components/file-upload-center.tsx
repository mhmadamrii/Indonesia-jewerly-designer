import type React from "react";

import { upload } from "@imagekit/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteImageServer, imageKitAuthenticator } from "~/actions/imagekit.action";
import { ModelViewer } from "~/components/3D/model-viewer";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { authClient } from "~/lib/auth/auth-client";
import { cn, formatFileSize, getCategoryFolder, getFileIcon } from "~/lib/utils";

import {
  Check,
  CheckCircle,
  FileText,
  HardDrive,
  ImageIcon,
  Play,
  Upload,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "~/components/animate-ui/base/progress";

interface IProps {
  userStorageUsage: number;
  userStorageLimit: number;
  initialImageUrl?: {
    thumbnail_url: string;
    preview_url: string;
    asset_url: string;
  };
  onSetAssetStorageUrl: React.Dispatch<
    React.SetStateAction<{
      thumbnail_url: string;
      preview_url: string;
      asset_url: string;
    }>
  >;
  onSetUsedStorage: (size: number) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

export function FileUploadCenter({
  userStorageUsage,
  userStorageLimit,
  initialImageUrl,
  onSetAssetStorageUrl,
  onSetUsedStorage,
}: IProps) {
  const { data: session } = authClient.useSession();

  const [uploadedFiles, setUploadedFiles] = useState<{
    thumbnail: UploadedFile[];
    preview: UploadedFile[];
    asset: UploadedFile[];
  }>({
    thumbnail: [],
    preview: [],
    asset: [],
  });

  const [dragOver, setDragOver] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  // const totalStorage = 1073741824; // 1GB in bytes
  const totalStorage = userStorageLimit;
  const usedStorage = Object.values(uploadedFiles).flat().reduce((total, file) => total + file.size, 0) + userStorageUsage; // prettier-ignore

  const storagePercentage = (usedStorage / totalStorage) * 100;

  const { mutate: deleteImage } = useMutation({
    mutationFn: async (data: {
      fileId: string;
      category: keyof typeof uploadedFiles;
    }) => {
      const { fileId, category } = data;
      try {
        const res = await deleteImageServer({ data: { fileId } });

        if (res.data === 204) {
          toast.success("File deleted successfully");
          removeFile(category, fileId);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFileUpload = async (
    files: FileList,
    category: keyof typeof uploadedFiles,
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
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
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

      setUploadedFiles((prev) => ({
        ...prev,
        [category]: [...prev[category], ...newFiles],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(null);
    }
  };

  const handleDrop = (e: React.DragEvent, category: keyof typeof uploadedFiles) => {
    e.preventDefault();
    setDragOver(null);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files, category);
    }
  };

  const handleDragOver = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    setDragOver(category);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const removeFile = (category: keyof typeof uploadedFiles, fileId: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [category]: prev[category].filter((file) => file.id !== fileId),
    }));
  };

  const UploadArea = ({
    category,
    title,
    description,
    acceptedTypes,
  }: {
    category: keyof typeof uploadedFiles;
    title: string;
    description: string;
    acceptedTypes: string;
  }) => (
    <div className="space-y-6">
      <div
        onDrop={(e) => handleDrop(e, category)}
        onDragOver={(e) => handleDragOver(e, category)}
        onDragLeave={handleDragLeave}
        className={cn(
          "rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200",
          dragOver === category
            ? "border-primary bg-primary/5 scale-105"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          uploading === category && "pointer-events-none opacity-50",
          {
            hidden: uploadedFiles[category].length > 0,
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
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.multiple = true;
                input.accept = acceptedTypes;
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) handleFileUpload(files, category);
                };
                input.click();
              }}
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

      {uploadedFiles[category].length > 0 && category == "thumbnail" && (
        <div className="h-[300px] w-full">
          <img
            src={uploadedFiles[category][0].url}
            alt="thumbnail"
            className="h-full w-full rounded-md"
          />
        </div>
      )}
      {uploadedFiles[category].length > 0 && category == "preview" && (
        <div className="h-[300px] w-full">
          <ModelViewer src={uploadedFiles[category][0].url} />
        </div>
      )}
      {uploadedFiles[category].length > 0 && (
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-medium">
            Uploaded Files ({uploadedFiles[category].length})
          </h4>
          <div className="space-y-2">
            {uploadedFiles[category].map((file) => (
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
                  <Button
                    className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 cursor-pointer p-0"
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      deleteImage({ fileId: file.id, category });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    onSetUsedStorage(usedStorage);
  }, [usedStorage, onSetUsedStorage]);

  return (
    <div className="min-h-[800px] bg-gradient-to-br p-4">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">File Upload Center</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Upload and manage your files across different categories. Organize thumbnails,
            previews, and assets with ease.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5" />
                <CardTitle className="text-lg">Storage Usage</CardTitle>
              </div>
              <Badge variant={storagePercentage > 80 ? "destructive" : "secondary"}>
                {formatFileSize(usedStorage)} / {formatFileSize(totalStorage)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={parseInt(storagePercentage.toFixed())}>
                <ProgressLabel />
                <ProgressValue />
                <ProgressTrack />
              </Progress>
              <div className="text-muted-foreground flex justify-between text-sm">
                <span>{storagePercentage.toFixed(1)}% used</span>
                <span>{formatFileSize(totalStorage - usedStorage)} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Choose the appropriate category for your files and upload them using the
              tabs below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="thumbnail" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="thumbnail" className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Thumbnails</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Previews</span>
                </TabsTrigger>
                <TabsTrigger value="asset" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Assets</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="thumbnail" className="mt-6">
                <UploadArea
                  category="thumbnail"
                  title="Upload Thumbnails"
                  description="Small preview images for your content"
                  acceptedTypes="image/*"
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <UploadArea
                  category="preview"
                  title="Upload Previews"
                  description="High-quality preview media files"
                  acceptedTypes=".glb"
                />
              </TabsContent>

              <TabsContent value="asset" className="mt-6">
                <UploadArea
                  category="asset"
                  title="Upload Assets"
                  description="Documents, files, and other digital assets"
                  acceptedTypes=".zip"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div
          className={cn("grid grid-cols-1 gap-4 md:grid-cols-3", {
            hidden: initialImageUrl?.thumbnail_url,
          })}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Thumbnails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn("text-2xl font-bold text-green-500", {
                  "text-red-500": uploadedFiles.thumbnail.length === 0,
                })}
              >
                {uploadedFiles.thumbnail.length}
              </div>
              <p className="text-muted-foreground text-xs">
                {formatFileSize(
                  uploadedFiles.thumbnail.reduce((sum, file) => sum + file.size, 0),
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Previews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn("text-2xl font-bold text-red-500", {
                  "text-green-500": uploadedFiles.preview.length > 0,
                })}
              >
                {uploadedFiles.preview.length}
              </div>
              <p className={cn("text-muted-foreground text-xs", {})}>
                {formatFileSize(
                  uploadedFiles.preview.reduce((sum, file) => sum + file.size, 0),
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={cn("text-2xl font-bold text-green-500", {
                  "text-red-500": uploadedFiles.asset.length === 0,
                })}
              >
                {uploadedFiles.asset.length}
              </div>
              <p className="text-muted-foreground text-xs">
                {formatFileSize(
                  uploadedFiles.asset.reduce((sum, file) => sum + file.size, 0),
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
