import { HardDrive } from "lucide-react";
import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "~/components/animate-ui/base/progress";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatFileSize } from "~/lib/utils";

interface StorageUsageCardProps {
  usedStorage: number;
  totalStorage: number;
}

export function StorageUsageCard({ usedStorage, totalStorage }: StorageUsageCardProps) {
  const storagePercentage = (usedStorage / totalStorage) * 100;

  return (
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
  );
}

