import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function UploadTermsConditions() {
  return (
    <Card className="sticky top-3 h-[400px] w-[40%]">
      <CardHeader>
        <CardTitle>Upload Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Thumbnail Upload */}
        <div>
          <h3 className="font-semibold">Thumbnail</h3>
          <p className="text-muted-foreground text-sm">
            Upload an image file (.png, .jpg). Max size: 10MB
          </p>
        </div>

        {/* Preview Upload */}
        <div>
          <h3 className="font-semibold">Previews</h3>
          <p className="text-muted-foreground text-sm">
            Upload up to 5 files (1 must be a <code>.glb</code>, rest can be images). Max
            size: 40MB
          </p>
        </div>

        {/* Zip Upload */}
        <div>
          <h3 className="font-semibold">Asset Package</h3>
          <p className="text-muted-foreground text-sm">
            Upload a compressed file (.zip). This will be downloadable after user
            purchase.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
