import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { b2GetInfo, b2UploadFile } from "~/actions/backblaze.action";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const Route = createFileRoute("/(public)/playgrounds")({
  component: RouteComponent,
});

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: b2GetInfo,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: uploadFile } = useMutation({
    mutationFn: b2UploadFile,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 border">
      <Input
        className="w-1/2"
        type="file"
        accept=".glb,.gltf,.obj,.stl,.jpg,.png" // restrict to 3D files
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />

      <div className="flex flex-col gap-2">
        <Button
          className="cursor-pointer"
          onClick={() => {
            if (!file) {
              console.log("No file selected");
              return;
            }

            const reader = new FileReader();

            reader.onloadend = () => {
              const result = reader.result?.toString();
              const base64 = result?.split(",")[1]; // ✅ remove "data:..." prefix

              if (!base64) {
                console.error("Failed to convert file to base64.");
                return;
              }

              console.log("base64", base64);

              uploadFile({
                data: {
                  file: base64,
                },
              });
            };

            reader.onerror = (e) => {
              console.error("Error reading file:", e);
            };

            reader.readAsDataURL(file); // ✅ this triggers base64 encoding
          }}
        >
          {isPending && "Loading..."}
          Trigger backblaze upload
        </Button>

        <Button className="cursor-pointer" onClick={() => mutate({})}>
          {isPending && "Loading..."}
          Trigger backblaze upload Get
        </Button>
      </div>
    </main>
  );
}
