import { FileText, ImageIcon, Play } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FileStatsCards } from "./file-stats-cards";
import { useFileUpload } from "./hooks/use-file-upload";
import { useInitialFiles } from "./hooks/use-initial-files";
import { StorageUsageCard } from "./storage-usage-card";
import { UploadArea } from "./upload-area";

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

export function FileUploadCenter({
  userStorageUsage,
  userStorageLimit,
  initialImageUrl,
  onSetAssetStorageUrl,
  onSetUsedStorage,
}: IProps) {
  const { uploadedFiles, addFiles, removeFile } = useInitialFiles(initialImageUrl);
  const { uploading, handleFileUpload, deleteImage } = useFileUpload(
    userStorageLimit,
    userStorageUsage +
      Object.values(uploadedFiles)
        .flat()
        .reduce((total, file) => total + file.size, 0),
    onSetAssetStorageUrl,
  );

  const totalStorage = userStorageLimit;
  const usedStorage =
    Object.values(uploadedFiles)
      .flat()
      .reduce((total, file) => total + file.size, 0) + userStorageUsage;

  // Sync parent state with initial URLs
  useEffect(() => {
    if (!initialImageUrl) return;

    onSetAssetStorageUrl((prev) => ({
      ...prev,
      thumbnail_url: initialImageUrl.thumbnail_url ?? prev.thumbnail_url,
      preview_url: initialImageUrl.preview_url ?? prev.preview_url,
      asset_url: initialImageUrl.asset_url ?? prev.asset_url,
    }));
  }, [
    initialImageUrl?.thumbnail_url,
    initialImageUrl?.preview_url,
    initialImageUrl?.asset_url,
    onSetAssetStorageUrl,
  ]);

  // Update used storage
  useEffect(() => {
    onSetUsedStorage(usedStorage);
  }, [usedStorage, onSetUsedStorage]);

  const handleFileUploadWrapper = async (files: FileList, category: string) => {
    const result = await handleFileUpload(files, category as keyof typeof uploadedFiles);
    if (result) {
      addFiles(result.category, result.newFiles);
    }
  };

  const handleDeleteFile = async (fileId: string, category: string) => {
    try {
      await deleteImage({ fileId, category: category as keyof typeof uploadedFiles });
      removeFile(category as keyof typeof uploadedFiles, fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

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

        <StorageUsageCard usedStorage={usedStorage} totalStorage={totalStorage} />

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
                  uploadedFiles={uploadedFiles.thumbnail}
                  uploading={uploading}
                  onFileUpload={handleFileUploadWrapper}
                  onDeleteFile={handleDeleteFile}
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <UploadArea
                  category="preview"
                  title="Upload Previews"
                  description="High-quality preview media files"
                  acceptedTypes=".glb"
                  uploadedFiles={uploadedFiles.preview}
                  uploading={uploading}
                  onFileUpload={handleFileUploadWrapper}
                  onDeleteFile={handleDeleteFile}
                />
              </TabsContent>

              <TabsContent value="asset" className="mt-6">
                <UploadArea
                  category="asset"
                  title="Upload Assets"
                  description="Documents, files, and other digital assets"
                  acceptedTypes=".zip"
                  uploadedFiles={uploadedFiles.asset}
                  uploading={uploading}
                  onFileUpload={handleFileUploadWrapper}
                  onDeleteFile={handleDeleteFile}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FileStatsCards
          uploadedFiles={uploadedFiles}
          showStats={!initialImageUrl?.thumbnail_url}
        />
      </div>
    </div>
  );
}
