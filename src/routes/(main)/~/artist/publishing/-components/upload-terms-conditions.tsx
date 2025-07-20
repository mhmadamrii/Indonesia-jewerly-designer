import { Card, CardContent, CardHeader } from "~/components/ui/card";

export function UploadTermsConditions() {
  return (
    <Card className="sticky top-3 h-[500px] w-[40%]">
      <CardHeader>Terms & Conditions</CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          <li>Static image must be a .png</li>
          <li>3D asset must be an .glb</li>
          <li>Max size for .png is 10MB</li>
          <li>Max size for .glb is 40MB</li>
        </ul>
      </CardContent>
    </Card>
  );
}
