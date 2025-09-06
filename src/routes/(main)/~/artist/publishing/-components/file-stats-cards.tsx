import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn, formatFileSize } from "~/lib/utils";
import { UploadedFile } from "./hooks/use-file-upload";

interface FileStatsCardsProps {
  uploadedFiles: {
    thumbnail: UploadedFile[];
    preview: UploadedFile[];
    asset: UploadedFile[];
  };
  showStats: boolean;
}

export function FileStatsCards({ uploadedFiles, showStats }: FileStatsCardsProps) {
  if (!showStats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          <p className="text-muted-foreground text-xs">
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
  );
}

